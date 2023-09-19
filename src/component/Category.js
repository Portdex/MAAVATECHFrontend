import React , {useState , useEffect} from 'react';
import '../assets/chat.css'
import styled , { createGlobalStyle } from 'styled-components';
import { useNavigate,useLocation } from "react-router-dom";
import Sidebars from '../menu/sidebar';
import { 

  Colleges,
  Universities,
  Tuitions,
  Tutors,
  Events,
  Book,
  UsedBook,
  Uniform,
  Consultants, } from '../data/data';
import Categorycommunity from '../containers/categorycommunity';
import CountrySelect from 'react-bootstrap-country-select';
import { Form } from 'react-bootstrap';
import axios from 'axios';
import * as yup from 'yup'
import { Auth } from 'aws-amplify'
import Loader from '../containers/Loader';

const GlobalStyles = createGlobalStyle`
`;

const PopupContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  padding: 20px;
  border: 1px solid #ccc;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  z-index: 9999;
  border-radius:10px
`;

const PopupInput = styled.input`
  margin-bottom: 10px;
  padding: 8px;
  width: 100%;
`;

const PopupButton = styled.button`
  padding: 8px 16px;
  background-color: #8364e2;
  color: #fff;
  border: none;
  cursor: pointer;
  margin:10px
`;

const Category= () => {
  const [inputValue, setInputValue] = useState('');
  const [selectedAuthors, setSelectedAuthors] = useState([]);
  const [data, setData] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupName, setPopupName] = useState('');
  const [popupPhoneNumber, setPopupPhoneNumber] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedSchool, setSelectedSchool] = useState('');
  const [school, setSchools] = useState([]);
  const [Orphan, setOrphan] = useState([]);
  console.log(school)
  const [loading, setLoading] = useState(true);
  const [currentEmail, setCurrentEmail]=useState('')
  const [error, setError] = useState(null);
  const location = useLocation();
  const navigate = useNavigate()
  const [selectedCountryValue, setSelectedCountryValue] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
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
  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    setPopupName('');
    setPopupPhoneNumber('');
  };

  const handlePopupNameChange = (event) => {
    setPopupName(event.target.value);
  };

  const handlePopupPhoneNumberChange = (event) => {
    setPopupPhoneNumber(event.target.value);
  };
  const sendPopupMessage = () => {
    // Call the Twilio API via your server to send the message
    axios.post('http://localhost:5000/api/send-message', {
      name: popupName,
      phoneNumber: popupPhoneNumber,
      message: inputValue,
    })
      .then((response) => {
        console.log('Message sent successfully!');
        console.log(response.data);
        // Add any success message or actions you want to perform after the message is sent
      })
      .catch((error) => {
        console.error('Error sending message:', error);
        // Handle the error or show an error message to the user
      });

    closePopup(); // Close the popup after sending the message
  };

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
 
  return(
    <>
    {loading ? <Loader /> : null}
    {isPopupOpen && <div className="overlay-chat" onClick={closePopup}></div>}

<div className="containerchat">
    <div className="margin-left-sidebar p-0 responsive-flex">
    
      <div className="chat">
        <div className="height-contain">
        {data === 'Orphan'?
      <h6 className='text-center px-3 pt-5 pb-3 color-purple margin-top-mobile'>
        Select The orphan you want to raise fund for
        </h6> 
         :
         <h6 className='text-center px-3 pt-5 pb-3 color-purple margin-top-mobile'>
      Select the {data}s you want to send application in one-click. 
     </h6>
      }
       
        <div className="chat-messages d-flex justify-content-center flex-column">
        {data && (
    <div>
      <input
        type="text"
        placeholder={`Search for ${data.toLowerCase()}`}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </div>
  )}
      {data === "School" && (
        <Categorycommunity
          data={data}
          // items={Schools}
          items={school.filter((schools) =>
            schools.name.toLowerCase().includes(searchQuery.toLowerCase())
          )}
          selectedAuthors={selectedAuthors}
          handleSelectButtonClick={handleSelectButtonClick}
          handleSellerClick={handleSellerClick}
          viewDetailsLabel="Details" // Customize the labels here
          selectLabel="Select"
        />
      )}
      {data === "Orphan" && (
        <Categorycommunity
          data={data}
          items={Orphan.filter((orphans) =>
            orphans.name.toLowerCase().includes(searchQuery.toLowerCase())
          )}
          selectedAuthors={selectedAuthors}
          handleSelectButtonClick={handleSelectButtonClick}
          handleSellerClick={handleSellerClick}
          viewDetailsLabel="Support" // Customize the labels here
        />
      )}
       {data === "Homeless" && (
        <Categorycommunity
          data={data}
          items={Orphan.filter((orphans) =>
            orphans.name.toLowerCase().includes(searchQuery.toLowerCase())
          )}
          selectedAuthors={selectedAuthors}
          handleSelectButtonClick={handleSelectButtonClick}
          handleSellerClick={handleSellerClick} // Customize the labels here
    selectLabel="support"
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
          items={Colleges.filter((colleges) =>
            colleges.name.toLowerCase().includes(searchQuery.toLowerCase())
          )}
          selectedAuthors={selectedAuthors}
          handleSelectButtonClick={handleSelectButtonClick}
          handleSellerClick={handleSellerClick}
        />
      )}
      {data === "University" && (
        <Categorycommunity
          data={data}
          items={Universities.filter((universities) =>
            universities.name.toLowerCase().includes(searchQuery.toLowerCase())
          )}
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


<hr className='custom-hr'/>
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
    {isPopupOpen && (
        <PopupContainer className='popup-responsive'>
          <h3>Send Message</h3>
          <PopupInput
            type="text"
            placeholder="Enter your name"
            value={popupName}
            onChange={handlePopupNameChange}
          />
          <PopupInput
            type="tel"
            placeholder="Enter your phone number"
            value={popupPhoneNumber}
            onChange={handlePopupPhoneNumberChange}
          />
          <div>
{popupName && popupPhoneNumber ?
            <PopupButton onClick={sendPopupMessage}>Done</PopupButton>
            :
            <PopupButton disabled className='disabled'>Done</PopupButton>
           } 
            <PopupButton onClick={closePopup}>Cancel</PopupButton>
          </div>
        </PopupContainer>
      )}
    </>
);
  };
export default Category;