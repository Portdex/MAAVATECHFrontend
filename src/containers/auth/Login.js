import { useState , useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { Auth } from 'aws-amplify'
import LoginComponent from '../../component/auth/Login'
import { toast } from 'react-toastify'
import { useToasts } from 'react-toast-notifications'


const Login = () =>{
    const navigate = useNavigate()
    const [password, setPassword ]= useState('')
    const [email, setEmail] = useState('')
    const [username , setUsername] = useState('')
    const [loading, setLoading] = useState(false)
    const {addToast}= useToasts()
    useEffect(() => {
      const historyValue = localStorage.getItem('formhistory');
      if (historyValue === 'posts'|| 'raisefund') {
        addToast('kindly Verify Your email first ', {
            appearance:'error',
            autoDismiss: true
          })    
        }
        else {
          addToast('Verify Your email', {
            appearance:'error',
            autoDismiss: true
          })
        }
     
    }, []); 
    const onLogin = async () => {
      setLoading(true)
        try {
            console.log(email); 
            let result = await Auth.signIn(email);
            window.cognitoUser=result  
            navigate('/confirmation')
          } 
          catch (error) {     
            console.log(error);
            try {
              await Auth.signUp({
                username: email,
                password: email,
                attributes: {
                  email: email, 
                  name:email
                }          
              });
              let result=await Auth.signIn(email);
              window.cognitoUser=result
              navigate('/confirmation')
            }            
            catch(ex) {
              console.log(ex)
              toast.error('User doesnot exist', {
                position: toast.POSITION.TOP_RIGHT, // You can customize the position
              });
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