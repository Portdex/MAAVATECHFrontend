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
import { Form } from 'react-bootstrap';
import axios from 'axios';
import Loader from '../containers/Loader';

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
  const [error, setError] = useState(null);
  const location = useLocation();
  const navigate = useNavigate()
  const cities = [
    {
      name: 'Karachi',
      latitude: 24.8607533,
      longitude: 67.0011377,
    },
    {
      name: 'Lahore',
      latitude: 31.5498,
      longitude: 74.3436,
    },
    {
      name: 'Islamabad',
      latitude: 33.6844206,
      longitude: 73.0478901,
    },
    {
      name: 'Faisalabad',
      latitude: 31.450365,
      longitude: 73.135889,
    },
    {
      name: 'Multan',
      latitude: 30.1797529,
      longitude: 71.5460455,
    },
    {
      name: 'Peshawar',
      latitude: 34.0151375,
      longitude: 71.5249095,
    },
    {
      name: 'Quetta',
      latitude: 30.1797559,
      longitude: 66.9758386,
    },
  ];
  const [selectedCity, setSelectedCity] = useState("");
  console.log('selected' , selectedCity)
  const [userLocation, setUserLocation] = useState({});
  const [itemSelected, setItemSelected] = useState(false);
  useEffect(() => {
    const storedData = localStorage.getItem("category");
    if (storedData) {
      setData(storedData);
    }
  }, []);
  const getUserCity = async () => {
    try {      
      
      if (navigator.geolocation) {
        // get the current users location
        navigator.geolocation.getCurrentPosition(
          (position) => {
            // save the geolocation coordinates in two variables
            const { latitude, longitude } = position.coords;
            // update the value of userlocation variable
            setUserLocation({ latitude, longitude });
            
          },
          // if there was an error getting the users location
          (error) => {
            console.error('Error getting user location:', error);
          }
        );
      }
      // if geolocation is not supported by the users browser
      else {
        console.error('Geolocation is not supported by this browser.');
      }
          
    } catch (error) {
      console.error('Error getting user city:', error);
      setUserLocation({})
    }
    // setTimeout(() => {
    //   setLoading(false);
    // }, 5000);
  };

  // Function to fetch data for a given city
  const fetchDataForCity = async (userCity) => {
    setLoading(true)
    console.log("seelctedCity" , userCity)
    try {
      const schoolDataResponse = await axios.get(
        `https://153a5f6sbb.execute-api.eu-west-2.amazonaws.com/test/getSchoolsByLatitude/${userCity.latitude}/longitude/${userCity.longitude}`
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
    if (userLocation) {
      fetchDataForCity(userLocation);  
    }
  }, [userLocation]);
  
  const handleCitySelect = (city) => {
    const selectedCityInfo = cities.find((c) => c.name === city);
    setSelectedCity(selectedCityInfo);

    // Fetch data based on the selected city's latitude and longitude
    fetchDataForCity(selectedCityInfo);
    
  };
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
      // .finally(() => {
      //   setTimeout(() => {
      //         setLoading(false);
      //       }, 5000);
      // });
      
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
const handleSchoolChange = (event) => {
  setSelectedSchool(event.target.value);
  if (event.target.value) {
    setItemSelected(true);
  } else {
    setItemSelected(false);
  }
};
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
      <h6 className='text-center px-3 pt-3 pb-3 color-purple margin-top-mobile'>
        Support Deseriving student/Orphan
        </h6> 
        </div>
         :
         <h6 className='text-center px-3 pt-5 pb-3 color-purple margin-top-mobile'>
      Select the {data}s you want to send application in one-click. 
     </h6>
      }
      <div className="chat-messages d-flex justify-content-center flex-column">
 <div className="city-boxes mx-auto">
      {cities.map((city) => (
        <div
          key={city.name}
          className={`city-box ${selectedCity === city ? 'selected' : ''}`}
          onClick={() => handleCitySelect(city.name)}
        >
          {city.name}
        </div>
      ))}
    </div>
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