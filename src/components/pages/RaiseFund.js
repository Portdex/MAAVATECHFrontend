import React, { memo,useState,  useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { createGlobalStyle } from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import Packages from "../components/Packages";
import Sidebars from "../menu/sidebar";
import '../../assets/chat.css'
import { Row , Col , Button , Form } from "react-bootstrap";
const GlobalStyles = createGlobalStyle`
.navbar {
  display: none;
}
header
{
  display:none;
}
.navbarHome
{
  display:none;
}

@media (max-width: 895px) {
  .chat-sidebar {
    display: none;
  }
  .navbarHome {
    display: block;
  }
  .responsive-flex
  {
    width:100%;
  }
}
`;



const RaiseFunds = ({ authorId }) => {
  const { username } = useParams();
  console.log("url" , username)
  const [inputValue, setInputValue] = useState('');
  const [userData, setUserData] = useState([])
  const [storeData, setstoreData] = useState([])
  console.log('category',storeData)
  const [serviceData, setServiceData] = useState([])
  const [selectedOption, setSelectedOption] = useState('');
  const [selectedFundOption, setSelectedFundOption] = useState('');
  const [selectedDocuments, setSelectedDocuments] = useState([]);
  console.log("userData",userData)
 const navigate = useNavigate();
 const [formData, setFormData] = useState({
  name: '',
  email: '',
  address1: '',
  city: '',
  state: '',
  amount: '',
  file: null,
    checked: false,
});
  
      const handleFormChange = (event) => {
        const { name, value,files  } = event.target;
       
        setFormData({
          ...formData,
          [name]: value,
        });
      };
    
      const handleSubmit = (event) => {
        event.preventDefault();
        // Handle form submission logic here
        console.log(formData);
        // Add your logic here to send the form data to the server for processing
      };
    
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setFormData({
      ...formData,
      selectedFile: file,
    });
  };
  const handleSelectChange = (event) => {
    const selectedOptions = Array.from(event.target.selectedOptions, (option) => option.value);
    setSelectedOption(selectedOptions);
  };
  const handleFundSelectChange = (event) => {
    const selectedFundOptions = Array.from(event.target.selectedOptions, (option) => option.value);
    setSelectedFundOption(selectedFundOptions);
  };
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };
return (
 <>
<Sidebars/>
<div className="containerchat">
<GlobalStyles/>
    <div className="margin-left-sidebar p-0 responsive-flex">
    
    <div className="chat">
      <div className="height-contain">
      <div className="chat-messages responsive-space d-flex justify-content-center flex-column">
      <h3 className="m-3 text-center mb-4  mt-5">Raise Fund Form </h3>
      <Form onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleFormChange}
                placeholder="Enter Your Name"
                required
              />
            </Form.Group>
            <Form.Group as={Col} controlId="formGridEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleFormChange}
                placeholder="Enter email"
                required
              />
            </Form.Group>
          </Row>

          <Form.Group className="mb-3" controlId="formGridAddress1">
            <Form.Label>Address</Form.Label>
            <Form.Control
              type="text"
              name="address1"
              value={formData.address1}
              onChange={handleFormChange}
              placeholder="1234 Main St"
              required
            />
          </Form.Group>

          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridCity">
              <Form.Label>City</Form.Label>
              <Form.Control
                type="text"
                name="city"
                value={formData.city}
                onChange={handleFormChange}
                required
              />
            </Form.Group>
          </Row>
<Row>
          <Form.Group as={Col} className="mb-3" controlId="formGridAmount">
            <Form.Label>Amount to Raise</Form.Label>
            <Form.Control
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleFormChange}
              placeholder="Enter the amount to raise"
              required
            />
          </Form.Group>
          <Form.Group as={Col} controlId="exampleForm.SelectCustom">
        <Form.Label>Select Category:</Form.Label>
        <Form.Control as="select" custom value={selectedFundOption} onChange={handleFundSelectChange}>
          <option value="">Choose Category to raise fund</option>
          <option value="Orphan">Orphan</option>
          <option value="BloodDonate">Blood Donation</option>
          <option value="NeedyStudents">Needy students</option>
          <option value="Homeless">Homeless Child Food</option>
          {/* Add more options as needed */}
        </Form.Control>
      </Form.Group>
          </Row>
          <Form.Group controlId="exampleForm.SelectCustom">
        <Form.Label>Select an option:</Form.Label>
        <Form.Control as="select" custom value={selectedOption} onChange={handleSelectChange}>
          <option value="">Choose Documents to upload</option>
          <option value="option1">Fundraising Plan</option>
          <option value="option2">Donation Receipts</option>
          <option value="option3">Financial Statements</option>
          <option value="option4">Event Budget</option>
          {/* Add more options as needed */}
        </Form.Control>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formGridFile">
        <Form.Label>Upload File</Form.Label>
        <Form.Control type="file" name="file" onChange={handleFormChange} />
      </Form.Group>
          

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
              </div>
      </div>
      <div className="chat-fixed">
      <form className="chat-form">
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Type your message..."
        />
        <button type="submit">Send</button>
        <br/>
        <div>
        
        </div>
        
      </form>
      <p>
          Get More Information about  <a href=""> MaavaTech </a>
        </p>
        </div>
    </div>
    </div>
  {/* <Footer /> */}
</div>
</>
);
}
export default RaiseFunds;