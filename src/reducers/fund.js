import {
    FUND 
  } from '../constants/actionTypes/fund'
  
  const INITIAL_STATE = {
    currentUser: {
      name:'',
      email:'',
      city:'',
      amount:'',
      orphanName:'',
      description:'',
      phone:'',
      photopath:'',

    }
  }
  
  const reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case FUND:
        return {
          ...state,
          currentUser:action.payload
        }
      default:
        return state
    }
  }
  
  export default reducer