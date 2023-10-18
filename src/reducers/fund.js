import {
    FUND 
  } from '../constants/actionTypes/fund'
  
  const INITIAL_STATE = {
    currentUser: {
      name:'',
      email:'',
      city:'',
      amount_to_raise:'',
      orphanName:'',
      description:'',
      phone:''
      
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