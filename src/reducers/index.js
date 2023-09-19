import { combineReducers } from 'redux'

import auth from './auth'
import fund from './fund'
const rootReducer = combineReducers({
  fund,
  auth,
})

export default rootReducer
