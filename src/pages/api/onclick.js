export default async function handler(req, res) {
    // Ensure we're dealing with a POST request
    if (req.method !== 'POST') {
        res.setHeader('Allow', ['POST']);
        res.status(405).end('Method Not Allowed');
        return;
    }

    try {
        // Assuming the body parser middleware has already processed the incoming request
        // And the buttonIndex signifies which button was pressed in the Hey Portal
        const { buttonIndex } = req.body;

        // Here, you would add logic based on the buttonIndex to perform specific actions
        // For demonstration, let's log the buttonIndex and send a simple response
        console.log(`Button ${buttonIndex} was pressed.`);

        // Respond with a simple JSON message
        res.status(200).json({ message: `Button ${buttonIndex} interaction received.` });
    } catch (error) {
        console.error('Error handling interaction:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
