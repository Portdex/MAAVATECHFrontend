import React from 'react';
import './App.css';
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Home from './component/home';
import { createGlobalStyle } from 'styled-components';
import Category from './component/Category';
import Details from './component/details';
import Forms from './component/Forms';
import RaiseFunds from './component/RaiseFund';
import Homework from './component/Homework';
import Main from './component/main';
import CheckLocation from './containers/CheckLocation';
import Login from './pages/auth/Login';
import CheckLocation2 from './containers/CheckLocation2';
import Confirmation from './pages/auth/Confirmation';
import Profile from './component/Profile';
import { Amplify, Storage } from 'aws-amplify'
import Signup from './pages/auth/Register';
import awsmobile from './constants/aws-exports';
import SchoolTimeline from './component/SchoolTimeline';
import FirstView from './pages/FirstView';
import Header from './menu/Header';
import StepByStepForm from './component/SchoolForm';
import { Fragment } from 'react';

const GlobalStyles = createGlobalStyle`
  :root {
    scroll-behavior: auto;
  }
`;
Amplify.configure({...awsmobile,authenticationFlowType: 'CUSTOM_AUTH'})
Storage.configure({ level: 'private' });
const App=()=> (
 
    <div className="App">
      <Fragment>
      <Header/>
      <GlobalStyles />
      <Routes >
      <Route path="/" element={<FirstView />} />
      <Route path="/main" element={<Main />} />
      <Route path="/category" element={<Category />} />
      <Route path="/admissionForm" element={<Forms />} />
      <Route path="/RaiseFund" element={<RaiseFunds />} />
      <Route path="/Login" element={<Login/>} />
      <Route path="/signup" element={<Signup/>} />
      <Route path="/Confirmation" element={<Confirmation/>} />
      <Route path="/homework" element={<Homework />} />
      <Route path="/home" element={<Home />} />
      {/* <Route path='/register' element={<React.Fragment><Register /></React.Fragment>} /> */}
      {/* <Route path="/checkform" element={<StepByStepForm />} /> */}
      <Route path="/check" element={<CheckLocation />} />
      <Route path="/check2" element={<CheckLocation2 />} />
      <Route path="/timeline" element={<SchoolTimeline />} />
      <Route element={<Details />} path="/seller/:username" />
      <Route element={<Profile />} path="/profile" />

      </Routes>
      </Fragment>
     </div>
  );


export default App;
