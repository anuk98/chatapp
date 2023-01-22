import React from 'react'
import { useContext } from 'react'
import './Chat.css'
import { ChatContext } from './context/ChatContext'
import Input from './Input'
import Messages from './Messages'
const Chat = () => {
const{data}=useContext(ChatContext)

  return (
    <div className='chat'>
      <div className="chatinfo">
        <span>{data.user?.displayName}</span>
        <div className="chaticon">
          <img src='https://img.icons8.com/pastel-glyph/2x/add-male-user.png' alt="" />
          <img src="https://img.icons8.com/ios/2x/dots-loading--v3.png" alt="" />
          <img src='https://img.icons8.com/ios/2x/video-call.png' alt="" />
        </div>
      </div>
      <Messages/>
      <Input/>
    </div>
  )
}

export default Chat