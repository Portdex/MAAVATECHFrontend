import React, { memo,useState,  useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { createGlobalStyle } from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import Packages from "../containers/Packages";
import Sidebars from "../menu/sidebar";
import '../assets/chat.css'
import { Row , Col , Button , Form,  } from "react-bootstrap";
import { allDocuments } from "../data/data";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {  ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../assets/forms.css'
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



const StepByStepForm = ({ authorId }) => {
  const { username } = useParams();
  console.log("url" , username)
  const [inputValue, setInputValue] = useState('');
  const [userData, setUserData] = useState([])
  const [storeData, setstoreData] = useState([])
  console.log('category',storeData)
  console.log("userData",userData)
  const [loading , setLoading]= useState(false)
  const [selectedOption, setSelectedOption] = useState('');
  const [selectedAuthors, setSelectedAuthors] = useState([]);
 const navigate = useNavigate();
   const [step, setStep] = useState(1);
 const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    father: '',
    mother: '',
    dob: '',
    address1: '',
    address2: '',
    city: '',
    state: 'Choose...',
    file: null,
    checked: false,
    dateOfBirth: null,
  });
  useEffect(() => {
    const storedSelectedAuthors = localStorage.getItem('selectedAuthors');
    if (storedSelectedAuthors) {
      setSelectedAuthors(JSON.parse(storedSelectedAuthors));
    }
  }, []);
    
    const handleFormChange = (event) => {
        const { name, value, type, checked, files } = event.target;
    
        // For checkbox inputs, use the checked value instead of the value
        const inputValue = type === 'checkbox' ? checked : type === 'file' ? files[0] : value;
    
        setFormData({
          ...formData,
          [name]: inputValue,
        });
      };

  const handleSelectChange = (event) => {
    const selectedOptions = Array.from(event.target.selectedOptions, (option) => option.value);
    setSelectedOption(selectedOptions);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
      // Handle form submission logic here
   
      // Display a success toast notification
      toast.success('Form submitted successfully!');
      await new Promise((resolve) => setTimeout(resolve, 100));
      navigate('/profile', { state: { toastMessage: 'Form submitted successfully!' } });
   
    // Handle form submission logic here
    console.log(formData);
  };
  const handleDateChange = (date) => {
    setFormData((prevData) => ({
      ...prevData,
      dateOfBirth: date,
    }));
  };
 
   const handleNextStep = () => {
    if (step < 4) {
      setStep(step + 1);
    }
  };

  const handlePrevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };


return (
 <div className="container">

<div className="containerchat">
<GlobalStyles/>
    <div className="margin-left-sidebar p-0 responsive-flex">
    
    <div className="chat">
      <div className="height-contain">
      <div className="chat-messages responsive-space d-flex justify-content-center flex-column">
     
      <h3 className="m-3 text-center mb-4 mt-5">Admission Form </h3>
      <div className="indicator mx-auto mb-3">
    {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className={`step-indicator ${step === index + 1 ? 'active' : ''}`}
          >
            {index + 1}
          </div>
        ))}
        </div>
      <Form onSubmit={handleSubmit} className="admissionform">
         {step === 1 && (
      <Row className="mb-3">
      <Form.Group as={Col} controlId="formGridPassword">
          <Form.Label> First Name</Form.Label>
          <Form.Control
            type="text"
            name="fname"
            value={formData.name}
            onChange={handleFormChange}
            placeholder="First Name"
          />
        </Form.Group>
        <Form.Group as={Col} controlId="formGridEmail">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type="text"
            name="lname"
            value={formData.email}
            onChange={handleFormChange}
            placeholder="Your Father's Name"
          />
        </Form.Group>
              <Form.Group as={Col} controlId="formGridPassword">
          <Form.Label>Father's Name</Form.Label>
          <Form.Control
            type="text"
            name="father"
            value={formData.name}
            onChange={handleFormChange}
            placeholder="Father's Name"
          />
        </Form.Group>
        <Form.Group as={Col} controlId="formGridPassword">
          <Form.Label>Address</Form.Label>
          <Form.Control
            type="text"
            name="address"
            value={formData.name}
            onChange={handleFormChange}
            placeholder="Address"
          />
        </Form.Group>
        <button type="button" onClick={handleNextStep}>
              Next
            </button>
      </Row>
         )}
          {step === 2 && (
      <Row className="mb-3">

        <Form.Group as={Col} controlId="formGridCity">
          <Form.Label>Place of Birth</Form.Label>
          <Form.Control
            type="text"
            name="city"
            value={formData.city}
            onChange={handleFormChange}
          />
        </Form.Group>
         <button type="button" onClick={handlePrevStep}>
              Previous
            </button>
            <button type="button" onClick={handleNextStep}>
              Next
            </button>
      </Row>
     
          )}
           {step === 3 && (
      <Row className="mb-3">
        
        <Form.Group as={Col} controlId="formGridAddress1">
        <Form.Label className="w-100">Date Of Birth</Form.Label>
        <DatePicker
        className="w-100"
          selected={formData.dateOfBirth} // Set the selected date
          onChange={handleDateChange} 
          showMonthDropdown
                  showYearDropdown
                  dropdownMode="select"
                  dateFormat={"dd-MM-yyyy"}
                  peekNextMonth// Handle date change
          placeholderText="Select Date of Birth"
        />
      </Form.Group>
      <Form.Group controlId="exampleForm.SelectCustom">
        <Form.Label>Select Grade:</Form.Label>
        <Form.Control as="select" custom value={selectedOption} onChange={handleSelectChange}>
          <option value="">Select grade</option>
          <option value="grade1">Grade 1</option>
          <option value="grade2">Grade 2</option>
          <option value="grade3">Grade 3</option>
          <option value="grade4">Grade 4</option>
          <option value="grade5">Grade 5</option>
          <option value="grade6">Grade 6</option>
          <option value="grade7">Grade 7</option>
        
          {/* Add more options as needed */}
        </Form.Control>
      </Form.Group>
      <button type="button" onClick={handlePrevStep}>
              Previous
            </button>
            <button type="button" onClick={handleNextStep}>
              Next
            </button>
      </Row>

           )}

       {step === 4 && (
        <>
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
       <button type="button" onClick={handlePrevStep}>
              Previous
            </button>
            <button type="button" onClick={handleNextStep}>
              Next
            </button>
      </>
       )}

      <Button variant="primary" type="button" onClick={handleSubmit}>
        Submit
      </Button>
    </Form>

      
              </div>
      </div>
    </div>
    </div>
  {/* <Footer /> */}
</div>
</div>
);
}
export default StepByStepForm;