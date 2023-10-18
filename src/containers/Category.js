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
  const [inputValue, setInputValue] = useState('');
  const [selectedAuthors, setSelectedAuthors] = useState([]);
  const [data, setData] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedSchool, setSelectedSchool] = useState('');
  const [school, setSchools] = useState([]);
  const [Orphan, setOrphan] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentEmail, setCurrentEmail]=useState('')
  const [error, setError] = useState(null);
  const location = useLocation();
  const [selectedCountryValue, setSelectedCountryValue] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const cities = ["Karachi", "Islamabad", "Lahore", "Peshawar", "Quetta"];
  const [selectedCity, setSelectedCity] = useState("");
  const [userCity, setUserCity] = useState('');
  const [schoolData, setSchoolData] = useState([]);

  const { addToast } = useToasts()
  const navigate=useNavigate()
  useEffect(() => {
    // Function to get user's city using the Google Geolocation API
    const getUserCity = async () => {
      try {
        const response = await axios.post(
          'https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyBrvLjLK6AcNCACeZZ2Ye-ZtFq2hpz2yT8'
        );

        // Extract the latitude and longitude from the response
        const { location } = response.data;
        const { lat, lng } = location;

        // Call the Google Maps Geocoding API to get the address information
        const geocodeResponse = await axios.get(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=AIzaSyBrvLjLK6AcNCACeZZ2Ye-ZtFq2hpz2yT8`
        );

        // Extract the city name from the address
        const addressComponents = geocodeResponse.data.results[0].address_components;
        const city = addressComponents.find(component =>
          component.types.includes('locality')
        )?.long_name;

        setUserCity(city || 'City Not Found');

        // Fetch school data based on the city
        const schoolDataResponse = await axios.get(
          `https://153a5f6sbb.execute-api.eu-west-2.amazonaws.com/test/getSchools/${city}`
        );

        setSchoolData(schoolDataResponse.data);
      } catch (error) {
        console.error('Error getting user city:', error);
        setUserCity('City Not Found');
      }
    };

    getUserCity();
  }, []);
// Handle city selection
const handleCitySelect = (city) => {
  setSelectedCity(city);
};
const handleShowAll = () => {
  setSelectedCity(""); // Set selectedCity to empty to show all schools
};

  useEffect(() => {
    const storedData = localStorage.getItem("category");
    if (storedData) {
      setData(storedData);
      console.log(data)
    }
  }, []);

  useEffect(() => {
    // Fetch data from the API when the component mounts
    fetch("https://153a5f6sbb.execute-api.eu-west-2.amazonaws.com/test/getSchools")
      .then(response => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json(); // Assuming the response is in JSON format
      })
      .then(data => {
        data=data.data;
        // Update the state with the fetched data
        setSchools(data);
        setLoading(false);
      })
      .catch(err => {
        // Handle errors
        setError(err);
        setLoading(false);
      });
  }, []); // Empty dependency array to run the effect only once
  useEffect(() => {
    // Fetch data from the API when the component mounts
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
        // Update the state with the fetched data
        setOrphan(data);
        setLoading(false);
      })
      .catch(err => {
        // Handle errors
        setError(err);
        setLoading(false);
      });
  }, []);
  useEffect(() => {
    // Update the input value whenever the selectedAuthors array changes
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

  // Save the updated selectedAuthors array to local storage
  localStorage.setItem('selectedAuthors', JSON.stringify(updatedSelectedAuthors));
};

const handleCategoryChange = (event) => {
  setSelectedCategory(event.target.value);

  // Filter consultants based on selected category and country.
  const filteredConsultants = Consultants.filter(
    (consultant) => consultant.category === event.target.value && consultant.country === selectedCountry
  );

  // Get a list of unique schools from the filtered consultants.
  const consultantSchools = [...new Set(filteredConsultants.map((consultant) => consultant.school))];

  // Update the schools array with the filtered schools.
  setSchools(consultantSchools);

  setSelectedSchool(''); // Reset selected school when the category changes.
};

const handleCountryChange = (selectedValue) => {
  if (selectedValue) {
    const selectedCountryName = selectedValue.name;
    setSelectedCountry(selectedCountryName);

    // Filter consultants based on selected category and country.
    const filteredConsultants = Consultants.filter(
      (consultant) => consultant.category === selectedCategory && consultant.country === selectedCountryName
    );

    // Get a list of unique schools from the filtered consultants.
    const consultantSchools = [...new Set(filteredConsultants.map((consultant) => consultant.school))];

    // Update the schools array with the filtered schools.
    setSchools(consultantSchools);

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
const filteredConsultants = Consultants.filter((consultant) => {
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
    ? [...new Set(Consultants.filter((consultant) => consultant.country === selectedCountryValue && consultant.category === selectedCategory).map((consultant) => consultant.school))]
    : [];


// Get a list of unique countries from the Consultants' data.
const countries = [...new Set(Consultants.map((consultant) => consultant.country))];

// Get a list of schools based on the selected country.
const schools = selectedCountry
  ? [...new Set(Consultants.filter((consultant) => consultant.country === selectedCountry).map((consultant) => consultant.school))]
  : [];


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