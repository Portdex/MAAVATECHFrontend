import React, { useState ,useEffect} from 'react'
import axios from 'axios'
import md5 from 'md5'
import { useDispatch } from 'react-redux'
import { Auth } from 'aws-amplify'
import {  useNavigate , useLocation } from 'react-router-dom'
import RaiseFundsComponent from '../component/RaiseFund'
import { fund } from '../actions/fund'
import { useToasts } from 'react-toast-notifications';

const Category = () => {
  const dispatch = useDispatch()



  return (
    <CategoryComponent 
      name={name}
      setName={setName}
      email={email}
      setEmail={setEmail}
      city={city}
      setCity={setCity}
      currentEmail={currentEmail}
      setCurrentEmail={setCurrentEmail}
      description={description}
      setDescription={setDescription}
      amount={amount}
      setAmount={setAmount}
      phone={phone}
      setPhone={setPhone}
      orphanName={orphanName}
      setOrphanName={setOrphanName}
      handleData={handleData}
      userData={userData}
    />
  )
}

export default Category