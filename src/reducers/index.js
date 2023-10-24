import { combineReducers } from 'redux'

import auth from './auth'
import fund from './fund'
import admission from './admissionForm'
import lookingFor from './lookingFor'
const rootReducer = combineReducers({
  fund,
  auth,
  admission,
  lookingFor,
})

export default rootReducer
