import axios from 'axios'
import { Auth } from 'aws-amplify'

const fetch = async () => {
  let session = await Auth.currentSession();
  const response = axios({
    method: 'get',
    headers:{'x-access-token':session.accessToken.jwtToken, "x-id-token": session?.idToken?.jwtToken},
    url: 'https://153a5f6sbb.execute-api.eu-west-2.amazonaws.com/test/getSchools',    
    crossDomain: true
  });
  
  return response
} 

export default fetch



