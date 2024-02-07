import { useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import { GET_ENS_DETAILS } from '../graphql/queries';
import ENSForm from '../components/ENSForm';
import ENSResults from '../components/ENSResults';
import Head from 'next/head'; // Import Head for setting meta tags

const ENSPage = () => {
  const [ensDetails, setEnsDetails] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  const [getENSDetails, { loading, error, data, called }] = useLazyQuery(GET_ENS_DETAILS, {
    onCompleted: (data) => {
      setEnsDetails(data.domains ?? []);
    },
    onError: (error) => {
      setErrorMessage(error.message);
    },
  });

  const handleAddressSubmit = (address: string) => {
    setErrorMessage('');
    getENSDetails({
      variables: { address: address.toLowerCase() },
    });
  };

  return (
    <div>
      <Head>
        <title>ENS Lookup Portal</title>
        <meta property="hey:portal" content="v1.0.0" />
        <meta property="hey:portal:image" content="https://www.esports.net/br/wp-content/uploads/sites/3/2022/11/apostas-com-ethereum-2022.jpg" />
        <meta property="hey:portal:post_url" content="/api/onclick" />
        <meta property="hey:portal:button:1" content="Search" />
        <meta property="hey:portal:button:1:type" content="submit" />
        {/* Add additional buttons and meta tags as required */}
      </Head>
      <ENSForm onAddressSubmit={handleAddressSubmit} />
      {loading && <p>Loading...</p>}
      {error && <p>Error: {errorMessage}</p>}
      {called && !loading && data && data.domains?.length > 0 ? (
        <ENSResults ensDetails={data.domains} />
      ) : (
        called && !loading && <p>No ENS details found for the provided address.</p>
      )}
    </div>
  );
};

export default ENSPage;