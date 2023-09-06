import {
  AUTH_LOGIN,
  AUTH_LOGOUT,
  AUTH_SIGNUP
} from '../constants/actionTypes/auth'

const INITIAL_STATE = {
  currentUser: {
    email: '',
    phone_number: '',
  }
}

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case AUTH_LOGIN:
      return {
        ...state,
        currentUser: action.user
      }
    case AUTH_LOGOUT:
      return {
        ...state,
        currentUser: {
          email: '',
        }
      }
    case AUTH_SIGNUP:
      return {
        ...state,
        currentUser: {
          email: action.email,
          phone: action.phone
        }
      }
    default:
      return state
  }
}

export default reducer