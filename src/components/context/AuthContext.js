import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { createContext, useState } from "react";
import { auth } from "../../firebase";

export const AuthContext =createContext()
export const AuthContextProvider=({children})=>{
const[currentuser,setCurrentuser]=useState({});
useEffect(() => {
  const unsub = onAuthStateChanged(auth,(user)=>{
    setCurrentuser(user);
    
  })
 return ()=>{
    unsub();
 }
 
}, []);
return(
<AuthContext.Provider value={{currentuser}}>
{children}
</AuthContext.Provider>
)

}