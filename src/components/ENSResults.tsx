import React from 'react';
import styles from './ENSResults.module.css'; // Import the CSS module

interface ENSDetails {
  id: string;
  name: string;
  labelName: string;
  expiryDate: string;
  owner: {
    id: string;
  };
}

interface ENSResultsProps {
  ensDetails: ENSDetails[];
}

const ENSResults: React.FC<ENSResultsProps> = ({ ensDetails }) => {
  // Function to format Unix timestamp to readable date
  const formatDate = (unixTimestamp: string) => {
    const date = new Date(parseInt(unixTimestamp) * 1000);
    return date.toLocaleDateString("en-US");
  };

  return (
    <div className={styles.ensResultsContainer}>
      {ensDetails.map((detail) => (
        <div className={styles.ensResultCard} key={detail.id}>
          <p className={styles.domainName}>Domain Name: {detail.name}</p>
          <p className={styles.expiryDate}>Expiry Date: {formatDate(detail.expiryDate)}</p>
        </div>
      ))}
    </div>
  );
};

export default ENSResults;
