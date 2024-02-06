import { useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import { GET_ENS_DETAILS } from '../graphql/queries';
import  ENSForm  from '../components/ENSForm';
import ENSResults from '../components/ENSResults';

const ENSPage = () => {
  const [ensDetails, setEnsDetails] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  const [getENSDetails, { loading, error, data, called }] = useLazyQuery(GET_ENS_DETAILS, {
    onCompleted: (data) => {
      // Assuming data.domains is the correct path based on your updated query
      setEnsDetails(data.domains ?? []);
    },
    onError: (error) => {
      setErrorMessage(error.message);
    }
  });

  const handleAddressSubmit = (address: string) => {
    setErrorMessage(''); // Clear any existing error messages
    // Transform the address to lowercase before submitting
    getENSDetails({
      variables: { address: address.toLowerCase() },
    });
  };

  return (
    <div>
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
