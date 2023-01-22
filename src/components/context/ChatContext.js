import { onAuthStateChanged } from "firebase/auth";
import { useContext, useEffect, useReducer } from "react";
import { createContext, useState } from "react";
import { auth } from "../../firebase";
import { AuthContext } from "./AuthContext";

export const ChatContext =createContext()

export const ChatContextProvider=({children})=>{
    const {currentuser}=useContext(AuthContext)
const INITIAL_STATE={
    user:{},
    chatId:'null'
}
const chatReducer=(state,action)=>{
    switch(action.type){
        case 'CHANGE_USER':
            return{
                user:action.payload,
                chatId: currentuser.uid > action.payload.uid ?
                 currentuser.uid+action.payload.uid :
                 action.payload.uid + currentuser.uid
            }
        default:
            return state;
    }
}
const[state,dispatch]=useReducer(chatReducer,INITIAL_STATE);
return(
<ChatContext.Provider value={{data:state,dispatch}}>
{children}
</ChatContext.Provider>
)

}