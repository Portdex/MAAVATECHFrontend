import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CheckLocation = () => {
  const [userCity, setUserCity] = useState('');

  useEffect(() => {
    // Function to get user's city using the Google Geolocation API
    const getUserCity = async () => {
      try {
        const response = await axios.post(
          `https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyBrvLjLK6AcNCACeZZ2Ye-ZtFq2hpz2yT8`
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
      } catch (error) {
        console.error('Error getting user city:', error);
        setUserCity('City Not Found');
      }
    };

    getUserCity();
  }, []);

  return (
  
      <p className='city'>{userCity}</p>
  );
};

export default CheckLocation;
