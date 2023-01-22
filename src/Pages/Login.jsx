import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react'
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { auth, db } from '../firebase';
import './Login.css'

const Login = () => {
  const navigate=useNavigate();
  const [err, setErr] = useState(false)
  const handleSubmit= async (e)=>{
    e.preventDefault()
   
    const email=e.target[0].value;
    const password=e.target[1].value;
 

  try {
    await signInWithEmailAndPassword(auth,email,password)
    navigate('/')
  }catch (error) {
    setErr(true)
  }
  
    
  }
  return (
    <div className='formcontainer'>
        <div className="formwrapper">
            <span className='logo'>Chat App</span>
            <span className='title'>login</span>
            <form onSubmit={handleSubmit}>
                <input type="email" placeholder='email' />
                <input type="password" placeholder='password' />
               
                <button>Sign In</button>
                {err && <span>Something went wrong</span>}
            </form>
            <p>you don't have an account? <Link to='/register'>Register</Link></p>
        </div>
    </div>
  )
}

export default Login