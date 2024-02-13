import { ApolloClient, InMemoryCache, HttpLink, gql } from '@apollo/client';
import type { NextApiRequest, NextApiResponse } from 'next';
import sharp from 'sharp';
import { format, subDays } from 'date-fns';
import path from 'path';
import { promises as fs } from 'fs';

// Initialize Apollo Client
const client = new ApolloClient({
  link: new HttpLink({
    uri: 'https://api.thegraph.com/subgraphs/name/ensdomains/ens',
  }),
  cache: new InMemoryCache(),
});

// GraphQL query to fetch ENS details
const GET_ENS_DETAILS = gql`
  query GetENSDetails($address: String!) {
    domains(where: {owner: $address}) {
      id
      name
      labelName
      expiryDate
      owner {
        id
      }
    }
  }
`;

async function generateENSImage(ensDetails: { name: string, expiryDate: string }[]) {

  const sortedEnsDetails = ensDetails.sort((a, b) => {
    return new Date(a.expiryDate).getTime() - new Date(b.expiryDate).getTime();
  });

  // Generate SVG content dynamically based on ENS details
  let svgContent = sortedEnsDetails.map((detail, index) => {

  const formattedExpiryDate = format(detail.expiryDate, 'MMMM d, yyyy');
  
    return `<text x="10" y="${50 + index * 30}" fill="black" font-size="24">${detail.name} - Expiry: ${formattedExpiryDate}</text>`;
  }).join('\n');

  const svg = `<svg width="800" height="${30 + ensDetails.length * 30}" xmlns="http://www.w3.org/2000/svg">
    <rect width="100%" height="100%" fill="white"/>
    ${svgContent}
  </svg>`;

  // Convert SVG to PNG
  const ensContentBuffer = await sharp(Buffer.from(svg))
    .png()
    .toBuffer();

  // Determine if running on Vercel or locally
  const isVercel = process.env.VERCEL === '1'; // Vercel sets this to '1' for all deployments
  let backgroundImagePath;

  if (isVercel) {
    // Construct the path for Vercel environment
    backgroundImagePath = path.join('/var/task/public', 'lofiOffice.png');
  } else {
    // Construct the path for local environment
    backgroundImagePath = path.join(process.cwd(), 'public', 'lofiOffice.png');
  }

    // Read the image file directly from the filesystem
    const imageBuffer = await fs.readFile(backgroundImagePath);

    // Use sharp to process your image as needed
    const outputBuffer = await sharp(imageBuffer)
      // Example: Resize the image
      .resize(800, 600)
      .png()
      .toBuffer();

  // Composite the ENS content on top of the background image
  return await sharp(outputBuffer)
    .composite([{ input: ensContentBuffer, blend: 'over' }])
    .png()
    .toBuffer();
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  let { address } = req.query;

  if (!address || typeof address !== 'string') {
    res.status(400).json({ error: 'Address query parameter is required and must be a string.' });
    return;
  }

  // Convert the address to lowercase
  address = address.toLowerCase();

  try {
    const { data } = await client.query({
      query: GET_ENS_DETAILS,
      variables: { address },
    });

    if (data.domains && data.domains.length > 0) {
      const imageBuffer = await generateENSImage(data.domains.map((domain: any) => ({
        name: domain.name,
        expiryDate: subDays(new Date(parseInt(domain.expiryDate) * 1000), 90).toISOString().slice(0, 10)
      })));

      res.setHeader('Content-Type', 'image/png');
      res.send(imageBuffer);
    } else {
      res.status(404).json({ error: 'No ENS details found for the provided address.' });
    }
  } catch (error) {
    console.error('Error fetching ENS details:', error);
    res.status(500).json({ error: 'Failed to fetch ENS details from The Graph.' });
  }
}
