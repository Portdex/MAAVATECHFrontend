import React, { memo,useState,  useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { createGlobalStyle } from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import Packages from "../components/Packages";
import Sidebars from "../menu/sidebar";
import '../../assets/chat.css';
import ShareButton from "../components/ShareButton";
import { 
  Schools,
  Colleges,
  Universities,
  Tuitions,
  Tutors,
  Events,
  Book,
  UsedBook,
  Uniform,
  Consultants,
  Orphans, } from '../data/data';
import Footer from "../menu/footer";
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
  console.log("url" , username)
  const [inputValue, setInputValue] = useState('');
  const [userData, setUserData] = useState([])
  const [storeData, setstoreData] = useState([])
  console.log('category',storeData)
  const [serviceData, setServiceData] = useState([])
  
  console.log("userData",userData)
  const [loading , setLoading]= useState(false)
const [openMenu, setOpenMenu] = React.useState(false);
const [openMenu1, setOpenMenu1] = React.useState(false);
const [openMenu2, setOpenMenu2] = React.useState(true);
const [openMenu3, setOpenMenu3] = React.useState(true);
 const navigate = useNavigate();
    
    useEffect(() => {
      // Retrieve data from local storage
      const storedData = localStorage.getItem("category");
  
      // Check if data exists in local storage
      if (storedData) {
        // If data exists, update the state with the retrieved data
        setstoreData(storedData);
        console.log(storeData);
      }
  
      setLoading(true);
      if (storeData === "College") {
        const product = Colleges.find((product) => product.name === username);
        setUserData(product);
      } else if (storeData === "School") {
        const product = Schools.find((product) => product.name === username);
        setUserData(product);
      } else if (storeData === "University") {
        const product = Universities.find((product) => product.name === username);
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
        const product = Consultants.find((product) => product.name === username);
        setUserData(product);
      }
      else if (storeData === "Orphan") {
        const product = Orphans.find((product) => product.name === username);
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
  
      setLoading(false);
  
      window.scrollTo(0, 0);
    }, [storeData, username]); 
   
  
    
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
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };
  const linkToShare = 'https://your-shareable-link.com';

return (
 <>
<Sidebars/>
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
                   
                   <img src={userData.image || '/img/favi.jpg'} alt=""/>
                
                   <i className="fa fa-check"></i>
                   
               </div>
        </div>
        <div className="col-md-10 d-flex align-items-center">
        <div className="profile_name">
                          <h4>
                            {userData.name}      
                                                          
                              <span className="profile_username">{userData.label}</span>
                              <span className="profile_username text-muted">{userData.name} &nbsp; <ShareButton link={linkToShare} /></span>
                            
                             
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
                    <li id='Mainbtn' className="mt-3 "><span onClick={handleBtnClick}>Details</span></li>
                    
                    <li id='Mainbtn2' className="mt-3 active"><span onClick={handleBtnClick2}>Fee Structure</span></li>
                    <li id='Mainbtn1' className="mt-3 "><span onClick={handleBtnClick1}>Videos</span></li> 
                    <li id='Mainbtn3' className="mt-3 display-none "><span onClick={handleBtnClick3}>Digital Products</span></li> 
                </ul>
            </div>
          </div>
        </div>
      {openMenu &&  (  
        <>
        <div id='zero1' className='onStep fadeIn'>
         {/* <ColumnNewRedux shuffle showLoadMore={false} authorId={author.id}/> */}
        </div>
        </>
      )}
        {openMenu1 &&  (  
        <>
        <div id='zero1' className='onStep fadeIn'>
         {/* <ColumnNewRedux shuffle showLoadMore={false} authorId={author.id}/> */}
        </div>
        </>
      )}
        {openMenu3 &&  (  
        <>
        <div id='zero1' className='onStep fadeIn'>
         {/* <ColumnNewRedux shuffle showLoadMore={false} authorId={author.id}/> */}
        </div>
        </>
      )}
  
      {openMenu2 && ( 
<Packages/>   
      )}
      </section>
      
              </div>
      </div>
      <Footer/>
    </div>
    </div>
  {/* <Footer /> */}
</div>
</>
);
}
export default Details;