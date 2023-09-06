import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CheckLocation2 = () => {
  const [userCity, setUserCity] = useState('');
  const [schools, setSchools] = useState([]);

  useEffect(() => {
    const getUserCity = async () => {
      try {
        const response = await axios.post(
          `https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyBrvLjLK6AcNCACeZZ2Ye-ZtFq2hpz2yT8`
        );

        const { location } = response.data;
        const { lat, lng } = location;

        const geocodeResponse = await axios.get(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=AIzaSyBrvLjLK6AcNCACeZZ2Ye-ZtFq2hpz2yT8`
        );

        const addressComponents = geocodeResponse.data.results[0].address_components;
        const city = addressComponents.find(component =>
          component.types.includes('locality')
        )?.long_name;

        setUserCity(city || 'City Not Found');
        findSchoolsInCity(city);
      } catch (error) {
        console.error('Error getting user city:', error);
        setUserCity('City Not Found');
      }
    };

    const findSchoolsInCity = async (city) => {
      try {
        const response = await axios.get(
          `https://maps.googleapis.com/maps/api/place/textsearch/json?query=schools+in+${city}&key=AIzaSyBrvLjLK6AcNCACeZZ2Ye-ZtFq2hpz2yT8`
        );

        const schoolResults = response.data.results;
        const schoolNames = schoolResults.map(school => school.name);
        setSchools(schoolNames);
      } catch (error) {
        console.error('Error getting schools:', error);
      }
    };

    getUserCity();
  }, []);

  return (
    <div>
      <p className='city'>{userCity}</p>
      <ul>
        {schools.map((school, index) => (
          <li key={index}>{school}</li>
        ))}
      </ul>
    </div>
  );
};

export default CheckLocation2;
