import React, { useState } from 'react';
import styles from './ENSForm.module.css'; // Import the CSS module

interface ENSFormProps {
  onAddressSubmit: (address: string) => void;
}

const ENSForm: React.FC<ENSFormProps> = ({ onAddressSubmit }) => {
  const [address, setAddress] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onAddressSubmit(address);
  };

  return (
    <div className={styles.formContainer}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          placeholder="Enter Ethereum Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className={styles.input}
        />
        <button type="submit" className={styles.button}>
          OK
        </button>
      </form>
    </div>
  );
};

export default ENSForm;
