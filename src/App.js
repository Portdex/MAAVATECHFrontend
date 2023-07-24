import React from 'react';
import './App.css';
import Sidebar from './ChatGpt';
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Home from './components/pages/home';
import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  :root {
    scroll-behavior: auto;
  }
`;
const App=()=> (
 
    <div className="App">
      <GlobalStyles />
      <Routes >
      <Route path="/" element={<Home />} />
      </Routes>
     </div>
  );


export default App;
