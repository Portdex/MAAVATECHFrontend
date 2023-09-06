import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Header() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
const navigate = useNavigate()
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
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

  return (
    <>
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
            <i className="fa fa-fw fa-user" aria-hidden="true" title="User Icon"></i>
            {/* <span>User</span> */}
          </div>
          {/* Add any other elements on the right side */}
        </div>
        </div>
          <div className="top-navbar-menu">
            <div className="menu-item"> <a onClick={() => handleSchoolClick()}> School Admissions  </a> </div>
            <div className="menu-item"> <a onClick={() => handleUniversityClick()}> University Admissions  </a> </div>
            <div className="menu-item"> <a onClick={() => handleBookClick()}> Book Sellers  </a> </div>
            <div className="menu-item"> <a href=''> Tech Training  </a> </div>
            <div className="menu-item"> <a href=''> Orphan Support Program  </a> </div>
          </div>
        </div>
      </div>

      {/* Sidebar */}
      {/* <div className={`sidebar ${sidebarOpen ? 'open' : ''}`}> */}
        {/* Menu List */}
        {/* <div className="menu-list">
          <div className="menu-item">Item 1</div>
          <div className="menu-item">Item 2</div>
          <div className="menu-item">Item 3</div>
          <div className="menu-item">Item 4</div>
          <div className="menu-item">Item 5</div>
          <div className="menu-item">Item 6</div>
          <div className="menu-item">Item 7</div>
          <div className="menu-item">Item 8</div>
        </div>
      </div> */}

      {/* Bottom Navbar */}
      <div className="bottom-navbar">
        <div className="bottom-nav-item">
        <i className="fas fa-home"></i>
          <span>Home</span>
        </div>
        <div className="bottom-nav-item">
        <i className="fas fa-fire"></i>
          <span>School Timeline</span>
        </div>
        <div className="bottom-nav-item">
        <i className="fas fa-bookmark"></i>
          <span>Charity Timeline</span>
        </div>
        <div className="bottom-nav-item">
        <i className="fas fa-search"></i>
          <span>Support Orphan</span>
        </div>
        <div className="bottom-nav-item">
        <i className="fas fa-user"></i>
          <span>Profile</span>
        </div>
      </div>
    </>
  );
}

export default Header;
