import {useState, useContext} from 'react'
import axios from 'axios'
import { SOCIALMTN_API } from '../Config'
import AuthContext from '../store/authContext'

 
const Auth = () => {
   const [username, setUsername] = useState('')
   const [password, setPassword] = useState('')
   const [register, setRegister] = useState(true)
   const [message, setMessage] = useState('')
   const [display, setDisplay] = useState('none')

   const authCtx = useContext(AuthContext)

//    const registerHandler = () => {
//     setRegister(false)
//    }

 
//    const submitHandler = e => {
//     e.preventDefault()

//     const body = {
//         username,
//         password
//     }

//     const url = 'https://socialmtn.devmountain.com'

//     axios.post(register ? `${SOCIALMTN_API}/register` : `${SOCIALMTN_API}/login`, body)
//         .then(({data}) => {
//             console.log('AFTER AUTH', data)
//         })
//         .catch(err => {
//             setPassword('')
//             setUsername('')
//         })
// }
//  const changeBtn = () => {
//     setRegister(!register)
    
//  }

   const submitHandler = e => {
       e.preventDefault()
       
       setDisplay('none')

       const body = {
        username,
        password,
       }

       if(register === true) {

        axios
            .post(`${SOCIALMTN_API}/register`, body)
            .then((response) => {
                console.log( `AFTER AUTH`, response.data)
                authCtx.login(response.data.token, response.data.userId, response.data.exp)
                console.log(response.data.token, response.data.exp, response.data.userId)
            }).catch((error) => {
                console.log(error)
                setMessage(error.response.data)
                setDisplay('block')
                setPassword('')
                setUsername('')
            })

       } else {

        axios.post(`${SOCIALMTN_API}/login`, body)
                .then((response) => {
                    console.log(response.data)
                    authCtx.login(response.data.token, response.data.userId, response.data.exp)
                    console.log(response.data.token, response.data.exp, response.data.userId)

                }).catch((error) => {
                    console.log(error)
                    setMessage(error.response.data)
                setDisplay('block')
                setPassword('')
                setUsername('')
                })
       }
 
       console.log('submitHandler called')

    //    console.log(username)
    //    console.log(password)
    //    console.log(register)
       setPassword('')
       setUsername('')
       
   }
 
   return (
       <main>
           <h1>Welcome!</h1>
           <form className='form auth-form' onSubmit={submitHandler} >
               <input
                    placeholder='username'
                    type='text'
                    value={username}
                    onChange={event => setUsername(event.target.value)}
                   className='form-input'/>
               <input
               type='text'
               placeholder='password'
               onChange={event => setPassword(event.target.value)}
               value={password}
                   className='form-input'/>

               <button className='form-btn'>

                   {register ? 'Sign Up' : 'Login'}
               </button>
           </form>
           <p style={{display: display}} className='auth-msg'>{message}</p>
           <button className='form-btn' onClick={() => setRegister(!register)}>
                Need to {register ? 'Login' : 'Sign Up'}?
            </button>
       </main>
   )
}
 
export default Auth