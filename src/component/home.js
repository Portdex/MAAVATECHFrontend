import React , {useState, useEffect} from 'react';
import { keyframes } from "@emotion/react";
import '../assets/chat.css'
import { useNavigate, } from "react-router-dom";
import styled, { createGlobalStyle } from 'styled-components';
import Sidebars from '../menu/sidebar';
import { LocalCharity , LocalSchools , fields } from '../data/data';
import Footer from '../menu/footer';
import Header from '../menu/Header';

const fadeInUp = keyframes`
  0% {
    opacity: 0;
    -webkit-transform: translateY(40px);
    transform: translateY(40px);
  }
  100% {
    opacity: 1;
    -webkit-transform: translateY(0);
    transform: translateY(0);
  }
`;
const GlobalStyles = createGlobalStyle`
.navbar {
  display: none;
}
.App
{
    display:block;
    height:auto;
}
::-webkit-scrollbar {
  display:none /* You can adjust the width to your preference */
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


const Home= () => {
  const [inputValue, setInputValue] = useState('');
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState('Local Schools');
const [showAll, setShowAll] = useState(false);
const [showAllProduct, setShowAllProduct] = useState(false);
  const [visibleItems, setVisibleItems] = useState(5);
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };
   const handleCategory = (category) => {
    localStorage.setItem("category", category);
    navigate('/category');
  };
  const itemHandlers = {
    Schools: () => handleCategory("School"),
    Colleges: () => handleCategory("College"),
    University: () => handleCategory("University"),
    Tuition: () => handleCategory("Tuition"),
    Tutor: () => handleCategory("Tutor"),
    Book: () => handleCategory("Book"),
    UsedBook: () => handleCategory("UsedBook"),
    Events: () => handleCategory("Events"),
    Consultant: () => handleCategory("Consultant"),
    Uniform: () => handleCategory("Uniform"),
    Orphan: () => handleCategory("Orphan"),
    Homeless: () => handleCategory("Homeless"),
    Blood: () => handleCategory("Blood"),
    Students: () => handleCategory("Students"),
    
    // Add more item handlers if needed
  };

  const handleItemClick = (item) => {
    const handler = itemHandlers[item.label];
    if (handler) {
      handler();
    }
  };      
  const handleSeeMore = () => {
    setShowAll(true);
  };

  const handleClose = () => {
    setVisibleItems(5);
    setShowAll(false);
  };
  const handleSeeMoreProduct = () => {
    setShowAllProduct(true);
  };

  const handleCloseProduct = () => {
    setVisibleItems(5);
    setShowAllProduct(false);
  };
  return(
    <>

<div className="containerchat">
        <GlobalStyles/>
     
    <div className=" p-0  margin-left-sidebar responsive-flex">
    
      <div className="chat">
        <div className="height-contain">
         
      <h5 className='text-center mt-3 pt-3 pb-3 color-red margin-top-responsive'>
      
      Maavatech is All in One Solution for Education Sector- 
        </h5> 
        <div className="chat-messages justify-content-center">
          <div className="services-list mb-4 ">
          
            <ul className='desktop-view'>
             {fields.map((item, index) => (
          <li key={index} onClick={() => handleItemClick(item)}>
            {item.title}
          </li>
        ))}
            </ul>
            <ul className='mobile-view'>
        {fields.slice(0, showAll ? fields.length : visibleItems).map((item, index) => (
          <li key={index} onClick={() => handleItemClick(item)}>
            {item.title}
          </li>
        ))}
      </ul>
      {!showAll && <button className='mobile-view more-btn' onClick={handleSeeMore}>See More <i className="fa fa-angle-down"></i> </button>}
      {showAll && <button className='mobile-view more-btn' onClick={handleClose}>Close <i className="fa fa-angle-up"></i> </button>}
          
          </div> 
          <div className="row">
              <div className="services-tabs">
                <ul>
                  <li>
                    <a className={`${selectedOption === 'Local Schools' ? 'activeServices' : ''}`} onClick={() => setSelectedOption('Local Schools')}>
                    Local Schools
                    </a>
                  </li>
                  <li>
                    <a className={`${selectedOption === 'Local Charity' ? 'activeServices' : ''}`} onClick={() => setSelectedOption('Local Charity')}>
                    Support Local Charity Cause
                    </a>
                  </li>
                 
                </ul>
              </div>
            </div>
          <div className="services-list-with-img mt-3">
          <ul className='desktop-view row'>
          {selectedOption === 'Local Schools' && (
            <>
             {LocalSchools.map((item, index) => (
          <li className='col-md-3' key={index} onClick={() => handleItemClick(item.name)}>
           <a href='' className='seller-img' style={{ backgroundImage: `url(${item.image})` }}>
           </a>
           <a href=''>
            {item.name}
           </a>
          </li>
        ))}
            </>
            )}
             {selectedOption === 'Local Charity' && (
          <>
          {LocalCharity.map((item, index) => (
       <li className='col-md-3 mt-3' key={index}>
          <a className='seller-img' style={{ backgroundImage: `url(${item.image})` }}>
           </a>
           <a>
            {item.name}
           </a>
           <div className='row'>
            <div className='col-6 support-buttons'>
            <a className='cursor-pointer' onClick={() => handleItemClick(item)}>
              Support
             </a>
            </div>
            <div className='col-6 support-buttons'>
            <a href="/RaiseFund">
              Raise Funds
             </a>
            </div>

           </div>
           
       </li>
     ))}
         </>
        )}   
            </ul>
           
              <ul className='mobile-view row'>
          {selectedOption === 'Local Schools' && (
            <>
           {LocalSchools.slice(0, showAllProduct ? LocalSchools.length : visibleItems).map((item, index) => (
          <li className='col-6' key={index} onClick={() => handleItemClick(item.name)}>
            <a href='' className='seller-img' style={{ backgroundImage: `url(${item.image})` }}>
           </a>
           <a href=''>
            {item.name}
           </a>
           
          </li>
        ))}
            </>
            )}
             {selectedOption === 'Local Charity' && (
          <>
        {LocalCharity.slice(0, showAllProduct ? LocalCharity.length : visibleItems).map((item, index) => (
          <li className='col-6 mt-4 responsive-margin' key={index}>
             <a className='seller-img' style={{ backgroundImage: `url(${item.image})` }}>
           </a>
           <a>
            {item.name}
           </a>
           <div className='row'>
            <div className='col-6 support-buttons'>
             <a  className='cursor-pointer' onClick={() => handleItemClick(item)}>
              Support
             </a>
            </div>
            <div className='col-6 support-buttons'>
            <a href="/RaiseFund">
              Raise Fund
             </a>
            </div>

           </div>
          </li>
        ))}
         </>
        )}   
            </ul>
          
           <button className='border-none'> </button>
      {/* {showAllProduct && <button className='pt-4 mobile-view more-btn' onClick={handleCloseProduct}>Close <i className="fa fa-angle-up"></i> </button>} */}
          
            {/* {!showAllProduct && <button className='pt-4 mobile-view more-btn' onClick={handleSeeMoreProduct}>See More <i className="fa fa-angle-down"></i> </button>}
      {showAllProduct && <button className='pt-4 mobile-view more-btn' onClick={handleCloseProduct}>Close <i className="fa fa-angle-up"></i> </button>}
           */}
            </div>
           
          
        </div>
        
        </div>
       
      </div>
      </div>

     
         
    </div>
    </>
);
  };
export default Home;