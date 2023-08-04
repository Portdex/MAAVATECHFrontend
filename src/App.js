import React from 'react';
import './App.css';
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Home from './components/pages/home';
import { createGlobalStyle } from 'styled-components';
import Category from './components/pages/Category';
import Details from './components/pages/details';
import Forms from './components/pages/Forms';
import RaiseFunds from './components/pages/RaiseFund';
import Homework from './components/pages/Homework';
import ScratchJrComponent from './components/pages/Scratchjr';
import Main from './components/pages/main';

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
      <Route path="/main" element={<Main />} />
      <Route path="/category" element={<Category />} />
      <Route path="/admissionForm" element={<Forms />} />
      <Route path="/RaiseFund" element={<RaiseFunds />} />
      <Route path="/homework" element={<Homework />} />
      <Route path="/scratch" element={<ScratchJrComponent />} />
      <Route element={<Details />} path="/seller/:username" />
      </Routes>
     </div>
  );


export default App;
