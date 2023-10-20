import axios from 'axios';

async function getUserCityAndData() {
  try {
    const response = await axios.post(
      'https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyBrvLjLK6AcNCACeZZ2Ye-ZtFq2hpz2yT8'
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

    const schoolDataResponse = await axios.get(
      `https://153a5f6sbb.execute-api.eu-west-2.amazonaws.com/test/getSchools/${city}`
    );

    return {
      city: city || 'City Not Found',
      schools: schoolDataResponse.data.schools.results,
      colleges: schoolDataResponse.data.colleges.results,
      universities: schoolDataResponse.data.universities.results,
      consultant: schoolDataResponse.data.consultants.results,
    };
  } catch (error) {
    console.error('Error getting user city:', error);
    return {
      city: 'City Not Found',
      schools: [],
      colleges: [],
      universities: [],
      consultant: [],
    };
  }
}

export { getUserCityAndData };
