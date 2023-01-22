import React, { useState } from 'react'
import { collection, doc, getDoc, getDocs, query, serverTimestamp, setDoc, updateDoc, where } from "firebase/firestore";
import "./Search.css"
import { db } from '../firebase';
import { async } from '@firebase/util';
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';
import { ChatContext } from './context/ChatContext';
const Search = () => {
  const{dispatch}=useContext(ChatContext)
  const [username, setUsername] = useState('');
  const [user, setUser] = useState(null);
  const [err, setErr] = useState(false);
  const {currentuser}=useContext(AuthContext)
  const handleSearch= async()=>{
   
    const q = query(collection(db, "users"), where("displayName", "==", username));
  try {
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
     setUser(doc.data())
     console.log(doc.data());
 });
 
  } catch (error) {
    setErr(true)
  }
  }
  const handleKey=(e)=>{
    e.code==='Enter'&& handleSearch();
  }
  const handleSelect =async ()=>{
    
    const combinedId = currentuser.uid > user.uid ? currentuser.uid+user.uid : user.uid + currentuser.uid;
  try {
    const res = await getDoc(doc(db,'chats',combinedId))
    if(!res.exists()){
      await setDoc(doc(db,'chats',combinedId),{messages:[]})
      await updateDoc(doc(db,'userChats',currentuser.uid),{
      [combinedId+".userInfo"]:{
        uid:user.uid,
        displayName:user.displayName,
        photoURL:user.photoURL
      },
      [combinedId+".date"]:serverTimestamp()
     })

     await updateDoc(doc(db,'userChats',user.uid),{
      [combinedId+".userInfo"]:{
        uid:currentuser.uid,
        displayName:currentuser.displayName,
        photoURL:currentuser.photoURL
      },
      [combinedId+".date"]:serverTimestamp()
     })
    }
      
    
  } catch (error) {
    console.log(error.message);
  }
    setUser(null)
    setUsername('')
  }
  return (
    <div className='search'>
        <div className="searchform">
            <input type="text" placeholder='find a user' value={username} onKeyDown={handleKey} onChange={(e)=>{setUsername(e.target.value)}}/>
        </div>
        {err && <span>User not found</span>}
      {user &&  <div className="userchat" onClick={handleSelect}>
            <img className='userchatimg' src={user.photoURL} alt="" />
            <div className="userchatinfo">
                <span>{user.displayName}</span>
                
            </div>
        </div>}
    </div>
  )
}

export default Search