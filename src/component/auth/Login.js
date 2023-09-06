import React from 'react';
import {
  Button,
  Spinner,
  Form
} from 'react-bootstrap'
import { createGlobalStyle } from 'styled-components';
import {  Formik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { Auth } from "aws-amplify";
import * as yup from 'yup'
import { useSelector } from 'react-redux'
const GlobalStyles = createGlobalStyle`
  header#myHeader.navbar.sticky.white {
    background: #403f83;
    border-bottom: solid 1px #403f83;
  }
  header#myHeader.navbar .search #quick_search{
    color: #fff;
    background: rgba(255, 255, 255, .1);
  }
  header#myHeader.navbar.white .btn, .navbar.white a, .navbar.sticky.white a{
    color: #fff;
  }
  header#myHeader .dropdown-toggle::after{
    color: rgba(255, 255, 255, .5);
  }
  header#myHeader .logo .d-block{
    display: none !important;
  }
  header#myHeader .logo .d-none{
    display: block !important;
  }
  @media only screen and (max-width: 1199px) {
    .navbar{
      background: #403f83;
    }
    .navbar .menu-line, .navbar .menu-line1, .navbar .menu-line2{
      background: #fff;
    }
    .item-dropdown .dropdown a{
      color: #fff !important;
    }
  }
`;

const schema = yup.object().shape({
  email: yup.string()
    .email('Invalid email address')
});



const Login = ({
  email, 
  setEmail, 
  onLogin, 
  loading 
}) => {
  const navigate = useNavigate();
  // const redirectUser = (path) => {
  //   navigate(path);



  return (
    <div className='w-100'>
      <GlobalStyles/>
      <section className='jumbotron breadcumb no-bg' style={{backgroundImage: `url(${'/img/background/subheader.jpg'})`}}>
        <div className='mainbreadcumb'>
          <div className='container'>
            <div className='row align-items-center'>
              <div className="col-lg-5 text-light wow fadeInRight" data-wow-delay=".5s">
                  <div className="spacer-10"></div>
                  <h1>Maavatech is All in One Solution for Education Sector</h1>
                  <p className="lead">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim.</p>
              </div>
              <div className="col-lg-5 offset-lg-2 wow fadeIn" data-wow-delay=".5s">
                <div className="box-login">
                  <h3 className="mb10">Sign In</h3>
                  <p>Login using an existing account or create a new account <span> <a href='/signup'> here </a> </span>.</p>
                  <Formik
                   validationSchema={schema}
                   onSubmit={e => onLogin()}
                   initialValues={{
                     email: email,
                   }}
                  >
                     {({ handleSubmit,
        handleChange,
        handleBlur,
        values,
        touched,
        errors,}) => (
    
                        // const isAllValid = isValid;
                        // const submitValidationMessage = 'Please fill in all required fields';

                       
                          <Form className="form-border"  noValidate onSubmit={handleSubmit}>
                            <div className="field-set">
                              {/* <Field className="form-control" type="email" name="identifier" />
                              <ErrorMessage name="identifier" component="div" /> */}
                            <Form.Control
                  className='px-3 w-100 h-100 rounded-3'
                  placeholder='E.g.name@example.com'
                  type='text'
                  style={{
                    fontSize: '15px',
                  }}
                  name='email'
                  value={email}
                  onChange={e => {
                    handleChange(e)
                    setEmail(e.target.value)
                  }} isInvalid={!!touched && !!errors.email} onBlur={handleBlur}
                />
                            </div>
                            {/* <div className="field-set">
                              <Field className="form-control" type="password" name="password" />
                              <ErrorMessage name="password" component="div" />
                            </div> */}
                            <div className="field-set">
                              {/* <input onClick={handleLogin} type='submit' id='send_message' value='Submit' className="btn btn-main btn-fullwidth color-2"/> */}
                              <Button
            className='w-100 d-flex justify-content-center align-items-center'
            style={{
              height: '56px',
              fontSize: '1.2rem',
              borderRadius: '10rem',
              margin: '10px 0px',
              padding: '0px 2rem',
              border: 'none',
              backgroundColor: `${ email ? 'black' : 'rgb(222, 226, 233)'}`,
              color: `${ email ? 'white' : 'rgb(82, 87, 99)'}`,
            }}
            type='submit'
            disabled={( email) ? false : true}
          >
            {loading && <Spinner animation='border' />}
              &nbsp;&nbsp;&nbsp;Sign In
          </Button>  
                            </div>
                            <div className="clearfix"></div>
                            <div className="spacer-single"></div>
                            <ul className="list s3">
                              <li>Login with:</li>
                              {/* <li><span >Facebook</span></li> */}
                              <li><span >Google</span></li>
                            </ul>
                            <div className="spacer-half"></div>
                          </Form>
                        )
                    }
                  </Formik>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


    </div>
  )
};
export default Login;