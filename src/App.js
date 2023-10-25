import React from 'react';
import './App.css';
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Home from './component/home';
import { createGlobalStyle } from 'styled-components';
import Category from './component/Category';
import Details from './component/details';
import Forms from './component/Forms';
import RaiseFunds from './pages/fund';
import Homework from './component/Homework';
import Main from './component/main';
import Login from './pages/auth/Login';
import Confirmation from './pages/auth/Confirmation';
import Profile from './component/Profile';
import { Amplify, Storage } from 'aws-amplify';
import * as AWS from 'aws-sdk';
import Signup from './pages/auth/Register';
import awsmobile from './constants/aws-exports';
import SchoolTimeline from './component/SchoolTimeline';
import FirstView from './pages/FirstView';
import Header from './menu/Header';
import { Fragment } from 'react';
import Schools from './component/getschools';
import { ToastProvider } from 'react-toast-notifications'
import LookingFor from './pages/lookingfor';
import Checkform from './containers/checkform';
import AdmissionForm from './pages/admissionForm';

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
      <ToastProvider>
      <GlobalStyles />
      <Routes >
      <Route path="/" element={<FirstView />} />
      <Route path="/main" element={<Main />} />
      <Route path="/category" element={<Category />} />
      <Route path="/admissionForm" element={<AdmissionForm />} />
      <Route path="/RaiseFund" element={<RaiseFunds />} />
      <Route path="/Login" element={<Login/>} />
      <Route path="/signup" element={<Signup/>} />
      <Route path="/Confirmation" element={<Confirmation/>} />
      <Route path="/homework" element={<Homework />} />
      <Route path="/home" element={<Home />} />
      {/* <Route path='/register' element={<React.Fragment><Register /></React.Fragment>} /> */}
      {/* <Route path="/checkform" element={<StepByStepForm />} /> */}
      <Route path="/timeline" element={<SchoolTimeline />} />
      <Route element={<Details />} path="/seller/:username" />
      <Route element={<Profile />} path="/profile" />
      <Route element={<Checkform />} path="/form" />
      <Route element={<LookingFor />} path="/lookingfor" />
      <Route element={<Schools />} path="/getschools/:username" />
      

      </Routes>
      </ToastProvider>
      </Fragment>
     </div>
  );


export default App;
