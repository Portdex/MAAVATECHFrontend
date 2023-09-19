import React, { memo,useState,  useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { createGlobalStyle } from 'styled-components';
import { useNavigate, useParams ,useLocation} from 'react-router-dom';
import Sidebars from "../menu/sidebar";
import '../assets/profile.css'
import '../assets/chat.css';
import { toast,ToastContainer } from 'react-toastify';
import * as yup from 'yup'
import { Auth } from 'aws-amplify'
import { Col, Row } from "react-bootstrap";
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
.top-navbar
{
background: linear-gradient(87deg, #172b4d 0, #1a174d 100%) !important;
color: white;
opacity:0.9
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



const Profile = ({ authorId }) => {
  
 const navigate = useNavigate();
 const location = useLocation();
const [currentEmail, setCurrentEmail]=useState('')
const [userData, setUserData]=useState('')
const [post, setPost] = useState([]);
console.log(post)
const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
//  if (toastMessage) {
//    // Display the success toast notification received from the previous page
//    toast.success(toastMessage);
//  }
useEffect(()=>{
Auth.currentAuthenticatedUser()
    .then(data => {
      setCurrentEmail(data?.attributes?.email)
      
      setUserData(data?.attributes)
      console.log(userData)
    })
    .catch(err => console.log(err))

      // navigate('/login')
    },[])
    useEffect(() => {
      fetch("https://153a5f6sbb.execute-api.eu-west-2.amazonaws.com/test/getFundRaiseForms")
        .then(response => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then(data => {
          data = data.data;
          // Filter data where the email matches currentEmail
          const filteredData = data.filter(item => item.email === currentEmail);
          setPost(filteredData);
          setLoading(false);
        })
        .catch(err => {
          setError(err);
          setLoading(false);
        });
    }, [currentEmail]); 

return (
    <>
    <GlobalStyles/>

 <div className="main-content p-0">
    {/* <!-- Top navbar --> */}
    {/* <!-- Header --> */}
    <div className="header pb-8 pt-5 pt-lg-8 d-flex align-items-center" style={{
  minHeight: "400px",
  backgroundSize: "cover",
  backgroundPosition: "center top"
}}>
      {/* <!-- Mask --> */}
      <span className="mask bg-gradient-default opacity-8"></span>
      {/* <!-- Header container --> */}
      <div className="container-fluid d-flex align-items-center">
        <div className="row">
          <div className="col-lg-12 col-md-12">
            <h2 className="display-2 text-white">Hello {userData?.name}</h2>
            <p className="text-white mt-0 mb-5">This is your profile page. You can see the progress you've made with your work and manage your projects or assigned tasks</p>
          </div>
        </div>
      </div>
    </div>
    {/* <!-- Page content --> */}
    <div className="container-fluid mt--7">
      <div className="row">
        <div className="col-xl-12 order-xl-1">
          <div className="card  shadow">
            <div className="card-header bg-white border-0">
              <div className="row align-items-center">
                <div className="col-8">
                  <h3 className="mb-0">My account</h3>
                </div>
                <div className="col-4 text-right">
                  <a href="#!" className="btn btn-sm btn-primary">Settings</a>
                </div>
              </div>
            </div>
            <div className="card-body">
              <form>
                <h6 className="heading-small text-muted mb-4">User information</h6>
                <div className="pl-lg-4">
                  <div className="row">
                    <div className="col-lg-6">
                      <div className="form-group focused">
                        <label className="form-control-label" for="input-username">Username</label>
                        <input type="text" id="input-username" disabled className="form-control form-control-alternative" placeholder="Username" value={userData?.name}/>
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="form-group">
                        <label className="form-control-label" for="input-email">Email address</label>
                        <input type="email" id="input-email" disabled className="form-control form-control-alternative" placeholder="jesse@example.com" value={userData?.email}/>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-6">
                      <div className="form-group focused">
                        <label className="form-control-label" for="input-first-name">PhoneNumber</label>
                        <input type="text" disabled id="input-first-name" className="form-control form-control-alternative" placeholder="First name" value={userData?.phone_number}/>
                      </div>
                    </div>
                  </div>
                </div>
                <hr className="my-4"/>
                {/* <!-- Address --> */}
 
                {/* <!-- Description --> */}
                <h6 className="heading-small text-muted mb-4">My Timeline</h6>
                <div className="pl-lg-4">
                {post.map((post, index) => (
        <Row className='headline-row' key={index}>
          <Col className="col-2 headline-image">
            <img src={post.image? post.image : '/img/favi.jpg'} alt="" />
          </Col>
          <Col className='col-10 headline-text'>
            <h4>{post.orphanName ? post.orphanName : '-'}</h4>
            <p>
              {post.description ? post.description : '-'}
            </p>
            <p>
              {post.amount_to_raise ? post.amount_to_raise : '-'}
            </p>
            <span className='category-tag'>
            {post.name ? post.name : '-'}
              <i className="fas fa-circle"></i>
            </span>
            <span className="date">
              {post.city ? post.city : '-'}
            </span>
          </Col>
        </Row>
      ))}
                </div>
              
              </form>
            
          </div>
        </div>
      </div>
    </div>
  </div>
  </div>
  </>
);
}
export default Profile;