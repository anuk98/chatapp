import React from 'react'
import {  createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import {  ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import './Register.css'
import { auth, db, storage } from '../firebase';
import { doc, setDoc } from "firebase/firestore"; 
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate=useNavigate();
  const [err, setErr] = useState(false)
  const handleSubmit= async (e)=>{
    e.preventDefault()
    const displayName=e.target[0].value;
    const email=e.target[1].value;
    const password=e.target[2].value;
    const file=e.target[3].files[0];

  try {
    const res= await createUserWithEmailAndPassword(auth, email, password)
    

const storageRef = ref(storage, displayName);

const uploadTask = uploadBytesResumable(storageRef, file);


uploadTask.on('state_changed', 
  (snapshot) => {
     
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log('Upload is ' + progress + '% done');
    switch (snapshot.state) {
      case 'paused':
        console.log('Upload is paused');
        break;
      case 'running':
        console.log('Upload is running');
        break;
    }
  }, 
  (error) => {
    setErr(true)
  }, 
  () => {
  
    getDownloadURL(uploadTask.snapshot.ref).then(async(downloadURL) => {
    await updateProfile(res.user,{
      displayName:displayName,
      photoURL:downloadURL
     })
    
      await setDoc(doc(db, "users", res.user.uid), {
        uid:res.user.uid,
       displayName:displayName,
       email:email,
       photoURL:downloadURL
      });
      await setDoc(doc(db, "userChats", res.user.uid),{});
      navigate('/');
    });
  }
);

  } catch (error) {
    setErr(true)
  }
  
    
  }




  return (
    <div className='formcontainer'>
        <div className="formwrapper">
            <span className='logo'>Chat App</span>
            <span className='title'>Register</span>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder='display name' />
                <input type="email" placeholder='email' />
                <input type="password" placeholder='password' />
                <input style={{display:'none'}} type="file" id='file' />
                <label htmlFor="file">
                  <img className='addimage' src="https://img.icons8.com/color/2x/add-image.png" alt="" />
                  <span>Add an avatar</span>
                </label>
                <button>Sign Up</button>
               {err && <span>Something went wrong</span>}
            </form>
            <p>you do have an account? ,<Link to='/login'>Login</Link></p>
        </div>
    </div>
  )
}

export default Register;