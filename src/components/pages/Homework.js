import React , {useState, useEffect} from 'react';
import { keyframes } from "@emotion/react";
import '../../assets/chat.css'
import { useNavigate, } from "react-router-dom";
import styled, { createGlobalStyle } from 'styled-components';
import Sidebars from '../menu/sidebar';
import { homeworkData } from '../data/data';
import Footer from '../menu/footer';
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


const Homework= () => {
  const navigate = useNavigate();

  
  return(
    <>

<Sidebars/>
<div className="containerchat">
        <GlobalStyles/>
     
    <div className=" p-0  margin-left-sidebar responsive-flex">
    
      <div className="chat">
        <div className="height-contain">
         
    <h5 className='text-center mt-3 pt-3 pb-3 color-red margin-top-responsive'>
            Homework
    </h5> 
    <div className="chat-messages justify-content-center">
        <div className="homework-box d-flex justify-content-center">
            <ul className="subjects">
                {homeworkData.map((item,index)=>(
                    <li>
                        <img src={item.image} alt="" />
                        <p>
                        {item.name}
                        </p>
                        
                    </li>
                ))}
               
               
            </ul>
        </div>
          
    </div>
        
        </div>
        <Footer/>
      </div>
      </div>

     
         
    </div>
    </>
);
  };
export default Homework;