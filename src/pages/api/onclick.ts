// pages/api/onclick.ts

import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    // Only allow POST requests
    res.setHeader('Allow', ['POST']);
    res.status(405).end('Method Not Allowed');
    return;
  }

  try {
    const { trustedData } = req.body;

    // Validate the trustedData
    if (!trustedData || !trustedData.address) {
      // Respond with an error if trustedData or address is not present
      return res.status(400).json({ error: 'Missing or invalid trustedData' });
    }

    // Extract the user's Ethereum address from the trustedData
    const { address } = trustedData;

    // Generate dynamic HTML content with Open Graph meta tags based on the address
    const htmlContent = `<!DOCTYPE html>
    <html>
      <head>
        <title>User Address</title>
        <meta property="og:title" content="Your Ethereum Address" />
        <meta property="hey:portal" content="v1.0.0" />
        <meta property="hey:portal:image" content="https://zizzamia.xyz/park-3.png" />
        <meta property="hey:portal:post_url" content="https://ens-portal.vercel.app/api/onclick" />
        <meta property="hey:portal:button:1" content="Show Address" />
        <meta property="hey:portal:button:1:type" content="submit" />
        <!-- Additional meta tags as needed -->
      </head>
      <body>
        Your address is: ${address}
        <!-- Additional content -->
      </body>
    </html>`;

    // Respond with the dynamic HTML content
    res.setHeader('Content-Type', 'text/html');
    res.status(200).send(htmlContent);
  } catch (error) {
    console.error('Error handling /api/onclick request:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
