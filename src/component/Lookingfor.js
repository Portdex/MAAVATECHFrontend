import React, { memo,useState,  useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { createGlobalStyle } from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import '../assets/chat.css'
import { Row , Col , Button , Form,  } from "react-bootstrap";
import PhoneInput from 'react-phone-number-input'
import { Formik } from 'formik'
import CountrySelect from 'react-bootstrap-country-select';
import '../assets/forms.css'
import { Auth } from "aws-amplify";
import { lookingfor } from "../actions/lookingfor";

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



const LookingFor = ({ 
  email, 
  setEmail,
  name,
  setName,
  lookingFor,
  setLookingFor,
  grade,
  setGrade,
  description,
  setDescription,
  phone,
  setPhone,
  country , 
  setCountry,
  currentEmail,
  setCurrentEmail,  
  handleData,
}) => {
  useEffect(()=>{
    Auth.currentAuthenticatedUser()
        .then(data => {
          setCurrentEmail(data?.attributes?.email)
        })
        .catch(err => console.log(err))
    
          // navigate('/login')
        },[])
   const [step, setStep] = useState(1);
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
     
      <h3 className="m-3 text-center mb-4 mt-5"> Post </h3>
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
        <Formik 
      initialValues={{
        name: name ,
        email:currentEmail ? currentEmail : email,
        description:description,
        country : country,
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
      <Form noValidate onSubmit={handleSubmit} className="admissionform">
         {step === 1 && (
      <Row className="mb-3 d-flex justify-content-end text-start">
      <Form.Group as={Col} xs={12} controlId="formGridPassword">
      <Form.Label>What are you looking For</Form.Label>
      <Form.Select
        name="lookingFor"
        value={lookingFor}
        onChange={e => {handleChange(e);
          setLookingFor(e.target.value)
          }}
          required
      >
        <option value="">Select an option</option>
        <option value="School Admission">School Admission</option>
        <option value="College Admission">College Admission</option>
        <option value="University Admission">University Admission</option>
        <option value="Education Consultant">Education Consultant</option>
        <option value="Buying Books">Buying Books</option>
      </Form.Select>
    </Form.Group>
    {lookingFor === '' ?
        <button className='next-button disabled' type="button" disabled>
              Next
            </button>
            :
            <button className='next-button' type="button" onClick={handleNextStep}>
              Next
            </button>
            }
      </Row>
         )}
          {step === 2 && (
      <Row className="mb-3 d-flex justify-content-end text-start">

<Form.Group as={Col} xs={12} controlId="formGridCity">
      <Form.Label>Grade</Form.Label>
      <Form.Select
        name="grade"
        value={grade}
        onChange={e => {handleChange(e);
          setGrade(e.target.value)
          }}
          required
      >
        {lookingFor === "School Admission" && (
          <>
            <option value="">Select a grade</option>
            <option value="Grade 1">Grade 1</option>
            <option value="Grade 2">Grade 2</option>
            <option value="Grade 3">Grade 3</option>
            <option value="Grade 4">Grade 4</option>
            <option value="Grade 5">Grade 5</option>
            <option value="Grade 6">Grade 6</option>
            <option value="Grade 7">Grade 7</option>
            <option value="Grade 8">Grade 8</option>
            <option value="Grade 9">Grade 9</option>
            <option value="Grade 10">Grade 10</option>
            {/* Add more grade options as needed */}
          </>
        )}
        {lookingFor === "College Admission" && (
          <>
            <option value="">Select an option</option>
            <option value="Grade 11`">Grade 11`</option>
            <option value="Grade 12">Grade 12</option>
          </>
        )}
        {lookingFor === "University Admission" && (
          <>
            <option value="">Select an option</option>
            <option value="Graduate">Graduate</option>
            <option value="Postgraduate">Postgraduate</option>
          </>
        )}
          {lookingFor === "Education Consultant" && (
          <>
            <option value="">Select a grade</option>
            <option value="Graduate">Graduate</option>
            <option value="Postgraduate">Postgraduate</option>
          </>
        )}
        {lookingFor === "Buying Books" && (
          <>
            <option value="">Select a grade</option>
            <option value="Grade 1">Grade 1</option>
            <option value="Grade 2">Grade 2</option>
            <option value="Grade 3">Grade 3</option>
            <option value="Grade 4">Grade 4</option>
            <option value="Grade 5">Grade 5</option>
            <option value="Grade 6">Grade 6</option>
            <option value="Grade 7">Grade 7</option>
            <option value="Grade 8">Grade 8</option>
            <option value="Grade 9">Grade 9</option>
            <option value="Grade 10">Grade 10</option>
            {/* Add more grade options as needed */}
          </>
        )}
        {/* Add more grade options as needed */}
      </Form.Select>
    </Form.Group>
    
         <button className='next-button' type="button" onClick={handlePrevStep}>
              Previous
            </button>
            <button className='next-button' type="button" onClick={handleNextStep}>
              Next
            </button>
            
      </Row>
     
          )}
           {step === 3 && (
      <Row className="mb-3 d-flex justify-content-end text-start">
        
        <Form.Group as={Col} xs={12} controlId="formGridAddress1">
        <Form.Label className="w-100">Country</Form.Label>
        <CountrySelect
              name="country"
              value={country}
              onChange={setCountry}
              // You can add any additional props as needed
            />
      </Form.Group>
      <button className='next-button' type="button" onClick={handlePrevStep}>
              Previous
            </button>
            <button className='next-button' type="button" onClick={handleNextStep}>
              Next
            </button>
      </Row>

           )}

       {step === 4 && (
        <Row className="mb-3 d-flex justify-content-end text-start">
         <Form.Group as={Col} xs={12} controlId="formGridName">
          <Form.Label> Name </Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={name}
            onChange={
              e => {handleChange(e)
              setName(e.target.value)
              }}
            placeholder="Your Name"
            required
          />
        </Form.Group>
        <Form.Group as={Col} xs={12} controlId="formGridEmail">
          <Form.Label> Email </Form.Label>
          <Form.Control
            type="text"
            name="email"
            value={currentEmail ? currentEmail : email}
            disabled= { currentEmail ? true : false }
            onChange={e => {handleChange(e);
              setEmail(e.target.value)
              }}
            placeholder="tom@gmail.com"
            required
          />
        </Form.Group>
        <Form.Group as={Col} xs={12} controlId="formGridContact">
          <Form.Label> Phone Number </Form.Label>
          <PhoneInput
                      className='px-3 phone-input'
                      type='tel'
                      placeholder="Enter phone number"
                      international
                      name='phone'
                      defaultCountry="US"
                      value={phone}
                      onChange={setPhone}
                      style={{
                        fontSize: '15px',
                      }}
                      required
                    />
        </Form.Group>
        <Form.Group as={Col} xs={12} controlId="formGriddetail">
          <Form.Label> Description </Form.Label>
          <Form.Control
          as="textarea"
            type="text"
            name="description"
            value={description}
            onChange={e => {handleChange(e);
              setDescription(e.target.value)
              }}
            placeholder="Type your message"
            style={{height:'150px'}}
            required
          />
        </Form.Group>
     
       <button className='next-button' type="button" onClick={handlePrevStep}>
              Previous
            </button>
            <button  className='next-button' type="button" onClick={() => {
            handleData()
          }}>
        Submit
      </button>
      </Row>
       )}

     
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
export default LookingFor;