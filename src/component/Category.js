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
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');
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
  const [selectedCountryValue, setSelectedCountryValue] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const cities = ["pakistan", "india", "uk", "us", "china"];
  const [selectedCity, setSelectedCity] = useState("");
  const [userCity, setUserCity] = useState('');
  console.log(userCity)
  useEffect(() => {
    setLoading(true)
    const storedData = localStorage.getItem("category");
    if (storedData) {
      setData(storedData);
      console.log(data)
    }
  }, []);
  const getUserCity = async () => {
    setLoading(true)
    try {
      const response = await axios.post(
        'https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyBrvLjLK6AcNCACeZZ2Ye-ZtFq2hpz2yT8'
      );
      const { location } = response.data;
      const { lat, lng } = location;
      const geocodeResponse = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=AIzaSyBrvLjLK6AcNCACeZZ2Ye-ZtFq2hpz2yT8`
      );

      // Extract the city name from the address
      const addressComponents = geocodeResponse.data.results[0].address_components;
      const city = addressComponents.find(component =>
        component.types.includes('locality')
      )?.long_name;
      setUserCity(city || 'City Not Found');

    } catch (error) {
      console.error('Error getting user city:', error);
      setUserCity('City Not Found');
    }
    setTimeout(() => {
      setLoading(false);
    }, 5000);
  };

  // Function to fetch data for a given city
  const fetchDataForCity = async (selectedCity) => {
    setLoading(true)
    try {
      const schoolDataResponse = await axios.get(
        `https://153a5f6sbb.execute-api.eu-west-2.amazonaws.com/test/getSchools/${selectedCity}`
      );
      setSchool(schoolDataResponse.data.schools.results);
      setColleges(schoolDataResponse.data.colleges.results);
      setUniversity(schoolDataResponse.data.universities.results);
      setConsultant(schoolDataResponse.data.consultants.results);
    } catch (error) {
      console.error('Error getting data for the selected city:', error);
      // Handle errors as needed
    }
    finally {
      setTimeout(() => {
        setLoading(false);
      }, 5000); // Set loading to false when data is fetched
    }
  };

  useEffect(() => {
    getUserCity();
  }, []);

  useEffect(() => {
   setLoading(true)
    if (userCity) {
      fetchDataForCity(userCity);
      localStorage.setItem('country' , userCity)
    }
  }, [userCity]);

  // Handle city selection
  const handleCitySelect = (selectedCity) => {
    setUserCity(selectedCity);
    
    
  };
  useEffect(() => {
    setLoading(true)
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
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      });
  }, []);
  useEffect(() => {
    setInputValue(`I am looking for ${selectedAuthors.join(', ')}`);
  }, [selectedAuthors]);
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };
const handleSellerClick = (username) => {
  navigate(`/seller/${username}`);
};
const handleSelectButtonClick = (author) => {
  let updatedSelectedAuthors;
  if (selectedAuthors.includes(author.name)) {
    updatedSelectedAuthors = selectedAuthors.filter((username) => username !== author.name);
  } else {
    updatedSelectedAuthors = [...selectedAuthors, author.name];
  }
  setSelectedAuthors(updatedSelectedAuthors);
  localStorage.setItem('selectedAuthors', JSON.stringify(updatedSelectedAuthors));
};

const handleCategoryChange = (event) => {
  setSelectedCategory(event.target.value);
  // Filter consultants based on selected category and country.
  const filteredConsultants = consultant.filter(
    (consultant) => consultant.category === event.target.value && consultant.country === selectedCountry
  );
  // Get a list of unique schools from the filtered consultants.
  const consultantSchools = [...new Set(filteredConsultants.map((consultant) => consultant.school))];

  // Update the schools array with the filtered schools.
  setSchool(consultantSchools);

  setSelectedSchool(''); // Reset selected school when the category changes.
};

const handleCountryChange = (selectedValue) => {
  if (selectedValue) {
    const selectedCountryName = selectedValue.name;
    setSelectedCountry(selectedCountryName);

    // Filter consultants based on selected category and country.
    const filteredConsultants = consultant.filter(
      (consultant) => consultant.category === selectedCategory && consultant.country === selectedCountryName
    );

    // Get a list of unique schools from the filtered consultants.
    const consultantSchools = [...new Set(filteredConsultants.map((consultant) => consultant.school))];

    // Update the schools array with the filtered schools.
    setSchool(consultantSchools);

    setSelectedSchool(''); // Reset selected school when the country changes.
  }
};


