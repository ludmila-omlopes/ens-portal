import { ApolloClient, InMemoryCache, HttpLink, gql } from '@apollo/client';
import type { NextApiRequest, NextApiResponse } from 'next';
import { format, subDays } from 'date-fns';

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
      // Sort ENS details by expiry date
      const sortedEnsDetails = [...data.domains].sort((a, b) => new Date(a.expiryDate).getTime() - new Date(b.expiryDate).getTime());

      // Generate SVG content
      let svgContent = sortedEnsDetails.map((domain, index) => {
        const expiryDate = format(subDays(new Date(parseInt(domain.expiryDate) * 1000), 90), 'MMMM d, yyyy');
        return `<text x="10" y="${50 + index * 30}" fill="black" font-size="24">${domain.name} - Expiry: ${expiryDate}</text>`;
      }).join('');

      const svg = `<svg width="800" height="${30 + sortedEnsDetails.length * 30}" xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" fill="white"/>
        ${svgContent}
      </svg>`;

      // Encode SVG to base64
      const base64Image = Buffer.from(svg).toString('base64');
      const imageUrl = `data:image/svg+xml;base64,${base64Image}`;

      // Generate dynamic HTML content with the base64-encoded image
      const htmlContent = `<!DOCTYPE html>
      <html>
        <head>
          <title>ENS Details</title>
          <meta property="og:title" content="Your ENS Details" />
          <meta property="hey:portal" content="v1.0.0" />
          <meta property="hey:portal:image" content="${imageUrl}" />
          <meta property="hey:portal:post_url" content="https://ens-portal.vercel.app/api/generate-ens-image" />
          <meta property="hey:portal:button:1" content="Show ENS Details" />
          <meta property="hey:portal:button:1:type" content="submit" />
        </head>
        <body>
          <!-- Additional content as needed -->
        </body>
      </html>`;

      // Respond with the dynamic HTML content
      res.setHeader('Content-Type', 'text/html');
      res.status(200).send(htmlContent);
    } else {
      res.status(404).json({ error: 'No ENS details found for the provided address.' });
    }
  } catch (error) {
    console.error('Error fetching ENS details:', error);
    res.status(500).json({ error: 'Failed to fetch ENS details from The Graph.' });
  }
}
