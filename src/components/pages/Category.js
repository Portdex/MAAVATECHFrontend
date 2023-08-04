import React , {useState , useEffect} from 'react';
import '../../assets/chat.css'
import styled , { createGlobalStyle } from 'styled-components';
import { useNavigate, } from "react-router-dom";
import Sidebars from '../menu/sidebar';
import { 
  Schools,
  Colleges,
  Universities,
  Tuitions,
  Tutors,
  Events,
  Book,
  UsedBook,
  Uniform,
  Consultants, Orphans } from '../data/data';
import Categorycommunity from '../components/categorycommunity';
import CountrySelect from 'react-bootstrap-country-select';
import { Form } from 'react-bootstrap';
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
  const [ value, setValue ] = useState(null);
  const [data, setData] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupName, setPopupName] = useState('');
  const [popupPhoneNumber, setPopupPhoneNumber] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedSchool, setSelectedSchool] = useState('');
  const [school, setSchools] = useState([]);
  const [selectedCountryValue, setSelectedCountryValue] = useState('');

  useEffect(() => {
    const storedData = localStorage.getItem("category");
    if (storedData) {
      setData(storedData);
      console.log(data)
    }
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


  const navigate = useNavigate();
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };
 

const handleSellerClick = (username) => {
  navigate(`/seller/${username}`);
};
const handleSelectButtonClick = (author) => {
  if (selectedAuthors.includes(author.name)) {
    setSelectedAuthors((prevSelectedAuthors) =>
      prevSelectedAuthors.filter((username) => username !== author.name)
    );
  } else {
    setSelectedAuthors((prevSelectedAuthors) => [...prevSelectedAuthors, author.name]);
  }
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
  navigate('/admissionForm');
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
    {isPopupOpen && <div className="overlay-chat" onClick={closePopup}></div>}
<Sidebars/>
<div className="containerchat">
    <div className="margin-left-sidebar p-0 responsive-flex">
    
      <div className="chat">
        <div className="height-contain">
      <h6 className='text-center px-3 pt-5 pb-3 color-purple margin-top-mobile'>
      Select the {data} you want. 
        </h6>
        <div className="chat-messages d-flex justify-content-center flex-column">
        
      {data === "School" && (
        <Categorycommunity
          data={data}
          items={Schools}
          selectedAuthors={selectedAuthors}
          handleSelectButtonClick={handleSelectButtonClick}
          handleSellerClick={handleSellerClick}
        />
      )}
      {data === "Orphan" && (
        <Categorycommunity
          data={data}
          items={Orphans}
          selectedAuthors={selectedAuthors}
          handleSelectButtonClick={handleSelectButtonClick}
          handleSellerClick={handleSellerClick}
        />
      )}
       {data === "Homeless" && (
        <Categorycommunity
          data={data}
          items={Orphans}
          selectedAuthors={selectedAuthors}
          handleSelectButtonClick={handleSelectButtonClick}
          handleSellerClick={handleSellerClick}
        />
      )}
       {data === "Blood" && (
        <Categorycommunity
          data={data}
          items={Orphans}
          selectedAuthors={selectedAuthors}
          handleSelectButtonClick={handleSelectButtonClick}
          handleSellerClick={handleSellerClick}
        />
      )}
       {data === "Students" && (
        <Categorycommunity
          data={data}
          items={Orphans}
          selectedAuthors={selectedAuthors}
          handleSelectButtonClick={handleSelectButtonClick}
          handleSellerClick={handleSellerClick}
        />
      )}
           
      {data === "College" && (
        <Categorycommunity
          data={data}
          items={Colleges}
          selectedAuthors={selectedAuthors}
          handleSelectButtonClick={handleSelectButtonClick}
          handleSellerClick={handleSellerClick}
        />
      )}
      {data === "University" && (
        <Categorycommunity
          data={data}
          items={Universities}
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
          <button type="submit" onClick={handleButtonClick}>Next</button>
          <br/>
          <div>
          
          </div>
          
        </form>
        <p>
            Get More Information about  <a href="/blockchain"> Maava Tech </a>
          </p>
          </div>
      </div>
      </div>
     
     
    </div>
    {isPopupOpen && (
        <PopupContainer>
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
{/* {popupName && popupPhoneNumber ?
            <PopupButton onClick={sendPopupMessage}>Done</PopupButton>
            : */}
            <PopupButton disabled className='disabled'>Done</PopupButton>
          {/* } */}
            <PopupButton onClick={closePopup}>Cancel</PopupButton>
          </div>
        </PopupContainer>
      )}
    </>
);
  };
export default Category;