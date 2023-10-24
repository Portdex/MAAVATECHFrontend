import React, { useState ,useEffect} from 'react'
import axios from 'axios'
import md5 from 'md5'
import { useDispatch } from 'react-redux'
import { Auth, Storage } from 'aws-amplify'
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
  const [photopath, setPhotopath] = useState('')
  const [userAuth, setUserAuth] = useState('')
  const [file, setFile] = useState('');
  const { addToast } = useToasts()
  const navigate=useNavigate()
//   const [birthDate, setBirthDate] = useState(new Date())
  // const userData = {    
  //   name:name,
  //   email: currentEmail ? currentEmail : email,
  //   city:city,
  //   orphan_name:orphanName,
  //   description:description,
  //   amount_to_raise:amount,
  //   phone_number:phone,
  // }
  const handleFileUpload = (e) => {    
    //setFile (e.target.files[0]);
    console.log(e)
  }
  const handleData = async (event) => {
    event.preventDefault();
    try {    
      let session = await Auth.currentSession(); 
      // let username=await session.getIdToken().payload.sub;
      // let path=username + "/" + "post.jpg"
      // const result = await Storage.put(path, file, {
      //   contentType: file.type,
      // });
      const userData = {    
        name:name,
        email: currentEmail ? currentEmail : email,
        city:city,
        orphan_name:orphanName,
        description:description,
        amount_to_raise:amount,
        phone_number:phone,
        // photo_path:path
      }
      console.log(userData)
    if(session){ 
      dispatch(fund(userData));      
      const response = axios({
        method: 'post',
        url: 'https://153a5f6sbb.execute-api.eu-west-2.amazonaws.com/test/createFundRaiseEntry',
        data: userData,
        crossDomain: true,
      });
      // setFile(path)
      console.log("response " , response)
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
      file={file}
      setFile={setFile}
      orphanName={orphanName}
      setOrphanName={setOrphanName}
      handleData={handleData}
      handleFileUpload={handleFileUpload}
  
    />
  )
}

export default RaiseFunds