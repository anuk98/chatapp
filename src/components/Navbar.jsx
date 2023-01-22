import { signOut } from 'firebase/auth'
import React, { useContext } from 'react'
import { auth } from '../firebase'
import { AuthContext } from './context/AuthContext'
import './Navbar.css'
const Navbar = () => {
  const {currentuser}=useContext(AuthContext)
  return (
    <div className='navbar'>
        <span className='nav_logo'>Chat App</span>
        <div className="nav_user">
            <img className='nav_img' src={currentuser.photoURL} alt="" />
            <span>{currentuser.displayName}</span>
            <button onClick={()=>{signOut(auth)}} className='nav_button'>logout</button>
        </div>
    </div>
  )
}

export default Navbar