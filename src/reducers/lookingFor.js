import {
    LOOKINGFOR 
  } from '../constants/actionTypes/lookingfor'
  
  const INITIAL_STATE = {
    currentUser: {
      lookingFor: '',
      grade : '',
      country:'',
      name:'',
      email:'',
      phoneNumber:'',
      description:'',

    }
  }
  
  const reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case LOOKINGFOR:
        return {
          ...state,
          currentUser:action.payload
        }
      default:
        return state
    }
  }
  
  export default reducer