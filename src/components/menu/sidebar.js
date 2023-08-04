import React, { useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import '../../assets/chat.css'
import { 
  Link, 
  useNavigate, 
  useMatch,
  useResolvedPath
} from "react-router-dom";
const GlobalStyles = createGlobalStyle`
.navbar {
  display: none;
}
.navbarHome
{
  display:none;
  z-index:9999
}
.nav-icon
{
  position: absolute;
    top: 35px;
    right: 25px;
    display: block;
    width: 20px;
    height: 10px;
    padding-top: 13px;
    line-height: 0;
    cursor: pointer;
    background: none;
    border: none;
    padding: 0;
    z-index: 777;
}
.menu-line
{
  position: absolute;
    width: 100%;
    height: 2px;
    top: 0px;
    background-color: #111;
}
.menu-line1
{
  position: absolute;
    width: 100%;
    height: 2px;
    top: 5px;
    background-color: #111;
}
.menu-line2
{
  position: absolute;
    width: 100%;
    height: 2px;
    top: 10px;
    background-color: #111;
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
const Container = styled.div`
  display: flex;
`;

const SidebarContainer = styled.div`
  position: fixed;
  top: 0;
  left: ${({ showmenu }) => (showmenu ? '0' : '-200px')};
  width: 200px;
  height: 100vh;
  background-color: #333;
  color: #fff;
  transition: left 0.3s ease;
  z-index: 9999;
`;
const Header = styled.header`
  background-color: white;
  color: black;
  padding: 10px;
  text-align: center;
  position: fixed;
  width:100%;
  top: 0;
`;

const Navbar = styled.div`
  background-color: #333;
  color: #fff;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: sticky;
  top: 0;
  z-index: 1;

  @media (max-width: 776px) {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;


const SidebarOverlay = styled.div`
  display: block;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 9998;
`;

const Button = styled.button`
  position: absolute;
  top: 10px;
  left: 10px;
  z-index: 10000;
`;

const MainContent = styled.div`
  flex: 1;
`;
const NavLink = (props) => {
  let resolved = useResolvedPath(props.to);
  let match = useMatch({ path: resolved.pathname, end: true });

  return (
    <Link
      {...props}
      className={ match ? 'active' : 'non-active'}
    />
  )
};

const Sidebars = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showmenu, btn_icon] = useState(false);
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <>
     <div className=" sidebarWeb pt-0">
        <div className='p-2 newchat'>
          <a href="/">
            MaavaTech
          {/* <img src="/img/portdex-logo_1.png" alt="" /> */}
          </a>
        </div>

        <div className="bottom-tabs">
          <ul>
          <li className='color-gold'>
              <a href=''>
              maava orphan schools

              </a>
            </li>
            <li className='color-gold'>
              <a href=''>
              technology training
              </a>
            </li>
          <li className='color-gold'>
              <a href='/homework'>
              School Homework
              </a>
            </li>
            <li className='color-gold'>
              <a href='https://ed.maavatech.com/web/login'>
                 School Portal
              </a>
            </li>
            <li className='color-gold'>
              <a href=''>
              School Timeline
              </a>
            </li>
            <li className='color-gold'>
              <a href=''>
             Charity Timeline
              </a>
            </li>
          </ul>
        </div>
        </div>
    <Header className="navbarHome">
      <GlobalStyles/>
   <div className='navbar-title navbar-item'>
                <NavLink to="">
                {/* <img
                    src="/img/code_logo.png"
                    className="img-fluid d-block"
                    alt="#"
                  /> */}
                  MaavaTech
                </NavLink>
              </div>
              {showmenu && 
              <>
              <SidebarContainer open={showmenu}>
             <div className=" p-4 sidebar pt-0">
        <div className='p-2 newchat'>
        <a href="/">
          MaavaTech
          {/* <img src="/img/portdex-logo_1.png" alt="" /> */}
          </a>
        </div>

        <div className="bottom-tabs">
          <ul>
          <li className='color-gold'>
              <a href=''>
              maava orphan schools

              </a>
            </li>
            <li className='color-gold'>
              <a href=''>
              technology training
              </a>
            </li>
          <li className='color-gold'>
              <a href='/homework'>
              School Homework
              </a>
            </li>
            <li className='color-gold'>
              <a href='https://ed.maavatech.com/web/login'>
              School Portal
              </a>
            </li>
            <li className='color-gold'>
              <a href=''>
              School Timeline
              </a>
            </li>
            <li className='color-gold'>
              <a href=''>
             Charity Timeline
              </a>
            </li>
            
          </ul>
        </div>
        </div>
      </SidebarContainer>
      <SidebarOverlay open={showmenu} onClick={() => btn_icon(!showmenu)} />
      </>
              }
              <button className="nav-icon" onClick={() => btn_icon(!showmenu)}>
          <div className="menu-line white"></div>
          <div className="menu-line1 white"></div>
          <div className="menu-line2 white"></div>
        </button>

          
  </Header> 
  </>
    );
};

export default Sidebars;
