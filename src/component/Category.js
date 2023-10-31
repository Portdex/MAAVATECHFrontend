import React , {useState , useEffect} from 'react';
import '../assets/chat.css'
import styled , { createGlobalStyle } from 'styled-components';
import { useNavigate,useLocation } from "react-router-dom";
import { 
  Tuitions,
  Tutors,
  Events,
  Book,
  UsedBook,
  Uniform, } from '../data/data';
import Categorycommunity from '../containers/categorycommunity';
import CountrySelect from 'react-bootstrap-country-select';
import { Form , Col } from 'react-bootstrap';
import axios from 'axios';
import Loader from '../containers/Loader';
import {Country, State, City} from 'country-state-city';
const Category= () => {
  const [inputValue, setInputValue] = useState('');
  const [selectedAuthors, setSelectedAuthors] = useState([]);
  const [data, setData] = useState(null);
  const [selectedSchool, setSelectedSchool] = useState('');
  const [school, setSchool] = useState([]);
  const [colleges, setColleges] = useState([]);
  const [university, setUniversity] = useState([]);
  const [consultant, setConsultant] = useState([]);
  const [Orphan, setOrphan] = useState([]);
  const [loading, setLoading] = useState(true);
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [countryCode, setCountryCode] = useState('');
  const [error, setError] = useState(null);
  const location = useLocation();
  const navigate = useNavigate()
  const [selectedCity, setSelectedCity] = useState("");
  const [userLocation, setUserLocation] = useState({});
  console.log('userLocation' , userLocation)
  const [itemSelected, setItemSelected] = useState(false);
  const [disabledLocation, setDisabledLocation] = useState(false);
  useEffect(() => {
    const storedData = localStorage.getItem("category");
    if (storedData) {
      setData(storedData);
    }
  }, []);
  const countries = Country.getAllCountries();
  const getCitiesForSelectedCountry = (countryCode) => {
    const cities = City.getCitiesOfCountry(countryCode);
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
    setUserLocation(event.target.value);
  };
  const getUserCity = async () => {
    try {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;
            // Call the reverse geocoding API to get the city name
            const apiKey = 'AIzaSyBrvLjLK6AcNCACeZZ2Ye-ZtFq2hpz2yT8';
            const response = await fetch(
              `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`
            );
  
            if (response.ok) {
              const data = await response.json();
              const cityData = data.results.find((result) =>
                result.types.includes('locality')
              );
  
              if (cityData) {
                const city = cityData.address_components.find((component) =>
                  component.types.includes('locality')
                ).long_name;
                setUserLocation(city);
              } else {
                setUserLocation({city: 'Unknown' });
              }
            } else {
              console.error('Error getting city data from geocoding API');
              setDisabledLocation(true);
            }
          },
          (error) => {
            console.error('Error getting user location:', error);
            setDisabledLocation(true);
          }
        );
      } else {
        console.error('Geolocation is not supported by this browser.');
        setDisabledLocation(true);
      }
    } catch (error) {
      console.error('Error getting user city:', error);
      setUserLocation({});
      setDisabledLocation(true);
    }
  };
  // Function to fetch data for a given city
  const fetchDataForCity = async (userCity) => {
    setLoading(true)
    console.log("seelctedCity" , userCity)
    try {
      const schoolDataResponse = await axios.get(
        `https://153a5f6sbb.execute-api.eu-west-2.amazonaws.com/test/getSchools/${userLocation}`
      );
      console.log(schoolDataResponse.data)
      // console.log("error" , error)
      setSchool(schoolDataResponse.data.schools.results);
      setColleges(schoolDataResponse.data.colleges.results);
      setUniversity(schoolDataResponse.data.universities.results);
      setConsultant(schoolDataResponse.data.consultants.results);
    } catch (error) {
      console.error('Error getting data for the selected city:', error);
      // Handle errors as needed
    }
    setLoading(false)
  };
  useEffect(() => {
    getUserCity();
  }, []);
  useEffect(() => {
    localStorage.setItem("city" , userLocation )
    if (userLocation) {
      fetchDataForCity(userLocation);  
    }
  }, [userLocation]);
  useEffect(() => {
    // setLoading(true)
   
    fetch("https://153a5f6sbb.execute-api.eu-west-2.amazonaws.com/test/getFundRaiseForms")
      .then(response => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json(); // Assuming the response is in JSON format
      })
      .then(data => {
        data=data.data;
        setOrphan(data);
      })
      .catch(err => {
        setError(err);
      })
  }, []);
  useEffect(() => {
    setInputValue(`I am looking for ${selectedAuthors.join(', ')}`);
  }, [selectedAuthors]);
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };
const handleSellerClick = (username) => {
  navigate(`/details/${username}`);
};
const handleSelectButtonClick = (author) => {
  let updatedSelectedAuthors;
  if (selectedAuthors.includes(author.name)) {
    updatedSelectedAuthors = selectedAuthors.filter((username) => username !== author.name);
  } else {
    updatedSelectedAuthors = [...selectedAuthors, author.name];
  }
  setSelectedAuthors(updatedSelectedAuthors);
  if (updatedSelectedAuthors.length > 0) {
    setItemSelected(true);
  } else {
    setItemSelected(false);
  }
  localStorage.setItem('selectedAuthors', JSON.stringify(updatedSelectedAuthors));
};
// const handleSchoolChange = (event) => {
//   setSelectedSchool(event.target.value);
//   if (event.target.value) {
//     setItemSelected(true);
//   } else {
//     setItemSelected(false);
//   }
// };
const handleButtonClick = () => {
  if(data === 'Orphan')
  {
    navigate('/raisefund')
  }
  else
  {
    navigate('/admissionForm');
  }
};
const handleForm = () => {
    navigate('/RaiseFund');
};
 
  return(
    <>
<div className="containerchat">
    <div className="margin-left-sidebar p-0 responsive-flex">
    
      <div className="chat">
        <div className="height-contain">
        {data === 'Orphan'?
        <div className='text-center mt-4'>
        <button onClick={()=> handleForm()} className='category-buttons'>
          Raise Fund for Orphan
        </button>
      <h6 className='text-center px-3 pt-3 pb-0 mb-0 color-purple margin-top-mobile'>
        Support Deseriving student/Orphan
        </h6> 
        </div>
         :
         <h6 className='text-center px-3 pt-5 pb-3 color-purple margin-top-mobile'>
      Select the {data} you want to send application in one-click. 
     </h6>
      }
      <div className="chat-messages d-flex justify-content-center flex-column">
        {/* {cities.map((city) => (
        <div
          key={city.name}
          className={`city-box ${selectedCity === city ? 'selected' : ''}`}
          onClick={() => handleCitySelect(city.name)}
        >
          {city.name}
        </div>
      ))} */}
        {disabledLocation ? 
        <>
        {data === 'School' || data === 'College' || data === 'University' || data === 'Consultant' ? 
 <div className="city-boxes">
      
<form>
<Form.Group as={Col} xs={12} controlId="formGridAddress1">
            <select className="country-select" onChange={handleCountryChange}>
                  <option value="">-- Select a Country --</option>
                  {countries.map((country) => (
                    <option key={country.id} value={country.isoCode} label={country.name}>
                      {country.name}
                    </option>
                  ))}
                </select>
                <select className="country-select" onChange={handleCityChange}>
                  <option value="">-- Select a City --</option>
                  {getCitiesForSelectedCountry(countryCode).map((city) => (
                    <option key={city.id} value={city.name}>
                      {city.name}
                    </option>
                  ))}
                </select>
      </Form.Group>
</form>
    </div>
    :
    <></>
                  }
    </>
    : <> </>}
    {loading ? <Loader/> :
      <>
      {data === "School" && (
        <>
        <Categorycommunity
          data={data}
          // items={Schools}
          items={school}
          selectedAuthors={selectedAuthors}
          handleSelectButtonClick={handleSelectButtonClick}
          handleSellerClick={handleSellerClick}
        />
        </>
      )}
      {data === "Orphan" && (
        <Categorycommunity
          data={data}
          items={Orphan}
          selectedAuthors={selectedAuthors}
          handleSelectButtonClick={handleSelectButtonClick}
          handleSellerClick={handleSellerClick}
      // Customize the labels here
        />
      )}
       {data === "Homeless" && (
        <Categorycommunity
          data={data}
          items={Orphan}
          selectedAuthors={selectedAuthors}
          handleSelectButtonClick={handleSelectButtonClick}
          handleSellerClick={handleSellerClick} // Customize the labels here
        />
      )}
       {data === "Blood" && (
        <Categorycommunity
          data={data}
          items={Orphan}
          selectedAuthors={selectedAuthors}
          handleSelectButtonClick={handleSelectButtonClick}
          handleSellerClick={handleSellerClick}
        />
      )}
       {data === "Students" && (
        <Categorycommunity
          data={data}
          items={Orphan}
          selectedAuthors={selectedAuthors}
          handleSelectButtonClick={handleSelectButtonClick}
          handleSellerClick={handleSellerClick}
        />
      )}
           
      {data === "College" && (
        <Categorycommunity
          data={data}
          items={colleges}
          selectedAuthors={selectedAuthors}
          handleSelectButtonClick={handleSelectButtonClick}
          handleSellerClick={handleSellerClick}
        />
      )}
      {data === "University" && (
        <Categorycommunity
          data={data}
          items={university}
          selectedAuthors={selectedAuthors}
          handleSelectButtonClick={handleSelectButtonClick}
          handleSellerClick={handleSellerClick}
        />
      )}
      {data === "Tutor" && (
        <Categorycommunity
          data={data}
          items={Tutors}
          selectedAuthors={selectedAuthors}
          handleSelectButtonClick={handleSelectButtonClick}
          handleSellerClick={handleSellerClick}
        />
      )}
      {data === "Events" && (
        <Categorycommunity
          data={data}
          items={Events}
          selectedAuthors={selectedAuthors}
          handleSelectButtonClick={handleSelectButtonClick}
          handleSellerClick={handleSellerClick}
        />
      )}
      {data === "Tuition" && (
        <Categorycommunity
          data={data}
          items={Tuitions}
          selectedAuthors={selectedAuthors}
          handleSelectButtonClick={handleSelectButtonClick}
          handleSellerClick={handleSellerClick}
        />
      )}
      {data === "UsedBook" && (
        <Categorycommunity
          data={data}
          items={UsedBook}
          selectedAuthors={selectedAuthors}
          handleSelectButtonClick={handleSelectButtonClick}
          handleSellerClick={handleSellerClick}
        />
      )}
       {data === "Uniform" && (
        <Categorycommunity
          data={data}
          items={Uniform}
          selectedAuthors={selectedAuthors}
          handleSelectButtonClick={handleSelectButtonClick}
          handleSellerClick={handleSellerClick}
        />
      )}
      {data === "Book" && (
        <Categorycommunity
          data={data}
          items={Book}
          selectedAuthors={selectedAuthors}
          handleSelectButtonClick={handleSelectButtonClick}
          handleSellerClick={handleSellerClick}
        />
      )}
     {data === "Consultant" && (
  <>
    <Categorycommunity
      data={data}
      items={consultant}
      selectedAuthors={selectedAuthors}
      handleSelectButtonClick={handleSelectButtonClick}
      handleSellerClick={handleSellerClick}
    />
  </>
)}
</>
}
   
                </div>
        </div>
        <div className="chat-fixed">
        <form className="chat-form">
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Type your message..."
          />
          <button type="button" onClick={handleButtonClick} disabled={!itemSelected} className={itemSelected ? "" : "disabled"}> 
  Next
</button>
          <br/>
          <div>
          
          </div>
          
        </form>
        <p>
            Get More Information about  <a href=""> Maava Tech </a>
          </p>
          </div>
      </div>
      </div>
     
     
    </div>
    
    </>
);
  };
export default Category;