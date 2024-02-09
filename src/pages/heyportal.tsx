import { useRouter } from 'next/router';
import React, { useState } from 'react';
import Head from 'next/head';

const HeyPortalPage = () => {

    // For local testing, set a constant address. Remove or modify for production.
    const DEV_ADDRESS = "0xC3b8BBD76c78a0dFAf47b4454472DB35cEBD1A24"; // Example address
    const router = useRouter();
    //const { address } = router.query; // Access the address query parameter

    const [userAddress, setUserAddress] = useState('');

    const handleShowAddress = async () => {
        // Check if we're in development mode. If so, use the DEV_ADDRESS directly.
        if (process.env.NODE_ENV === 'development') {
          setUserAddress(DEV_ADDRESS);
        } else {
          // In production, attempt to fetch the user address.
          // Note: This fetch logic is for demonstration. You'll need to adjust it according to your backend API.
          try {
            const response = await fetch('/api/onclick', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({

              }),
            });
    
            if (response.ok) {
              const { address } = await response.json();
              setUserAddress(address || "User is not authenticated."); // Use the fetched address or show a fallback message
            } else {
              console.error('Failed to fetch user address');
              setUserAddress("Error fetching address.");
            }
          } catch (error) {
            console.error('Error during fetch:', error);
            setUserAddress("Error fetching address.");
          }
        }
      };
    

  return (
    <>
      <Head>
        <title>Hey Portal Example</title>
        <meta property="og:title" content="Hey Portal Example" />
        <meta property="og:image" content="https://zizzamia.xyz/park-3.png" />
        <meta property="hey:portal" content="v1.0.0" />
        <meta property="hey:portal:image" content="https://zizzamia.xyz/park-3.png" />
        <meta property="hey:portal:post_url" content="https://ens-portal.vercel.app/api/onclick" />
        <meta property="hey:portal:button:1" content="Show Address" />
        <meta property="hey:portal:button:1:type" content="submit" />
        {/* Add additional buttons as needed */}
      </Head>
      <div className="container">
        <h1>Welcome to the Hey Portal Example</h1>
        <img className="max-w-xl h-auto" src="https://zizzamia.xyz/park-3.png" />
        <button onClick={handleShowAddress} className="show-address-button">
          Show My Address
        </button>
        {userAddress && <p>Your address is: {userAddress}</p>}
      </div>
      <style jsx>{`
        .container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100vh;
        }
        .show-address-button {
          margin-top: 20px;
          padding: 10px 20px;
          font-size: 16px;
          cursor: pointer;
        }
      `}</style>
    </>
  );
};

export default HeyPortalPage;