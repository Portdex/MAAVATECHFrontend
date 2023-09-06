import React from 'react';
import { createGlobalStyle } from 'styled-components';
import { Formik  } from 'formik';
import {

  Form,
  InputGroup,
  FormControl,
  Button,
  Spinner
} from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux'
import * as yup from 'yup'
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
  code: yup.string().required('Please input verification code'),
});

const Confirmation = ({
  code, 
    setCode, 
    onConfirmation, 
    handleResend, 
    loading,
    load
}) => {
  const email = useSelector(state => state.auth.currentUser?.email || '' )
  const phone = useSelector(state => state.auth.currentUser?.phone || '' )


  return (
    <div className='w-100'>
      <GlobalStyles/>
      <section className='jumbotron breadcumb no-bg' style={{backgroundImage: `url(${'./img/background/subheader.jpg'})`}}>
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
                  <h3 className="mb10">Verify</h3>
                  <p>Verify For MaavaTech.</p>
                  <Formik
                    validationSchema={schema}
                    onSubmit={e => 
                      onConfirmation()
                    }
                    initialValues={{
                      code: code
                    }}
                  >
                     {({  handleSubmit,
              handleChange,
              handleBlur,
              values,
              touched,
              errors, }) => (
                          <Form noValidate onSubmit={handleSubmit} className="form-border">
                            <div className="field-set">
                            <Form.Label htmlFor='basic-url'>Please Enter Verification Code</Form.Label>
                <InputGroup className='mb-5'>
                  <FormControl type='text' name='code' value={code} onChange={e => {
                    handleChange(e)
                    setCode(e.target.value)
                  }} isInvalid={!!touched && !!errors.code} onBlur={handleBlur} />
                  <Button type='submit' variant='primary'>
                    {loading && <Spinner animation='border' />}
                      Verify
                  </Button>
                  <Form.Control.Feedback type='invalid'>
                    {errors.code}
                  </Form.Control.Feedback>
  
                </InputGroup>
                            </div>
                            {/* <div className="field-set">
                              <Field className="form-control" type="password" name="password" />
                              <ErrorMessage name="password" component="div" />
                            </div> */}
                            <div className="field-set">
                              {/* <input onClick={handleConfirm} type='submit' id='send_message' value='Submit' className="btn btn-main btn-fullwidth color-2"/> */}
                               <Button variant='primary' onClick={handleResend}>
                              {load && <Spinner animation='border' />}
                                Resend code
                            </Button>
                            </div>
                            <div className="clearfix"></div>
                            <div className="spacer-single"></div>
                           
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
export default Confirmation;