// pages/api/reload.ts

import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // Assuming ensListImageUrl or a similar dynamic value could be determined here
  const ensListImageUrl = "https://gateway.pinata.cloud/ipfs/QmbfB9ssCe1qJWZqE2nXkoHuHpePJG1ffy93d2H8GkQt8a"; // Default or dynamically determined image URL

  const htmlContent = `
<!DOCTYPE html>
<html>
  <head>
    <title>Hey Portal Example</title>
    <meta property="og:title" content="Hey Portal Example" />
    <meta property="og:image" content="${ensListImageUrl}" />
    <meta property="hey:portal" content="v1.0.0" />
    <meta property="hey:portal:image" content="${ensListImageUrl}" />
    <meta property="hey:portal:post_url" content="https://ens-portal.vercel.app/api/generate-ens-image" />
    <meta property="hey:portal:button:1" content="Show My ENS List 4" />
    <meta property="hey:portal:button:1:type" content="submit" />
  </head>
  <body>
    <div class="container">
      <h1>Welcome to the Hey Portal Example</h1>
      <img class="placeholder-image" src="${ensListImageUrl}" alt="Placeholder" />
      <img class="ens-list-image" src="${ensListImageUrl}" alt="ENS List" />
    </div>
    <style>
      .container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100vh;
      }
      .show-ens-list-button, .placeholder-image {
        margin-top: 20px;
        padding: 10px 20px;
        font-size: 16px;
        cursor: pointer;
      }
      .ens-list-image {
        max-width: 90%;
        height: auto;
        border: 1px solid #ccc;
        padding: 10px;
        margin-top: 20px;
      }
    </style>
  </body>
</html>
  `;

  res.setHeader('Content-Type', 'text/html');
  res.send(htmlContent);
}
