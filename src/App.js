import React, { useContext } from 'react'
import './App.css'
import Home from './Pages/Home'
import Login from './Pages/Login'
import Register from './Pages/Register'
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import { AuthContext } from './components/context/AuthContext'

function App() {
  const {currentuser}=useContext(AuthContext)
  console.log(currentuser);
  return (
 <Router>
  <Routes>
    <Route path='/' element={currentuser?(<Home/>):(<Login/>)}/>
    <Route path='/register' element={<Register/>}/>
    <Route path='/login' element={<Login/>}/>
  </Routes>
 </Router>
  )
}

export default App
