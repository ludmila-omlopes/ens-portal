import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import Head from 'next/head';

const HeyPortalPage = () => {
    const router = useRouter();
    const [ensListImageUrl, setEnsListImageUrl] = useState<string | null>(null);

    // This function is called when the button is clicked or when the Hey Portal button action is triggered.
    const handleShowENSList = async () => {
        // Here, you might want to dynamically fetch the user's Ethereum address in a real-world scenario.
        // For demonstration, we're using a placeholder Ethereum address.
        const address = "0xC3b8BBD76c78a0dFAf47b4454472DB35cEBD1A24";

        // Construct the URL to your API route that generates the ENS list image.
        const imageUrl = `https://ens-portal.vercel.app/api/generate-ens-image?address=${encodeURIComponent(address)}`;
        setEnsListImageUrl(imageUrl);
    };

    // Optionally, react to the address query parameter if present (useful outside Hey)
    useEffect(() => {
        const queryAddress = router.query.address as string | undefined;
        if (queryAddress) {
            handleShowENSList();
        }
    }, [router.query]);

    return (
        <>
            <Head>
                <title>Hey Portal Example</title>
                <meta property="og:title" content="Hey Portal Example" />
                <meta property="og:image" content="https://zizzamia.xyz/park-3.png" />
                <meta property="hey:portal" content="v1.0.0" />
                <meta property="hey:portal:image" content={ensListImageUrl || "https://zizzamia.xyz/park-3.png"} />
                <meta property="hey:portal:post_url" content="https://ens-portal.vercel.app/api/generate-ens-image" />
                <meta property="hey:portal:button:1" content="Show My ENS List" />
                <meta property="hey:portal:button:1:type" content="submit" />
            </Head>
            <div className="container">
                <h1>Welcome to the Hey Portal Example</h1>
                <img className="placeholder-image" src="https://zizzamia.xyz/park-3.png" alt="Placeholder" />
                <button onClick={handleShowENSList} className="show-ens-list-button">
                    Show My ENS List
                </button>
                {ensListImageUrl && <img className="ens-list-image" src={ensListImageUrl} alt="ENS List" />}
            </div>
            <style jsx>{`
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
            `}</style>
        </>
    );
};

export default HeyPortalPage;