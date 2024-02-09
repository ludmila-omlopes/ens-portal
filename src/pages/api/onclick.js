// pages/api/onclick.js

export default async function handler(req, res) {
    if (req.method === 'POST') {
        // Extract the trustedData from the request body
        const { trustedData } = req.body;

        // Extract the user's address from the trustedData
        const address = trustedData?.address;

        // Redirect back to your Hey Portal page with the address as a query parameter
        // Adjust the URL to your specific page that should display the address
        res.status(200).json({ address: address });
    } else {
        // Handle any non-POST requests
        res.setHeader('Allow', ['POST']);
        res.status(405).end('Method Not Allowed');
    }
}
