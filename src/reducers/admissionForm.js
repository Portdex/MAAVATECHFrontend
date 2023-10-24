import {
    ADMISSION 
  } from '../constants/actionTypes/admissionForm'
  
  const INITIAL_STATE = {
    currentUser: {
      firstName:'',
      lastName:'',
      fatherName:'',
      birthPlace:'',
      DOB:'',
      grade:'',
      address:'',
      file:'',

    }
  }
  
  const reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case ADMISSION:
        return {
          ...state,
          currentUser:action.payload
        }
      default:
        return state
    }
  }
  
  export default reducer