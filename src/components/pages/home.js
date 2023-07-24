import React , {useState, useEffect} from 'react';
import { keyframes } from "@emotion/react";
import '../../assets/chat.css'
import { useNavigate, } from "react-router-dom";
import styled, { createGlobalStyle } from 'styled-components';
import Sidebars from '../menu/sidebar';

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
  const [selectedTimeline, setselectedTimeline] = useState('School Timeline');
const [showAll, setShowAll] = useState(false);
const [showAllProduct, setShowAllProduct] = useState(false);
  const [visibleItems, setVisibleItems] = useState(5);
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };
  const [showNotification, setShowNotification] = useState(true);

  useEffect(() => {
    // Set a timer to hide the notification after 50-60 seconds
    const notificationTimer = setTimeout(() => {
      setShowNotification(false);
    }, 50000);

    // Clear the timer when the component unmounts to avoid memory leaks
    return () => clearTimeout(notificationTimer);
  }, []);

  // Function to close the notification manually if needed
  const handleCloseNotification = () => {
    setShowNotification(false);
  };

  const items = [
    'School Admissions',
    'College Admissions',
    'University Admissions',
    'College Events',
    'Tuitions',
    'Freelance Tutors',
    'Uniform shops',
    'Book Sellers',
    'Used book sellers',
  ];
   // Add your items here

  const LocalSchools = [
    {
      name: 'Local Schools',
      image: '/img/localschool.jpg'
    },
    {
      name: 'Local Colleges',
      image: '/img/localcollege.jpg'
    },
    {
      name: 'Education Events',
      image: '/img/events.jpg'
    },
    {
      name: 'Used Books',
      image: '/img/books.jpg'
    },
    {
        name: 'Used Uniforms',
        image: '/img/uniform.jpg'
      },
    // {
    //   name: 'Handmade Product',
    //   image: './img/handmade_product_image.jpg'
    // },
    // {
    //   name: 'Toys Product',
    //   image: './img/toys_product_image.jpg'
    // },
    // {
    //   name: 'Digital Product',
    //   image: './img/digital_product_image.jpg'
    // },
    // {
    //   name: 'Physical Product',
    //   image: './img/physical_product_image.jpg'
    // },
    // {
    //   name: 'Toys Product',
    //   image: './img/toys_product_image.jpg'
    // },
    // {
    //   name: 'Pet Product',
    //   image: './img/pet_product_image.jpg'
    // }
  ];
  
  const LocalCharity = [
    {
      name: 'Support an Orphan',
      image: './img/orphan.jpg'
    },
    {
      name: 'Homeless Child Food',
      image: './img/food.jpg'
    },
    {
      name: 'Blood Donations',
      image: './img/blood.jpg'
    },
    {
      name: 'Needy Students',
      image: './img/needy.jpg'
    },
    
  ];
  const handleDigitalProduct =() =>{
localStorage.setItem("value" , "digital")
navigate('/category')
  }
  const handlePhysicalProduct =() =>{
    localStorage.setItem("value" , "physical")
    navigate('/category')
      }
  const handleMarketplace =() =>{
    localStorage.setItem("value" , "marketplace")
    navigate('/category')
          }
  const handleFreelancers =() =>{
    localStorage.setItem("value" , "freelancer")
    navigate('/category')
              }
  const handleAccountant =() =>{
    localStorage.setItem("value" , "accountant")
    navigate('/category')
                  }
 const handleLawyer =() =>{
    localStorage.setItem("value" , "lawyer")
    navigate('/category') 
   }
  const itemHandlers = {
    Freelancers: handleFreelancers,
    Accountant: handleAccountant,
    Lawyer: handleLawyer,
    // Add more item handlers if needed
  };

  const handleItemClick = (item) => {
    const handler = itemHandlers[item];
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

<Sidebars/>
<div className="containerchat">
        <GlobalStyles/>
     
    <div className=" p-0  margin-left-sidebar responsive-flex">
    
      <div className="chat">
        <div className="height-contain">
         
      <h5 className='text-center mt-3 pt-3 pb-3 color-purple'>
      {/* Portdex.ai will Port & connect you for free.  <br/> */}
      Search & Connect in real Time. 
        </h5>
        <div className="chat-messages justify-content-center">
          <div className="services-list mb-4 ">
          <div className="row">
              <div className="services-tabs">
                <ul>
                  <li>
                    <a className={`p-0 ${selectedTimeline === 'School Timeline' ? 'activeServices' : ''}`} onClick={() => setselectedTimeline('School Timeline')}>
                    School Timeline
                    </a>
                  </li>
                  <li>
                    <a className={`p-0 ${selectedTimeline === 'Charity Timeline' ? 'activeServices' : ''}`} onClick={() => setselectedTimeline('Charity Timeline')}>
                   Charity Timeline
                    </a>
                  </li>
                  <li>
                    <a className={`p-0 ${selectedTimeline === 'Admission' ? 'activeServices' : ''}`} onClick={() => setselectedTimeline('Admission')}>
                  Admission Consultants
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <ul className='desktop-view'>
             {items.map((item, index) => (
          <li key={index} onClick={() => handleItemClick(item)}>
            {item}
          </li>
        ))}
            </ul>
            <ul className='mobile-view'>
        {items.slice(0, showAll ? items.length : visibleItems).map((item, index) => (
          <li key={index} onClick={() => handleItemClick(item)}>
            {item}
          </li>
        ))}
      </ul>
      {!showAll && <button className='mobile-view more-btn' onClick={handleSeeMore}>See More <i class="fa fa-angle-down"></i> </button>}
      {showAll && <button className='mobile-view more-btn' onClick={handleClose}>Close <i class="fa fa-angle-up"></i> </button>}
          
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
           <a href='/products' className='seller-img' style={{ backgroundImage: `url(${item.image})` }}>
           </a>
           <a href='/products'>
            {item.name}
           </a>
          </li>
        ))}
            </>
            )}
             {selectedOption === 'Local Charity' && (
          <>
          {LocalCharity.map((item, index) => (
       <li className='col-md-3' key={index} onClick={() => handleItemClick(item.name)}>
          <a className='seller-img' style={{ backgroundImage: `url(${item.image})` }}>
           </a>
           <a>
            {item.name}
           </a>
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
            <a href='/products' className='seller-img' style={{ backgroundImage: `url(${item.image})` }}>
           </a>
           <a href='/products'>
            {item.name}
           </a>
          </li>
        ))}
            </>
            )}
             {selectedOption === 'Local Charity' && (
          <>
        {LocalCharity.slice(0, showAllProduct ? LocalCharity.length : visibleItems).map((item, index) => (
          <li className='col-6' key={index} onClick={() => handleItemClick(item.name)}>
             <a className='seller-img' style={{ backgroundImage: `url(${item.image})` }}>
           </a>
           <a>
            {item.name}
           </a>
          </li>
        ))}
         </>
        )}   
            </ul>
          
           <button className='border-none'> </button>
      {/* {showAllProduct && <button className='pt-4 mobile-view more-btn' onClick={handleCloseProduct}>Close <i class="fa fa-angle-up"></i> </button>} */}
          
            {/* {!showAllProduct && <button className='pt-4 mobile-view more-btn' onClick={handleSeeMoreProduct}>See More <i class="fa fa-angle-down"></i> </button>}
      {showAllProduct && <button className='pt-4 mobile-view more-btn' onClick={handleCloseProduct}>Close <i class="fa fa-angle-up"></i> </button>}
           */}
            </div>
           
             {/* <div className="col-lg-4 col-md-4 col-12 text-center">
              <h6>
             Service  provider
              </h6>
              
              <div className="row d-flex">
                <div className="col-lg-12 col-6">
                <div className="gray-boxes " onClick={handleFreelancers}>
                <p>
                Freelancers
                </p>
              </div>
                </div>
                <div className="col-lg-12 col-6">
                <div className="gray-boxes" onClick={handleAccountant}>
                <p>
                  Accountant
                </p>
              </div>
                </div>
             

              <div className="col-lg-12 col-6">
              <div className="gray-boxes" onClick={handleLawyer}>
                <p>
                  Lawyers
                </p>
              </div>
              </div>

              </div>

            </div> */}
            
        </div>
        
        </div>
        <div className="chat-fixed">
        <form className="chat-form">
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Type your message..."
          />
          <button type="submit">Send</button>
          <br/>
          <div>
          
          </div>
          
        </form>
        <p>
            Get More Information about  <a href="/blockchain"> Maava Tech </a>
          </p>
          </div>
      </div>
      </div>

     
         
    </div>
    </>
);
  };
export default Home;