import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { Auth } from 'aws-amplify'
import LoginComponent from '../../component/auth/Login'


const Login = () =>{
    const navigate = useNavigate()
    const [password, setPassword ]= useState('')
    const [email, setEmail] = useState('')
    const [username , setUsername] = useState('')
    const [loading, setLoading] = useState(false)
    const onLogin = async () => {
      setLoading(true)
        try {
            console.log(email); 
            let result = await Auth.signIn(email);
            window.cognitoUser=result  
            navigate('/confirmation')
          } 
          catch (error) {     
            try {
              await Auth.signUp({
                username: email,
                password: email,
                attributes: {
                  email: email, 
                }          
              });
              let result=await Auth.signIn(email);
              window.cognitoUser=result
              navigate('/confirmation')
            }
            catch(ex) {
              console.log(ex);
            }
          }
          setLoading(false)
        }
    return (
        <LoginComponent
        email={email}
        setEmail={setEmail}
        onLogin={onLogin}
        loading={loading}
        />
    )
}

export default Login