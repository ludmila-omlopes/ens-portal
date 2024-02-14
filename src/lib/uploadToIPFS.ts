import axios from 'axios';
import FormData from 'form-data';
import { Readable } from 'stream'; // Import the Readable stream
import fs from 'fs';

// Replace with your actual API key and secret from Pinata
const pinataApiKey = process.env.PINATA_API_KEY;
const pinataSecretApiKey = process.env.PINATA_SECRET_API_KEY;

export async function uploadToIPFS(buffer: Buffer): Promise<string> {
    const formData = new FormData();
    const stream = Readable.from(buffer); // Convert the buffer to a stream
    formData.append('file', stream, {
        filename: `ens-image-${Date.now()}.png`,
        contentType: 'image/png',
    });

    // Optionally, add metadata or options here
    formData.append('pinataMetadata', JSON.stringify({
        name: `ENS-Image-${Date.now()}`
    }));
    formData.append('pinataOptions', JSON.stringify({
        cidVersion: 1
    }));

    try {
        const response = await axios.post('https://api.pinata.cloud/pinning/pinFileToIPFS', formData, {
            headers: {
                ...formData.getHeaders(),
                pinata_api_key: pinataApiKey, // Note: Adjust according to the correct method of authentication
                pinata_secret_api_key: pinataSecretApiKey, // Pinata might require Bearer token or other auth methods
            },
        });
        const ipfsHash = response.data.IpfsHash;
        console.log(`File uploaded to IPFS with hash: ${ipfsHash}`);
        return `https://gateway.pinata.cloud/ipfs/${ipfsHash}`;
    } catch (error) {
        console.error('Error uploading to IPFS:', error);
        throw new Error('Failed to upload to IPFS.');
    }
}
