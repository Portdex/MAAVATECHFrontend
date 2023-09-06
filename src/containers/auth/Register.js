import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Auth } from 'aws-amplify'

import SignupComponent from '../../component/auth/Register'
import { signup } from '../../actions/auth'

const Signup = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [loading, setLoading] = useState(false)
  const onSignup = async () => {
    dispatch(signup(email))
    setLoading(true)
    try {
      await Auth.signUp({
        username: email ? email : phone ,
        password: email ? email : phone ,
        attributes: {
          email: email,
          name: name,
          phone_number: phone,
        },
        autoSignIn: { 
          enabled: true,
      }
      });
    //   addToast('Account Registration Success!', {
    //     appearance: 'success',
    //     autoDismiss: true,
    //   })
      navigate('/confirmation')
    } catch (error) {
    //   addToast(error.message, {
    //     appearance: 'error',
    //     autoDismiss: true,
    //   })
    console.log(error)
    }
    setLoading(false)
  }
  return <SignupComponent
  email={email}
  phone={phone}
  name={name}
  setName={setName}
  setEmail={setEmail}
  setPhone={setPhone}
  onSignup={onSignup}
  loading={loading}
  />
}

export default Signup