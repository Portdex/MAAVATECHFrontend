import React, { useState } from 'react';
import './App.css';

const Sidebar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <>
    <div className="sidebar">
        {/* Sidebar content */}
        Sidebar (Width: 260px)
      </div>
      <div className="mob-sidebar">
        {/* Sidebar content */}
        Sidebar (Width: 260px)
        
      </div>
    </>
    
  )
}
export default Sidebar