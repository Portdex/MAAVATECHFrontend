import React, { memo,useState,  useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { createGlobalStyle } from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import '../assets/chat.css'
import { Row , Col , Button , Form,  } from "react-bootstrap";
import PhoneInput from 'react-phone-number-input'
import { Formik } from 'formik'
import CountrySelect from 'react-bootstrap-country-select';
import '../assets/forms.css'
import { Auth } from "aws-amplify";

import {Country, State, City} from 'country-state-city';

const GlobalStyles = createGlobalStyle`
.navbar {
  display: none;
}
header
{
  display:none;
}
.navbarHome
{
  display:none;
}

@media (max-width: 895px) {
  .chat-sidebar {
    display: none;
  }
  .navbarHome {
    display: block;
  }
  .responsive-flex
  {
    width:100%;
  }
}
`;



const Checks = ({ 
}) => {
  const [selectedCity, setSelectedCity] = useState(null);
 
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedCountryCode, setSelectedCountryCode] = useState(null);
console.log(selectedCity , selectedCountry , selectedCountryCode)
  
  const countries = Country.getAllCountries();
  
  // Function to fetch cities based on the selected country
  const getCitiesForSelectedCountry = (countryCode) => {
    const cities = City.getCitiesOfCountry(countryCode);
    console.log(cities)
    return cities;
  };
  
  const handleCountryChange = (event ) => {
    const selectedCountryCode = event.target.value;
  setSelectedCountryCode(selectedCountryCode);
  const selectedCountryObject = countries.find((country) => country.isoCode === selectedCountryCode);
  const selectedCountryName = selectedCountryObject ? selectedCountryObject.name : "";
  setSelectedCountry(selectedCountryName);
  setSelectedCity(null);
  };
  
  const handleCityChange = (event) => {
    setSelectedCity(event.target.value);
  };
return (
 <div className="container">

<div className="containerchat">
<GlobalStyles/>
    <div className="margin-left-sidebar p-0 responsive-flex">
    
    <div className="chat">
      <div className="height-contain">
      <div className="chat-messages responsive-space d-flex justify-content-center flex-column">
        <Formik 
      initialValues={{
      }}
      >
         {({
          handleSubmit,
        }) => (
      <Form noValidate onSubmit={handleSubmit} className="admissionform">
       
                <select onChange={handleCountryChange}>
                  <option value="">-- Select a Country --</option>
                  {countries.map((country) => (
                    <option key={country.id} value={country.isoCode} label={country.name}>
                      {country.name}
                    </option>
                  ))}
                </select>
                <select onChange={handleCityChange}>
                  <option value="">-- Select a City --</option>
                  {getCitiesForSelectedCountry(selectedCountryCode).map((city) => (
                    <option key={city.id} value={city.name}>
                      {city.name}
                    </option>
                  ))}
                </select>
                
    </Form>
     )}
     </Formik>

      
              </div>
      </div>
    </div>
    </div>
  {/* <Footer /> */}
</div>
</div>
);
}
export default Checks;