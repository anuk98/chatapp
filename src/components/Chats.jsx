import { doc, onSnapshot } from 'firebase/firestore'
import React, { useContext } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { db } from '../firebase'
import "./Chats.css"
import { AuthContext } from './context/AuthContext'
import { ChatContext } from './context/ChatContext'
const Chats = () => {
    const {currentuser}=useContext(AuthContext)
    const{dispatch}=useContext(ChatContext)
    const[chats,setChats]=useState([])
    useEffect(() => {
   const getChats=()=>{
    const unsub= onSnapshot(doc(db,'userChats',currentuser.uid),(doc)=>{
        setChats(doc.data())
          }
         )
   
    
      return () => {
        unsub()
      }}
      currentuser.uid && getChats();
    }, [currentuser.uid])
    const handleSelect=(u)=>{
        dispatch({type:"CHANGE_USER",payload:u})
    }
  return (
    <div className='chats'>
        {Object.entries(chats)?.sort((a,b)=>b[1].date - a[1].date).map((chat)=>(
      <div className="userchats" key={chat[0]} onClick={()=>{handleSelect(chat[1].userInfo)}}>
            <img className='userchatsimg' src={chat[1].userInfo.photoURL} alt="" />
            <div className="userchatsinfo">
                <span>{chat[1].userInfo.displayName}</span>
                <p>{chat[1].lastMessage?.text}</p>
            </div>
        </div>))}
       
    </div>
  )
}

export default Chats