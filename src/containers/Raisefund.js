import React, { useState ,useEffect} from 'react'
import axios from 'axios'
import md5 from 'md5'
import { useDispatch } from 'react-redux'
import { Auth } from 'aws-amplify'
import {  useNavigate } from 'react-router-dom'
import RaiseFundsComponent from '../component/RaiseFund'
import { fund } from '../actions/fund'
import { useToasts } from 'react-toast-notifications';

const RaiseFunds = () => {
  const dispatch = useDispatch()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [city, setCity] = useState('')
  const [orphanName, setOrphanName] = useState('')
  const [description, setDescription] = useState('')
  const [amount, setAmount] = useState('')
  const [currentEmail, setCurrentEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [userAuth, setUserAuth] = useState('')
  const { addToast } = useToasts()
  const navigate=useNavigate()
//   const [birthDate, setBirthDate] = useState(new Date())
  const userData = {    
    name:name,
    email: currentEmail ? currentEmail : email,
    city:city,
    orphan_Name:orphanName,
    description:description,
    amount_to_raise:amount,
    phone_number:phone,
  }
  console.log("userData" , userData)
  const handleData = async () => {
    try {    
      let session = await Auth.currentSession();   
    if(session){ 
      dispatch(fund(userData));      
      const response = axios({
        method: 'post',
        url: 'https://153a5f6sbb.execute-api.eu-west-2.amazonaws.com/test/createFundRaiseEntry',
        data: userData,
        crossDomain: true,
      });
      addToast('Your form is submitted succesfully', {
        appearance: 'success',
        autoDismiss: true,
      })
      localStorage.setItem('category' ,'Orphan')
      navigate('/category')
    }
    else {
      navigate('/login')
      localStorage.setItem("formhistory" , "raisefund")
        }
  }
      catch (error) {
      console.log('errors', error)
      navigate('/login')
      localStorage.setItem("formhistory" , "raisefund")
    }
  
  
  }


  return (
    <RaiseFundsComponent 
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

export default RaiseFunds