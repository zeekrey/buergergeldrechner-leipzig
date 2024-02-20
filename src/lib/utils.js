import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

// import { useState } from 'react';
// import { useSearchParams } from 'react-router-dom';

export const getData = ({ salt, searchParams }) => {
  // const [privateNumber, setPrivateNumber] = useState(null);




  const setPrivateNumberParam = (number) => {
    // Assuming encryption is done on the client side for security
    setPrivateNumber(number);
  };

  const getPrivateNumberParam = () => {
    // Decrypt the number here after reading it from the URL parameter
    const encryptedNumber = searchParams.get('privateNumber');
    const decryptedNumber = decryptNumber(encryptedNumber);
    return decryptedNumber;
  };

  // Custom decryption logic to retrieve the number
  const decryptNumber = (encryptedNumber) => {
    return atob(encryptedNumber);
  };

  // Fetch and set the private number on component initialization
  // useEffect(() => {
  //   const decryptedNumber = getPrivateNumberParam();
  //   setPrivateNumber(decryptedNumber);
  // }, []);

  return { getPrivateNumberParam, privateNumber, setPrivateNumberParam };
};

