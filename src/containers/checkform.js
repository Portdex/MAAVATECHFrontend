import React, { useState ,useEffect } from 'react';
import axios from 'axios';

function Checkform() {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Define the URL you want to fetch data from
    const url = 'https://153a5f6sbb.execute-api.eu-west-2.amazonaws.com/test/getAdmissions';

    // Fetch data from the URL
    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json(); // Assuming the response is in JSON format
      })
      .then(data => {
        setData(data);
        console.log('data' , data) // Update the state with the fetched data
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);
  const [formData, setFormData] = useState({
    name: 'mubashira',
    email: 'mubashiraiqbal786@gmail.com',
    country: 'pakistan',
    grade: ' graduate',
    lookingFor:'university',
    description: 'testing',
    phoneNumber: '+223243211',
    
    // Add other fields as needed
  });

  const handleSubmit = () => {
    // axios.post('https://153a5f6sbb.execute-api.eu-west-2.amazonaws.com/test/createPost', formData)
    // .then((response) => {
    //   if (response.status === 200) {
    //     // Handle a successful response
    //     console.log('Data successfully posted:', response.data);
    //   } else {
    //     // Handle other status codes or potential API errors
    //     console.error('API responded with status:', response.status);
    //     console.log('API response data:', response.data);
    //   }
    // })
    // .catch((error) => {
    //   // Handle network errors or request errors
    //   console.error('Error posting data:', error);
    // });
  console.log(formData)
  };

  return (
    <div>
      <h1>Fund Raise Form</h1>
      <button onClick={handleSubmit}>Submit Data</button>
    </div>
  );
}

export default Checkform;
