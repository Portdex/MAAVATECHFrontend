import React, { memo,useState,  useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { createGlobalStyle } from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import Packages from "../components/Packages";
import Sidebars from "../menu/sidebar";
import '../../assets/chat.css'
import { Row , Col , Button , Form } from "react-bootstrap";
import { allDocuments } from "../data/data";

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



const Forms = ({ authorId }) => {
  const { username } = useParams();
  console.log("url" , username)
  const [inputValue, setInputValue] = useState('');
  const [userData, setUserData] = useState([])
  const [storeData, setstoreData] = useState([])
  console.log('category',storeData)
  const [serviceData, setServiceData] = useState([])
  const [selectedDocuments, setSelectedDocuments] = useState([]);
  console.log("userData",userData)
  const [loading , setLoading]= useState(false)
  const [selectedOption, setSelectedOption] = useState('');

 const navigate = useNavigate();
 const [formData, setFormData] = useState({
    email: '',
    password: '',
    address1: '',
    address2: '',
    city: '',
    state: 'Choose...',
    file: null,
    checked: false,
  });

    // const jwt = auth.getToken();
    // const authorsState = useSelector(selectors.authorsState);
// const author = authorsState.data ? authorsState.data[0] : {};
    const initialValues = {
        // username: author ? author.username : '',
        // about: author ? author.about : '',
        // social: author ? author.author_sale.category : '',
        // wallet: author ? author.author_sale.payment_method : ''
    };

    
    const handleFormChange = (event) => {
        const { name, value, type, checked, files } = event.target;
    
        // For checkbox inputs, use the checked value instead of the value
        const inputValue = type === 'checkbox' ? checked : type === 'file' ? files[0] : value;
    
        setFormData({
          ...formData,
          [name]: inputValue,
        });
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

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission logic here
    console.log(formData);
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
      <h3 className="m-3 text-center mb-4 mt-5">Admission Form </h3>
      <Form onSubmit={handleSubmit}>
      <Row className="mb-3">
      <Form.Group as={Col} controlId="formGridPassword">
          <Form.Label> Student Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={formData.name}
            onChange={handleFormChange}
            placeholder="Your Name"
          />
        </Form.Group>
        <Form.Group as={Col} controlId="formGridEmail">
          <Form.Label>Father Name</Form.Label>
          <Form.Control
            type="text"
            name="fname"
            value={formData.email}
            onChange={handleFormChange}
            placeholder="Your Father's Name"
          />
        </Form.Group>
      </Row>
      <Row className="mb-3">
      <Form.Group as={Col} controlId="formGridPassword">
          <Form.Label>Mother Name</Form.Label>
          <Form.Control
            type="text"
            name="mname"
            value={formData.name}
            onChange={handleFormChange}
            placeholder="Mother's Name"
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
          />
        </Form.Group>

        {/* <Form.Group as={Col} controlId="formGridState">
          <Form.Label>State</Form.Label>
          <Form.Select
            name="state"
            value={formData.state}
            onChange={handleFormChange}
            defaultValue="Choose..."
          >
            <option>Choose...</option>
            <option>...</option>
          </Form.Select>
        </Form.Group> */}
      </Row>
      <Form.Group controlId="exampleForm.SelectCustom">
        <Form.Label>Select an option:</Form.Label>
        <Form.Control as="select" custom value={selectedOption} onChange={handleSelectChange}>
          <option value="">Choose Documents to upload</option>
          <option value="option1">Application Form</option>
          <option value="option2">Birth Certificate</option>
          <option value="option3">Passport-size Photographs</option>
          <option value="option4">Parent/Guardian Identification</option>
          {/* Add more options as needed */}
        </Form.Control>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formGridFile">
        <Form.Label>Upload File</Form.Label>
        <Form.Control type="file" name="file" onChange={handleFormChange} />
      </Form.Group>

      <Form.Group className="mb-3" id="formGridCheckbox">
        <Form.Check
          type="checkbox"
          name="checked"
          checked={formData.checked}
          onChange={handleFormChange}
          label="Check me out"
        />
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
export default Forms;