import { Auth } from 'aws-amplify';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Loader from '../containers/Loader';

function Header() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(false);
const navigate = useNavigate()
  const handleSchoolClick = () => {
    localStorage.setItem("category", "School");
    navigate('/category');
    window.location.reload();
  };
  const handleUniversityClick = () => {
    localStorage.setItem("category", "University");
    navigate('/category');
    window.location.reload();
  };
  const handleBookClick = () => {
    localStorage.setItem("category", "Book");
    navigate('/category');
    window.location.reload();
  };
  const handleOrphanClick = () => {
    localStorage.setItem("category", "Orphan");
    navigate('/category');
    window.location.reload();
  };
  const handlePostClick = async () => {
    setLoading(true)
    try {
      let session = await Auth.currentSession();   
    if(session){ 
     navigate('/lookingfor')
     setLoading(false)
    }
    else {
      navigate('/login')
      
      localStorage.setItem("formhistory" , "posts")
        }
  }
      catch (error) {
      console.log('errors', error)
      
      navigate('/login')
 
      localStorage.setItem("formhistory" , "posts")
    }
    setLoading(false)
  };

  return (
    <>
    {loading ? <Loader /> : null}
      {/* Top Navbar */}
      <div className="top-navbar">
        <div className="top-navbar-row row">
          <div className='col-6'>
          <div className="left-section">
            {/* <button className="menu-button" onClick={toggleSidebar}>
              ☰
            </button> */}
          <a href='/' className='logo'>
            MaavaTech
          </a>
          </div>
          </div>
          <div className='col-6'>
          <div className="right-section">
        <div className="user-info">
            {/* <img src="./asset/images/author.jpg" alt="User Avatar" /> */}
            <a href='/profile'>
            <i className="fa fa-fw fa-user" aria-hidden="true" title="User Icon"></i>
            </a>
            {/* <span>User</span> */}
          </div>
          {/* Add any other elements on the right side */}
        </div>
        </div>
          <div className="top-navbar-menu">
            <div className="menu-item"> <a href='/'> Home  </a> </div>
            <div className="menu-item"> <a onClick={() => handleSchoolClick()}> School Admissions  </a> </div>
            <div className="menu-item"> <a onClick={() => handleUniversityClick()}> University Admissions  </a> </div>
            <div className="menu-item"> <a onClick={() => handleBookClick()}> Book Sellers  </a> </div>
            <div className="menu-item"> <a > Tech Training  </a> </div>
            <div className="menu-item"> <a> Orphan Support Program  </a> </div>
          </div>
        </div>
      </div>

      {/* Bottom Navbar */}
      <div className="bottom-navbar">
      <a href="/">
        <div className="bottom-nav-item">
          <i className="fas fa-home"></i>
          <span>Home</span> 
        </div>
        </a>
        <a href=''>
        <div className="bottom-nav-item">
        <i className="fas fa-fire"></i>
          <span>School Timeline</span>
        </div>
        </a>
        {/* <a href="">
        <div className="bottom-nav-item">
        <i className="fas fa-bookmark"></i>
          <span>Charity Timeline</span>
        </div>
        </a> */}
        <a onClick={() => handleOrphanClick()} className='cursor-pointer'>
        <div className="bottom-nav-item">
        <i className="fas fa-search"></i>
          <span>Support Orphan</span>
        </div>
        </a>
        <a onClick={() => handlePostClick()} className='cursor-pointer'>
        <div className="bottom-nav-item">
        <i className="fas fa-plus"></i>
          <span>Post</span>
        </div>
        </a>
      </div>
    </>
  );
}

export default Header;
