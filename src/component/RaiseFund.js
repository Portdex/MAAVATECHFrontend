import React, { memo,useState,  useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { createGlobalStyle } from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import { Formik } from 'formik'
import '../assets/chat.css'
import PhoneInput from 'react-phone-number-input'
import { Row , Col , Button , Form } from "react-bootstrap";
import { fund } from "../actions/fund";
import { Auth } from "aws-amplify";
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



const RaiseFunds = ({
  name , 
  setName,
  email, 
  setEmail,
  orphanName,
  setOrphanName,
  amount,
  setAmount,
  description,
  setDescription,
  phone,
  setPhone,
  file,
  setFile,
  city , 
  setCity,
  handleFileUpload,
  currentEmail,
  setCurrentEmail,  
  handleData,
}) => {
  const { username } = useParams();
    const dispatch = useDispatch()
 const navigate = useNavigate();

 useEffect(()=>{
  Auth.currentAuthenticatedUser()
      .then(data => {
        setCurrentEmail(data?.attributes?.email)
      })
      .catch(err => {
        console.log(err);
        // If the user is not authenticated, navigate to the login page
        navigate('/login');
        localStorage.setItem("formhistory" , "raisefund")
      });
      },[])
 
return (
 <>
 <div className="container">
<div className="containerchat">
<GlobalStyles/>
    <div className="margin-left-sidebar p-0 responsive-flex">
    
    <div className="chat">
      <div className="height-contain">
      <div className="chat-messages responsive-space d-flex justify-content-center flex-column">
      <h3 className="m-3 text-center mb-4  mt-5">Raise Fund Form </h3>
      <Formik 
      initialValues={{
        name:name,
        email:currentEmail? currentEmail : email,
        description:description,
        city : city,
        phone : phone,
        orphanName : orphanName,
        amount : amount
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
            <Form.Group as={Col} xs={12} lg={6} md={6} controlId="formGridName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={name}
                onChange={
                  e => {handleChange(e)
                  setName(e.target.value)
                  }}
                placeholder="Enter Your Name"
                required
                isInvalid={!!touched && !!errors.firstName}
                  onBlur={handleBlur}
              />
            </Form.Group>
            <Form.Group as={Col} xs={12} lg={6} md={6} controlId="formGridEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={currentEmail ? currentEmail : email}
                disabled= { currentEmail ? true : false }
                onChange={e => {handleChange(e);
                  setEmail(e.target.value)
                  }}
                placeholder="Enter email"
                required
                // isInvalid={!!touched && !!errors.lastName}
              />
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} xs={12} lg={6} md={6} controlId="formGridName">
              <Form.Label>Orphan Name</Form.Label>
              <Form.Control
                type="text"
                name="orphanName"
                value={orphanName}
                onChange={
                  e => {handleChange(e)
                  setOrphanName(e.target.value)
                  }}
                placeholder="Enter Orphan Name"
                required
              />
            </Form.Group>
            <Form.Group as={Col} xs={12} lg={6} md={6} controlId="formGridEmail">
            <Form.Label>Phone Number</Form.Label>
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
                    />
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} xs={12} lg={6} md={6} controlId="formGridCity">
              <Form.Label>City</Form.Label>
              <Form.Control
                type="text"
                name="city"
                value={city}
                onChange={e => {handleChange(e);
                  setCity(e.target.value)
                  }}
                required
              />
            </Form.Group>
            <Form.Group as={Col} xs={12} lg={6} md={6} controlId="formGridCity">
              <Form.Label> How much are you looking for fund raising?</Form.Label>
              <Form.Control
                type="number"
                name="amount"
                value={amount}
                onChange={e => {handleChange(e);
                  setAmount(e.target.value)
                  }}
                required
              />
            </Form.Group>
          </Row>

          <Form.Group className="mb-3" controlId="formGridAddress1">
            <Form.Label>Description</Form.Label>
            <Form.Control
            as="textarea"
              type="text"
              name="description"
              value={description}
              onChange={e => {handleChange(e);
                setDescription(e.target.value)
                }}
              placeholder="Write your message"
              required
              style={{ height: '150px' }}
            />
          </Form.Group>
      <Form.Group className="mb-3" controlId="formGridFile">
        <Form.Label>Upload File</Form.Label>
        <Form.Control type="file" name="file" onChange={handleFileUpload} />
      </Form.Group>
          <Button variant="primary" type="submit"
         onClick={(event) => {
          handleData(event); // Pass the event
        }}>
            Submit
          </Button>
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
</>
);
}
export default RaiseFunds;