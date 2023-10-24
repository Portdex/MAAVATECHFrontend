import React, { memo,useState,  useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { createGlobalStyle } from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import '../assets/chat.css'
import { Formik } from 'formik'
import { Row , Col , Button , Form,  } from "react-bootstrap";
import { allDocuments } from "../data/data";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {  ToastContainer,toast } from 'react-toastify';
import { Auth } from "aws-amplify";
import admission from '../actions/admissionForm'
import 'react-toastify/dist/ReactToastify.css';
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



const AdmissionForm = ({
  firstName,
  setFirstName,
  lastName,
  setLastName,
  fatherName,
  setFatherName,
  birthPlace,
  setBirthPlace,
  DOB,
  setDOB,
  grade,
  setGrade,
  address,
  setAddress,
  file,
  setFile,
  handleData,
}) => {
return (
 <div className="container">

<div className="containerchat">
<GlobalStyles/>
    <div className="margin-left-sidebar p-0 responsive-flex">
    
    <div className="chat">
      <div className="height-contain">
      <div className="chat-messages responsive-space d-flex justify-content-center flex-column">
      <h3 className="m-3 text-center mb-4 mt-5">Admission Form </h3>
      <Formik 
      initialValues={{
        firstName:firstName,
        lastName:lastName,
        fatherName:fatherName,
        birthPlace : birthPlace,
        DOB : DOB,
        address : address,
        grade : grade
      }}
      >
         {({
          handleSubmit,
          handleChange,
          handleBlur,
          values,
          touched,
          errors,
        }) => (
      <Form noValidate onSubmit={handleSubmit}>
      <Row className="mb-3">
      <Form.Group as={Col} controlId="formGridPassword">
          <Form.Label> First Name</Form.Label>
          <Form.Control
            type="text"
            name="firstName"
            value={firstName}
            onChange={
              e => {handleChange(e)
              setFirstName(e.target.value)
              }}
            placeholder="First Name"
          />
        </Form.Group>
        <Form.Group as={Col} controlId="formGridEmail">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type="text"
            name="lastName"
            value={lastName}
            onChange={
              e => {handleChange(e)
              setLastName(e.target.value)
              }}
            placeholder="Last Name"
          />
        </Form.Group>
      </Row>
      <Row className="mb-3">
      <Form.Group as={Col} controlId="formGridPassword">
          <Form.Label>Father's Name</Form.Label>
          <Form.Control
            type="text"
            name="fatherName"
            value={fatherName}
            onChange={
              e => {handleChange(e)
              setFatherName(e.target.value)
              }}
            placeholder="Father's Name"
          />
        </Form.Group>
        <Form.Group as={Col} controlId="formGridCity">
          <Form.Label>Place of Birth</Form.Label>
          <Form.Control
            type="text"
            name="birthPlace"
            value={birthPlace}
            onChange={
              e => {handleChange(e)
              setBirthPlace(e.target.value)
              }}
          />
        </Form.Group>
      </Row>
     

      <Row className="mb-3">
        
        <Form.Group as={Col} controlId="formGridAddress1">
        <Form.Label className="w-100">Date Of Birth</Form.Label>
        <DatePicker
        className="w-100"
          selected={DOB} // Set the selected date
          onChange={(date) => setDOB(date)} 
          defaultValue={new Date()}
          showMonthDropdown
                  showYearDropdown
                  dropdownMode="select"
                  dateFormat={"dd-MM-yyyy"}
                  peekNextMonth// Handle date change
          placeholderText="Select Date of Birth"
        />
      </Form.Group>
      <Form.Group controlId="exampleForm.SelectCustom">
      <Form.Label>Grade</Form.Label>
                <Form.Select
                  //disabled={bcf_resident}
                  defaultValue={grade} 
                  onChange={e => {setGrade(e.target.value)}} 
                  aria-label="Default select example" 
                  placeholder='Select an option'
                >
                  <option value='grade1'>Grade 1</option>
                  <option value='grade2'>Grade 2</option>
                  <option value='grade3'>Grade 3</option>
                  <option value='grade4'>Grade 4</option>
                  <option value='grade5'>Grade 5</option>
                  <option value='grade6'>Grade 6</option>
                  <option value='grade7'>Grade 7</option>
                  <option value='grade8'>Grade 8</option>
                </Form.Select>
      </Form.Group>
     
      </Row>
      <Form.Group className="mb-3" controlId="formGridPassword">
          <Form.Label>Address</Form.Label>
          <Form.Control
            type="text"
            name="address"
            value={address}
            onChange={
              e => {handleChange(e)
              setAddress(e.target.value)
              }}
            placeholder="Address"
          />
        </Form.Group>
      {/* <Form.Group controlId="exampleForm.SelectCustom">
        <Form.Label>Select an option:</Form.Label>
        <Form.Control as="select" custom value={selectedOption} onChange={handleSelectChange}>
          <option value="">Choose Documents to upload</option>
          <option value="option1">Application Form</option>
          <option value="option2">Birth Certificate</option>
          <option value="option3">Passport-size Photographs</option>
          <option value="option4">Parent/Guardian Identification</option>
         
        </Form.Control>
      </Form.Group> */}
      <Form.Group className="mb-3" controlId="formGridFile">
        <Form.Label>Upload Application Form</Form.Label>
        <Form.Control type="file" name="file" />
      </Form.Group>

      {/* <Form.Group className="mb-3" id="formGridCheckbox">
        <Form.Check
          type="checkbox"
          name="checked"
          checked={formData.checked}
          onChange={handleFormChange}
          label="Check me out"
        />
      </Form.Group> */}

      <Button variant="primary" type="button" onClick={(event) => {
          handleData(event); // Pass the event
        }}>
        Submit
      </Button>
      <ToastContainer />
    </Form>
 )}
 </Formik>
      
              </div>
      </div>
    </div>
    </div>
  {/* <Footer /> */}
</div>
</div>
);
}
export default AdmissionForm;