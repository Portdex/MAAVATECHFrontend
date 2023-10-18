import { Auth } from 'aws-amplify';
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useNavigate } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';

import * as yup from 'yup'
const schema = yup.object().shape({
  name: yup.string().required('Please input firstName'),
  orphanName: yup.string().required('Please input lastName'),
  email: yup.string().email('Invalid email format').required('Please input your email'),
  phone: yup.string().required('Please input your telephone number'),
  city: yup.string().required('Please select your country'),
});
// ... Other imports

const Checkform = () => {
  const { addToast } = useToasts();
const navigate = useNavigate()
  const handleData = async (values) => {
    try {
      let session = await Auth.currentSession();
      if (session) {
        // Dispatch the form data if needed
        // dispatch(fund(values));

        const response = await axios({
          method: 'post',
          url: 'https://153a5f6sbb.execute-api.eu-west-2.amazonaws.com/test/createFundRaiseEntry',
          data: values,
          crossDomain: true,
        });

        if (response.status === 200) {
          // Display a success toast
          addToast('Your form is submitted successfully', {
            appearance: 'success',
            autoDismiss: true,
          });

          // Redirect to a different page
          localStorage.setItem('category', 'Orphan');
          navigate('/category');
        } else {
          // Handle form submission failure
          // You can display an error toast or take other actions
          addToast('Form submission failed', {
            appearance: 'error',
            autoDismiss: true,
          });
        }
      } else {
        // User is not authenticated, navigate to the login page
        navigate('/login');
        localStorage.setItem('formhistory', 'raisefund');
      }
    } catch (error) {
      console.error('Error submitting form:', error);

      // Handle any other error conditions, and you can display an error toast as well
      addToast('Form submission failed', {
        appearance: 'error',
        autoDismiss: true,
      });

      // Navigate to the login page
      navigate('/login');
      localStorage.setItem('formhistory', 'raisefund');
    }
  };

  return (
    <div>
      <h2>Raise Fund Form</h2>
      <Formik
        initialValues={{
          name: '',
          email: '',
          orphanName: '',
          city: '',
          phoneNumber: '',
          description: '',
          amount: '',
        }}
        validationSchema={schema}
        onSubmit={(values) => {
          handleData(values);
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <div>
              <label>Name:</label>
              <Field type="text" name="name" required />
              <ErrorMessage name="name" component="div" />
            </div>
            <div>
              <label>Email:</label>
              <Field type="text" name="email" required />
              <ErrorMessage name="email" component="div" />
            </div>
            <div>
              <label>Orphan Name:</label>
              <Field type="text" name="orphanName" required />
              <ErrorMessage name="orphanName" component="div" />
            </div>

            <div>
              <label>Phone Number:</label>
              <Field type="text" name="phoneNumber" required />
              <ErrorMessage name="phoneNumber" component="div" />
            </div>
            <div>
              <label>City:</label>
              <Field type="text" name="city" required />
              <ErrorMessage name="city" component="div" />
            </div>
            <div>
              <label>Description:</label>
              <Field type="text" name="description" required />
              <ErrorMessage name="description" component="div" />
            </div>
            <div>
              <label>Amount:</label>
              <Field type="text" name="amount" required />
              <ErrorMessage name="amount" component="div" />
            </div>
            {/* Repeat for other form fields */}
            <button type="submit" disabled={isSubmitting}>
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Checkform;
