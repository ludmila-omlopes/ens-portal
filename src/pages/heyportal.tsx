// pages/heyportal.tsx
import Head from 'next/head';

const HeyPortalPage = () => {
  return (
    <>
      <Head>
        <title>Hey Portal Example</title>
        <meta property="og:title" content="Hey Portal Example" />
        <meta property="og:image" content="https://zizzamia.xyz/park-3.png" />
        <meta property="hey:portal" content="v1.0.0" />
        <meta property="hey:portal:image" content="https://zizzamia.xyz/park-3.png" />
        <meta property="hey:portal:post_url" content="https://example.com/api/heyportal" />
        <meta property="hey:portal:button:1" content="👍" />
        <meta property="hey:portal:button:1:type" content="submit" />
        {/* Add additional buttons as needed */}
      </Head>
      <main>
        <h1>Welcome to the Hey Portal Example</h1>
        <p>This is a basic example page designed to meet the minimum requirements for a Hey Portal.</p>
        <img className="max-w-xl h-auto" src="https://zizzamia.xyz/park-3.png" />
      </main>
    </>
  );
};

export default HeyPortalPage;
