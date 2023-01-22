import React from 'react'
import Chats from './Chats'
import Navbar from './Navbar'
import Search from './Search'
import './Sidebar.css'
const Sidebar = () => {
  return (
    <div className='sidebar'>
        <Navbar/>
        <Search/>
        <Chats/>
    </div>
  )
}

export default Sidebar