import Head from 'next/head';
import React from 'react';
import { useRouter } from 'next/router';

const IndexPage = () => {
  const router = useRouter();

  // Placeholder function to demonstrate interaction
  // You would replace this with your actual logic to fetch and display ENS details or navigate further
  const handleShowENSList = async () => {
    console.log('Show ENS List logic goes here');
    // Logic to fetch and display ENS details
  };

  return (
    <>
      <Head>
        <title>ENS Details Portal</title>
        <meta property="og:title" content="ENS Details Portal" />
        <meta property="og:image" content="https://example.com/path/to/your/dynamic/image.png" />
        <meta property="hey:portal" content="v1.0.0" />
        <meta property="hey:portal:image" content="https://example.com/path/to/your/dynamic/image.png" />
        <meta property="hey:portal:post_url" content="https://your-domain.com/api/your-endpoint" />
        <meta property="hey:portal:button:1" content="Show ENS Details" />
        <meta property="hey:portal:button:1:type" content="submit" />
        {/* Add additional meta tags as needed */}
      </Head>
      <div className="container">
        <h1>Welcome to the ENS Details Portal</h1>
        <button onClick={handleShowENSList} className="ens-details-button">
          Show My ENS List
        </button>
        {/* Render ENS details or additional content here */}
      </div>
      <style jsx>{`
        .container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100vh;
        }
        .ens-details-button {
          margin-top: 20px;
          padding: 10px 20px;
          font-size: 16px;
          cursor: pointer;
        }
      `}</style>
    </>
  );
};

export default IndexPage;
