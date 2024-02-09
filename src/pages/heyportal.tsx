import { useRouter } from 'next/router';
import Head from 'next/head';

const HeyPortalPage = () => {
    const router = useRouter();
    const { address } = router.query; // Access the address query parameter

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
        {/* Conditionally display the address if it's present in the query parameters */}
        {address && <p>Your address is: {address}</p>}
        <img className="max-w-xl h-auto" src="https://zizzamia.xyz/park-3.png" />
      </main>
    </>
  );
};

export default HeyPortalPage;
