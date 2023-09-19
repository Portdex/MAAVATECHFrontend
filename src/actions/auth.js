import {
  AUTH_LOGIN,
  AUTH_LOGOUT,
  AUTH_SIGNUP
} from '../constants/actionTypes/auth'

export const login = user => ({ type: AUTH_LOGIN, user })

export const logout = () => ({ type: AUTH_LOGOUT })

export const signup = (email, phone) => ({ type: AUTH_SIGNUP, email, phone})