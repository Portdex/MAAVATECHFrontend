import React, { useState } from 'react';
import axios from 'axios';

function Checkform() {
  const [formData, setFormData] = useState({
    name: 'alex',
    email: 'mubashiraiqbal786@gmail.com',
    address: '1234street',
    city: 'london',
    orphan_name: ' brian',
    amount_to_raise:'33444',
    description: 'testing',
    phone_number: '+223243211',
    photo_path:'123.jpg',
    // Add other fields as needed
  });

  const handleSubmit = () => {
    axios.post('https://153a5f6sbb.execute-api.eu-west-2.amazonaws.com/test/createFundRaiseEntry', formData)
    .then((response) => {
      if (response.status === 200) {
        // Handle a successful response
        console.log('Data successfully posted:', response.data);
      } else {
        // Handle other status codes or potential API errors
        console.error('API responded with status:', response.status);
        console.log('API response data:', response.data);
      }
    })
    .catch((error) => {
      // Handle network errors or request errors
      console.error('Error posting data:', error);
    });
  
  };

  return (
    <div>
      <h1>Fund Raise Form</h1>
      <button onClick={handleSubmit}>Submit Data</button>
    </div>
  );
}

export default Checkform;
