import React, { useState ,useEffect} from 'react'
import axios from 'axios'
import md5 from 'md5'
import { useDispatch } from 'react-redux'
import { Auth, Storage } from 'aws-amplify'
import {  useNavigate } from 'react-router-dom'
import AdmissionFormComponent from '../component/admissionForm'
import { admission } from '../actions/admissionForm'
import { useToasts } from 'react-toast-notifications';
const AdmissionForm = () => {
  const dispatch = useDispatch()
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [fatherName, setFatherName] = useState('')
  const [birthPlace, setBirthPlace] = useState('')
  const [DOB, setDOB] = useState('')
  const [address, setAddress] = useState('')
  const [grade, setGrade] = useState('')
  const [file, setFile] = useState('');
  const { addToast } = useToasts()
  const navigate=useNavigate()
  const userData = {    
    first_name:firstName,
    last_name : lastName,
    father_name : fatherName,
    grade : grade,
    address : address,
    dob : DOB , 
    place : birthPlace,

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
    if(session){ 
      dispatch(admission(userData));      
      const response = axios({
        method: 'post',
        url: 'https://153a5f6sbb.execute-api.eu-west-2.amazonaws.com/test/createAdmission',
        data: userData,
        crossDomain: true,
      });
      // setFile(path)
      console.log("response " , response)
      addToast('Your form is submitted succesfully', {
        appearance: 'success',
        autoDismiss: true,
      })
      localStorage.setItem('category' ,'School')
      navigate('/category')
    }
    else {
      navigate('/login')
      // localStorage.setItem("formhistory" , "raisefund")
        }
  }
      catch (error) {
      console.log('errors', error)
      navigate('/login')
      // localStorage.setItem("formhistory" , "raisefund")
    }
  
  
  }


  return (
    <AdmissionFormComponent 
      firstName={firstName}
      setFirstName = {setFirstName}
      lastName = {lastName}
      setLastName = {setLastName}
      fatherName = {fatherName}
      setFatherName = {setFatherName}
      birthPlace = {birthPlace}
      setBirthPlace = {setBirthPlace}
      DOB = {DOB}
      setDOB = {setDOB}
      grade = {grade}
      setGrade = {setGrade}
      address = {address}
      setAddress = {setAddress}
      file = {file}
      setFile = {setFile}
      handleData = {handleData}

  
    />
  )
}

export default AdmissionForm