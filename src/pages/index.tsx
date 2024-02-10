import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Head from 'next/head';

const HeyPortalPage = () => {

    // For local testing, set a constant address. Remove or modify for production.
    const DEV_ADDRESS = "0xC3b8BBD76c78a0dFAf47b4454472DB35cEBD1A24"; // Example address
    const router = useRouter();
    const [userAddress, setUserAddress] = useState('');

    //If outside Hey
    const handleShowAddress = async () => {
        setUserAddress(DEV_ADDRESS);
      };

      useEffect(() => {
        // Check for the 'address' query parameter from the URL
        const queryAddress = router.query.address;

        if (queryAddress) {
            // If the 'address' query parameter exists, use it as the user address
            setUserAddress(queryAddress as string);
        }
        // Add router.query to the dependency array to ensure the effect runs when query parameters change
    }, [router.query]);
    

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