const handleSchoolChange = (event) => {
  setSelectedSchool(event.target.value);
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

// Filter consultants based on selected options.
const filteredConsultants = consultant.filter((consultant) => {
  if (selectedCategory && consultant.category !== selectedCategory) {
    return false;
  }
  if (selectedCountry && consultant.country !== selectedCountry) {
    return false;
  }
  if (selectedSchool && consultant.school !== selectedSchool) {
    return false;
  }
  return true;
});
const filteredSchools = selectedCountryValue
    ? [...new Set(consultant.filter((consultant) => consultant.country === selectedCountryValue && consultant.category === selectedCategory).map((consultant) => consultant.school))]
    : [];


// Get a list of unique countries from the Consultants' data.
const countries = [...new Set(consultant.map((consultant) => consultant.country))];

// Get a list of schools based on the selected country.
const schools = selectedCountry
  ? [...new Set(consultant.filter((consultant) => consultant.country === selectedCountry).map((consultant) => consultant.school))]
  : [];
 
  return(
    <>

<div className="containerchat">
    <div className="margin-left-sidebar p-0 responsive-flex">
    
      <div className="chat">
        <div className="height-contain">
        {data === 'Orphan'?
      <h6 className='text-center px-3 pt-5 pb-3 color-purple margin-top-mobile'>
        Support Deseriving student/Orphan
        </h6> 
         :
         <h6 className='text-center px-3 pt-5 pb-3 color-purple margin-top-mobile'>
      Select the {data}s you want to send application in one-click. 
     </h6>
      }
      <div className="chat-messages d-flex justify-content-center flex-column">
      {/* <select onChange={(e) => handleCitySelect(e.target.value)}>
        <option value="karachi">Karachi</option>
        <option value="islamabad">Islamabad</option>
        <option value="lahore">Lahore</option>
        <option value="peshawar">Peshawar</option>
        <option value="quetta">Quetta</option>
      </select> */}
 <div className="city-boxes mx-auto">
      {cities.map((city) => (
        <div
          key={city}
          className={`city-box ${selectedCity === city ? 'selected' : ''}`}
          onClick={() => handleCitySelect(city)}
        >
          {city}
        </div>
      ))}
       {/* <div className={`city-box ${selectedCity === "" ? 'selected' : ''}`} onClick={handleShowAll}>
        Show All
      </div> */}
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
         {selectedCity !== "" && school.filter((schools) =>
          schools.city.toLowerCase() === selectedCity.toLowerCase()
        ).length === 0 && (
          <h6 className='text-center'>No schools available in {selectedCity}</h6>
        )}
       
        </>
      )}
      {data === "Orphan" && (
        <Categorycommunity
          data={data}
          items={Orphan.filter((orphans) =>
            orphans.city.toLowerCase().includes(searchQuery.toLowerCase())
          )}
          selectedAuthors={selectedAuthors}
          handleSelectButtonClick={handleSelectButtonClick}
          handleSellerClick={handleSellerClick}
      // Customize the labels here
        />
      )}
       {data === "Homeless" && (
        <Categorycommunity
          data={data}
          items={Orphan.filter((orphans) =>
            orphans.city.toLowerCase().includes(searchQuery.toLowerCase())
          )}
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
          items={Tutors.filter((tutors) =>
            tutors.name.toLowerCase().includes(searchQuery.toLowerCase())
          )}
          selectedAuthors={selectedAuthors}
          handleSelectButtonClick={handleSelectButtonClick}
          handleSellerClick={handleSellerClick}
        />
      )}
      {data === "Events" && (
        <Categorycommunity
          data={data}
          items={Events.filter((events) =>
            events.name.toLowerCase().includes(searchQuery.toLowerCase())
          )}
          selectedAuthors={selectedAuthors}
          handleSelectButtonClick={handleSelectButtonClick}
          handleSellerClick={handleSellerClick}
        />
      )}
      {data === "Tuition" && (
        <Categorycommunity
          data={data}
          items={Tuitions.filter((tuitions) =>
            tuitions.name.toLowerCase().includes(searchQuery.toLowerCase())
          )}
          selectedAuthors={selectedAuthors}
          handleSelectButtonClick={handleSelectButtonClick}
          handleSellerClick={handleSellerClick}
        />
      )}
      {data === "UsedBook" && (
        <Categorycommunity
          data={data}
          items={UsedBook.filter((usedbook) =>
            usedbook.name.toLowerCase().includes(searchQuery.toLowerCase())
          )}
          selectedAuthors={selectedAuthors}
          handleSelectButtonClick={handleSelectButtonClick}
          handleSellerClick={handleSellerClick}
        />
      )}
       {data === "Uniform" && (
        <Categorycommunity
          data={data}
          items={Uniform.filter((uniform) =>
            uniform.name.toLowerCase().includes(searchQuery.toLowerCase())
          )}
          selectedAuthors={selectedAuthors}
          handleSelectButtonClick={handleSelectButtonClick}
          handleSellerClick={handleSellerClick}
        />
      )}
      {data === "Book" && (
        <Categorycommunity
          data={data}
          items={Book.filter((book) =>
            book.name.toLowerCase().includes(searchQuery.toLowerCase())
          )}
          selectedAuthors={selectedAuthors}
          handleSelectButtonClick={handleSelectButtonClick}
          handleSellerClick={handleSellerClick}
        />
      )}
     {data === "Consultant" && (
  <>
    <div className="row">
      <div className="col-4">
        <Form.Select aria-label="Default select example" onChange={handleCategoryChange}>
          <option>Select Category</option>
          <option value="School consultant">School Consultant</option>
          <option value="College consultant">College Consultant</option>
          <option value="University consultant">University Consultant</option>
        </Form.Select>
      </div>
      <div className="col-4">
        <CountrySelect value={selectedCountry} onChange={handleCountryChange} />
      </div>
      {selectedCategory && ( // Show school select only if a category is selected
        <div className="col-4">
          <Form.Select aria-label="Default select example" onChange={handleSchoolChange}>
            <option value="">Select Schools</option>
            {schools.map((school, index) => (
              <option key={index} value={school}>
                {school}
              </option>
            ))}
          </Form.Select>
        </div>
      )}
    </div>

    <Categorycommunity
      data={selectedCategory}
      items={filteredConsultants}
      selectedAuthors={selectedAuthors}
      handleSelectButtonClick={handleSelectButtonClick}
      handleSellerClick={handleSellerClick}
    />
  </>
)}
</>}


{/* <hr className='custom-hr'/> */}
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
          <button type="button" onClick={handleButtonClick}>Next</button>
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