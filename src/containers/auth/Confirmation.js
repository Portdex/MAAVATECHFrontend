import React, { useState } from 'react'
import { Auth } from 'aws-amplify'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
//import md5 from 'md5'
import ConfirmationComponent from '../../component/auth/Confirmation'
import { useToasts } from 'react-toast-notifications'

const Confirmation = () => {
  const navigate = useNavigate()
  const [code, setCode] = useState('')
  const [loading, setLoading] = useState(false)
  const { addToast } = useToasts()
  const [load, setLoad] = useState(false)
  const email = useSelector(state => state.auth.currentUser?.email || '' )
  const phone = useSelector(state => state.auth.currentUser?.phone|| '' )
  const onConfirmation = async() => {
    const historyValue = localStorage.getItem('formhistory');
    setLoading(true)
   try {
      let response = await Auth.sendCustomChallengeAnswer(window.cognitoUser, code)      
      if (response.signInUserSession==null) {
        addToast("Invalid Code", {
          appearance: 'error',
          autoDismiss: true
        })
        // console.log(error)
      }
      else {
        addToast('Confirming your account success', {
          appearance:'success',
          autoDismiss: true
        })
        if (historyValue === 'raisefund') {
            navigate('/raisefund')
          }
          else if (historyValue === 'posts')
          {
            navigate('/lookingfor')
          }
        else{
          navigate('/')
        }
       
      }
    } catch (error) {
      console.log(error)
      addToast("Invalid Code", {
        appearance: 'error',
        autoDismiss: true
      })
    }
    setLoading(false)
  }

  const handleResend = async() => {
    setLoad(true)
    try {
      await Auth.resendSignUp(email ? email : phone);
    //   addToast('Re-send verification code success', {
    //     appearance: 'success',
    //     autoDismiss: true
    //   })
    } catch (error) {
        // addToast('Re-send verification code failed', {
        //   appearance:'error',
        //   autoDismiss: true
        // })
    }
    setLoad(false)
  }

  return (
    <ConfirmationComponent 
      code={code}
      setCode={setCode}
      onConfirmation={onConfirmation}
      handleResend={handleResend}
      loading={loading}
      load={load}
    />
  )
}

export default Confirmation