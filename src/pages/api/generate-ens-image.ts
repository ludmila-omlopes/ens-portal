import { ApolloClient, InMemoryCache, HttpLink, gql } from '@apollo/client';
import type { NextApiRequest, NextApiResponse } from 'next';
import sharp from 'sharp';

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
  // Generate SVG content dynamically based on ENS details
  let svgContent = ensDetails.map((detail, index) => {
    return `<text x="10" y="${50 + index * 30}" fill="black" font-size="24">${detail.name} - Expiry: ${detail.expiryDate}</text>`;
  }).join('\n');

  const svg = `<svg width="800" height="${30 + ensDetails.length * 30}" xmlns="http://www.w3.org/2000/svg">
    <rect width="100%" height="100%" fill="white"/>
    ${svgContent}
  </svg>`;

  // Convert SVG to PNG
  return await sharp(Buffer.from(svg))
    .png()
    .toBuffer();
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { address } = req.query;

  if (!address || typeof address !== 'string') {
    res.status(400).json({ error: 'Address query parameter is required and must be a string.' });
    return;
  }

  try {
    const { data } = await client.query({
      query: GET_ENS_DETAILS,
      variables: { address },
    });

    if (data.domains && data.domains.length > 0) {
      const imageBuffer = await generateENSImage(data.domains.map((domain: any) => ({
        name: domain.name,
        expiryDate: new Date(parseInt(domain.expiryDate) * 1000).toISOString().slice(0, 10)
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
