import React, { memo,useState,  useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { createGlobalStyle } from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import Packages from "../containers/Packages";
import '../assets/chat.css';
import Loader from '../containers/Loader';
import ShareButton from "../containers/ShareButton";
import { 
  Tuitions,
  Tutors,
  Events,
  Book,
  UsedBook,
  Uniform,
  Orphans, } from '../data/data';
import Footer from "../menu/footer";
import axios from 'axios';
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
const Details = ({ authorId }) => {
  const { username } = useParams();
  const [userData, setUserData] = useState([])
  const [storeData, setStoreData] = useState([])
  const [serviceData, setServiceData] = useState([])
  const [loading , setLoading]= useState(false)
  const [openMenu, setOpenMenu] = React.useState(true);
  const [openMenu1, setOpenMenu1] = React.useState(false);
  const [openMenu2, setOpenMenu2] = React.useState(false);
  const [openMenu3, setOpenMenu3] = React.useState(false);
  const navigate = useNavigate();
  const [school, setSchool] = useState([]);
  const [colleges, setColleges] = useState([]);
  const [universities, setUniversities] = useState([]);
  const [consultant, setConsultant] = useState([]);
  const [error, setError] = useState(null);
  const [userCity, setUserCity] = useState('');
  const [userLocation, setUserLocation] = useState({});
  const [selectedCity, setSelectedCity] = useState("");
  const [orphan, setOrphan] = useState([]);
  console.log('userData' , userData)

  const getUserCity = async () => {
    setLoading(true)
    try {      
      
      if (navigator.geolocation) {
        // get the current users location
        navigator.geolocation.getCurrentPosition(
          (position) => {
            // save the geolocation coordinates in two variables
            const { latitude, longitude } = position.coords;
            // update the value of userlocation variable
            setUserLocation({ latitude, longitude });
            
          },
          // if there was an error getting the users location
          (error) => {
            console.error('Error getting user location:', error);
          }
        );
      }
      // if geolocation is not supported by the users browser
      else {
        console.error('Geolocation is not supported by this browser.');
      }
          
    } catch (error) {
      console.error('Error getting user city:', error);
      setUserLocation({})
    }
    setTimeout(() => {
      setLoading(false);
    }, 5000);
  };
  const fetchDataForCity = async (selectedCity) => {
    setLoading(true)
    try {
      const schoolDataResponse = await axios.get(
        `https://153a5f6sbb.execute-api.eu-west-2.amazonaws.com/test/getSchoolsByLatitude/${selectedCity.latitude}/longitude/${selectedCity.longitude}`
      );
      setSchool(schoolDataResponse.data.schools.results);
      setColleges(schoolDataResponse.data.colleges.results);
      setUniversities(schoolDataResponse.data.universities.results);
      setConsultant(schoolDataResponse.data.consultants.results);
    } catch (error) {
      console.error('Error getting data for the selected city:', error);
      // Handle errors as needed
    }
    finally {
      setTimeout(() => {
        setLoading(false);
      }, 5000); // Set loading to false when data is fetched
    }
  };
  const fetchOrphan = async () => {
    setLoading(true)
    try {
      fetch("https://153a5f6sbb.execute-api.eu-west-2.amazonaws.com/test/getFundRaiseForms")
      .then(response => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json(); // Assuming the response is in JSON format
      })
      .then(data => {
        data=data.data;
        // Update the state with the fetched data
        setOrphan(data)
        // setUserData(data.find((product) => product.name === username));
      })
    }
    catch (error) {
      console.error('Error getting data for the selected city:', error);
      // Handle errors as needed
    }

};
 
    useEffect(() => {
      setLoading(true);
      const storedData = localStorage.getItem("category");
      if (storedData) {
        setStoreData(storedData);
      }
      if (storeData === "College") {
        const product = colleges.find((product) => product.name === username);
        setUserData(product);
      } else if (storeData === "School") {
        const product = school.find((product) => product.name === username);
        setUserData(product);
      } else if (storeData === "University") {
        const product = universities.find((product) => product.name === username);
        setUserData(product);
      }

      else if (storeData === "Tuition") {
        const product = Tuitions.find((product) => product.name === username);
        setUserData(product);
      }
      else if (storeData === "Tutor") {
        const product = Tutors.find((product) => product.name === username);
        setUserData(product);
      }
      else if (storeData === "Events") {
        const product = Events.find((product) => product.name === username);
        setUserData(product);
      }
      else if (storeData === "Uniform") {
        const product = Uniform.find((product) => product.name === username);
        setUserData(product);
      }
      else if (storeData === "Book") {
        const product = Book.find((product) => product.name === username);
        setUserData(product);
      }
      else if (storeData === "UsedBook") {
        const product = UsedBook.find((product) => product.name === username);
        setUserData(product);
      }
      else if (storeData === "Consultant") {
        const product = consultant.find((product) => product.name === username);
        setUserData(product);
      }
      else if (storeData === "Orphan") {
        const product = orphan.find((product) => product.orphan_name === username);
        setUserData(product);
      }
      else if (storeData === "Blood") {
        const product = Orphans.find((product) => product.name === username);
        setUserData(product);
      }
      else if (storeData === "Students") {
        const product = Orphans.find((product) => product.name === username);
        setUserData(product);
      }
      else if (storeData === "Homeless") {
        const product = Orphans.find((product) => product.name === username);
        setUserData(product);
      }
  
      
  
      window.scrollTo(0, 0);
      // fetchData();
      setLoading(false);
    }, [storeData, username ,getUserCity ]); 
    useEffect(() => {
      getUserCity();
    }, []);
    useEffect(() => {
      fetchOrphan();
    }, []);
  
    useEffect(() => {
     setLoading(true)
      if (userLocation) {
        fetchDataForCity(userLocation);      
      }
    }, [userLocation]);
    
  const handleBtnClick = () => {
    setOpenMenu(!openMenu);
    setOpenMenu1(false);
    setOpenMenu2(false);
    setOpenMenu3(false);
    document.getElementById("Mainbtn").classList.add("active");
    document.getElementById("Mainbtn1").classList.remove("active");
    document.getElementById("Mainbtn2").classList.remove("active");
    document.getElementById("Mainbtn3").classList.remove("active");
  };
  const handleBtnClick1 = () => {
    setOpenMenu1(!openMenu1);
    setOpenMenu2(false);
    setOpenMenu(false);
    setOpenMenu3(false);
    document.getElementById("Mainbtn1").classList.add("active");
    document.getElementById("Mainbtn").classList.remove("active");
    document.getElementById("Mainbtn2").classList.remove("active");
    document.getElementById("Mainbtn3").classList.remove("active");
  };
  const handleBtnClick2 = () => {
    setOpenMenu2(!openMenu2);
    setOpenMenu(false);
    setOpenMenu1(false);
    setOpenMenu3(false);
    document.getElementById("Mainbtn2").classList.add("active");
    document.getElementById("Mainbtn").classList.remove("active");
    document.getElementById("Mainbtn1").classList.remove("active");
    document.getElementById("Mainbtn3").classList.remove("active");
  };
  const handleBtnClick3 = () => {
    setOpenMenu3(!openMenu3);
    setOpenMenu(false);
    setOpenMenu2(false);
    setOpenMenu1(false);
    document.getElementById("Mainbtn3").classList.add("active");
    document.getElementById("Mainbtn").classList.remove("active");
    document.getElementById("Mainbtn1").classList.remove("active");
    document.getElementById("Mainbtn2").classList.remove("active");
  };
  const linkToShare = 'https://your-shareable-link.com';

return (
 <>
     {loading ? <Loader /> : 
<div className="containerchat">
<GlobalStyles/>
    <div className="margin-left-sidebar p-0 responsive-flex">
    
    <div className="chat">
      <div className="height-contain">
      <div className="chat-messages responsive-space d-flex justify-content-center flex-column">
      <section className="no-bottom">
    <div className="container mt-3">
      <div className="row mt-5">
        <div className="col-md-2">
        <div className="profile_avatar ui-icon icon profile-height">
                   
        {userData && userData.icon ? (
    <img src={userData.icon} alt="" />
  ) : (
    <img src="/img/favi.jpg" alt="" />
  )}
                   {/* <i className="fa fa-check"></i> */}
                   
               </div>
        </div>
        <div className="col-md-10 d-flex align-items-center">
        <div className="profile_name">
                          <h4>
                            {userData?.orphan_name ?userData?.orphan_name:userData?.name }      
                                                          
                              <span className="profile_username">{userData?.email? userData?.email : ""} &nbsp; <ShareButton link={linkToShare} /></span>
                              {/* <span className="profile_username text-muted">{userData?.email? userData?.email : ""} &nbsp; <ShareButton link={linkToShare} /></span> */}
                              {storeData === 'Orphan' ? <></> : 
                              <div className="community-icons">
    <i className="f-size fa fa-fw fa-facebook" aria-hidden="true" title="Copy to use facebook-square"></i>
<i className="f-size fa fa-fw fa-linkedin" aria-hidden="true" title="Copy to use linkedin-square"></i>
<i className="f-size fa fa-fw fa-whatsapp" aria-hidden="true" title="WhatsApp"></i>
<i className="f-size fa fa-fw fa-twitter" aria-hidden="true" title="Copy to use twitter-square"></i>
    </div> 
    }
                </h4> 
               </div>
        </div>
      </div>
    </div>
  </section>
     
  <section className='container no-top no-bottom'>
        <div className='row'>
          <div className='col-lg-12'>
              <div className="items_filter">
                <ul className="de_nav text-left">
                {/* <li id='Mainbtn' className=""><span>Digital Products</span></li>
                    <li id='Mainbtn1' className=""><span>Profile</span></li>
                    <li id='Mainbtn2' className=""><span>Services Packages</span></li> */}
                    <li id='Mainbtn' className="mt-3 active"><span onClick={handleBtnClick}>Details</span></li>
                    
                    <li id='Mainbtn2' className={`mt-3 ${storeData === 'Orphan' || storeData === 'Book' ? 'display-none' : ''} `}><span onClick={handleBtnClick2}>Fee Structure</span></li>
                    <li id='Mainbtn3' className={`mt-3 ${storeData !== 'School' ? 'display-none' : ''}`}>
      {storeData === 'School' && <span onClick={handleBtnClick3}>Grades</span>}
    </li>
                    <li id='Mainbtn1' className={`mt-3 ${storeData === 'Orphan' ? 'display-none' : ''} `}><span onClick={handleBtnClick1}>Videos</span></li> 
                </ul>
            </div>
          </div>
        </div>
      {openMenu &&  (  
        <>
        <div id='zero1' className='onStep fadeIn mob-margin'>
         {userLocation ?
         <>
         {userData?.city ?
         <>
         <h6>
          City: 
         </h6>
         <p>
          {userData?.city ? userData?.city : ""}
         </p>
        </>
         :
         <></>
         }
         {userData?.phone_number ?
          <>
          <h6> Phone Number: </h6>
          <p>{userData?.phone_number }</p>
          </>
          :
          <></>}
          {userData?.vicinity ?
          <>
          <h6> Address: </h6>
          <p>{userData?.vicinity}</p>
          </>
          :
          <></>}
           {userData?.amount_to_raise ?
          <>
          <h6> Amount to raise: </h6>
          <p>{userData?.amount_to_raise}</p>
          </>
          :
          <></>}
          {userData?.description ?
          <>
          <h6> Description: </h6>
          <p>{userData?.description}</p>
          </>
          :
          <></>}
          
          {userData?.rating ?
          <>
          <h6>
          Ratings
        </h6>
        <p>
          {userData?.rating}
        </p>
        </> 
        :
        <></> }
        {userData?.opening_hours ? (
          <>
            <h6 style={{ color: userData?.opening_hours.open_now ? 'green' : 'red' }}>
              {userData?.opening_hours.open_now ? "Open Now" : "Closed"}
            </h6>
            
          </>
        ) : (
          <></>
        )}
          </>
          :
          <h6>
            Details are not available right now
          </h6>
         }
        </div>
        </>
      )}
        {openMenu1 &&  (  
        <>
        <div id='zero1' className='onStep fadeIn'>
        <h6>
          Videos will be coming soon
        </h6>
        </div>
        </>
      )}
        {openMenu3 &&  (  
        <>
        <div id='zero1' className='onStep fadeIn'>
          We are providing schooling system to grades:
      
       <table className="mt-3 mx-auto">
       <tbody>
           <tr>
             <td className="p-2 border width-dynamic">grade 1</td>
             <td className="p-2 border width-dynamic">grade 2</td>
           </tr>
           <tr>
             <td className="p-2 border width-dynamic">grade 3</td>
             <td className="p-2 border width-dynamic">grade 4</td>
           </tr>
           <tr>
             <td className="p-2 border width-dynamic">grade 5</td>
             <td className="p-2 border width-dynamic">grade 6</td>
           </tr>
           <tr>
             <td className="p-2 border width-dynamic">grade 7</td>
             {/* <td className="p-2 border width-dynamic">grade 2</td> */}
           </tr>
       </tbody>
     </table>
        
 
        </div>
        </>
      )}
  
      {openMenu2 && ( 
        <>
        {
          userData?.feeStructure ?
          <table className="mt-3 mx-auto">
       
          <tbody>
            {userData?.feeStructure.map((item, index) => (
              <tr key={index}>
                <td className="p-2 border width-dynamic">{item.name}</td>
                <td className="p-2 border price-width">{item.price}</td>
                
              </tr>
              
            ))}
          </tbody>
        </table>
        :
        userData?.packages ? (
<Packages/> 
        )
        : userData?.amount_to_raise ? (
          // Render userData?.amount_to_raise if it exists
          <h5>Monthly basis : {userData?.amount_to_raise}</h5>
        ) : (
          <h6>Fee Structure is not available right now</h6>
        )}
   </>
      )}
      </section>
      
              </div>
      </div>
      <Footer/>
    </div>
    </div>
  {/* <Footer /> */}
</div>
}
</>
);
}
export default Details;