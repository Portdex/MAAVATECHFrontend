import React, { useState ,useEffect} from 'react'
import axios from 'axios'
import md5 from 'md5'
import { useDispatch } from 'react-redux'
import { Auth } from 'aws-amplify'
import {  useNavigate } from 'react-router-dom'
import LookingForComponent from '../component/Lookingfor'
import { lookingfor } from '../actions/lookingfor'
import { useToasts } from 'react-toast-notifications';
import {Country, State, City} from 'country-state-city';
const LookingFor = () => {
  const dispatch = useDispatch()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [country, setCountry] = useState('')
  const [city, setCity] = useState('')
  const [countryCode, setCountryCode] = useState('')
  const [lookingFor, setLookingFor] = useState('')
  const [description, setDescription] = useState('')
  const [grade, setGrade] = useState('')
  const [currentEmail, setCurrentEmail] = useState('')
  const [phone, setPhone] = useState('')
  const { addToast } = useToasts()
  const navigate=useNavigate()
//   const [birthDate, setBirthDate] = useState(new Date())
  const userData = {    
    name:name,
    email: currentEmail ? currentEmail : email,
    country:country,
    city:city,
    looking_for:lookingFor,
    description:description,
    grade:grade,
    phone_number:phone,
  }
  console.log("userData" , userData)
  const countries = Country.getAllCountries();
  const getCitiesForSelectedCountry = (countryCode) => {
    const cities = City.getCitiesOfCountry(countryCode);
    console.log(cities)
    return cities;
  };
  const handleCountryChange = (event) => {
    const selectedCountryCode = event.target.value;
    setCountryCode(selectedCountryCode);
    const selectedCountryObject = countries.find((country) => country.isoCode === selectedCountryCode);
    const selectedCountryName = selectedCountryObject ? selectedCountryObject.name : "";
    setCountry(selectedCountryName);
    setCity(null);
    };

  const handleCityChange = (event) => {
    setCity(event.target.value);
  };
  const handleData = async () => {
            try {
      let session = await Auth.currentSession();   
    if(session){ 
      dispatch(lookingfor(userData));      
      const response = axios({
        method: 'post',
        url: 'https://153a5f6sbb.execute-api.eu-west-2.amazonaws.com/test/createPost',
        data: userData,
        crossDomain: true,
      });
      console.log('response' , response)
      addToast('Your form is submitted succesfully', {
        appearance: 'success',
        autoDismiss: true,
      })
      navigate('/profile')
    }
    else {
      navigate('/login')
      localStorage.setItem("formhistory" , "posts")
        }
  }
      catch (error) {
      console.log('errors', error)
      navigate('/login')
      localStorage.setItem("formhistory" , "posts")
    }  
  }


  return (
    <LookingForComponent 
      name={name}
      setName={setName}
      email={email}
      setEmail={setEmail}
      country={country}
      setCountry={setCountry}
      city={city}
      setCity={setCity}
      countryCode={countryCode}
      setCountryCode={setCountryCode}
      currentEmail={currentEmail}
      setCurrentEmail={setCurrentEmail}
      description={description}
      setDescription={setDescription}
      lookingFor={lookingFor}
      setLookingFor={setLookingFor}
      phone={phone}
      setPhone={setPhone}
      grade={grade}
      setGrade={setGrade}
      handleData={handleData}
      handleCityChange={handleCityChange}
      handleCountryChange={handleCountryChange}
      countries={countries}
      getCitiesForSelectedCountry={getCitiesForSelectedCountry}
    />
  )
}

export default LookingFor