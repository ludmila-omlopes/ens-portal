export default async function handler(req, res) {
    if (req.method !== 'POST') {
        // Only allow POST requests
        res.setHeader('Allow', ['POST']);
        res.status(405).end('Method Not Allowed');
        return;
    }

    try {
        // Extract either trustedData or simulate receiving an address in development
        const body = req.body;
        let address;

        // In development, you might simulate the trustedData to test the redirection
        if (process.env.NODE_ENV === 'development') {
            // Simulate an Ethereum address for development purposes
            address = '0xC3b8BBD76c78a0dFAf47b4454472DB35cEBD1A24';
        } else {
            // In production, expect to receive trustedData with an address
            const { trustedData } = body;

            if (!trustedData || !trustedData.address) {
                return res.status(400).json({ error: 'Missing or invalid trustedData' });
            }

            address = trustedData.address;
        }

        // Construct the URL for redirection
        const redirectUrl = `https://ens-portal.vercel.app/heyportal?address=${encodeURIComponent(address)}`;

        // Respond with a redirect, passing the address as a query parameter
        res.writeHead(303, { Location: redirectUrl }).end();
    } catch (error) {
        console.error('Error handling /api/onclick request:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
