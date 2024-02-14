import axios from 'axios';
import FormData from 'form-data';
import { Readable } from 'stream'; // Import the Readable stream
import fs from 'fs';

// Replace with your actual API key and secret from Pinata
const pinataApiKey = process.env.PINATA_API_KEY;
const pinataSecretApiKey = process.env.PINATA_SECRET_API_KEY;

export async function uploadToIPFS(buffer: Buffer): Promise<string> {

    const readableStream = new Readable();
    readableStream.push(buffer); // Push the buffer to the stream
    readableStream.push(null); // Indicate the end of the stream

    const formData = new FormData();
    formData.append('file', readableStream); // Use the stream here

    try {
        const response = await axios.post('https://api.pinata.cloud/pinning/pinFileToIPFS', formData, {
            maxBodyLength: Infinity, // This might be needed depending on the size of your uploads
            headers: {
                ...formData.getHeaders(), // Spread formData headers
                pinata_api_key: pinataApiKey,
                pinata_secret_api_key: pinataSecretApiKey,
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
