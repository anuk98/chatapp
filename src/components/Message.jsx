import React, { useContext, useEffect } from 'react'
import { useRef } from 'react';
import { AuthContext } from './context/AuthContext'
import { ChatContext } from './context/ChatContext'
import './Message.css'
const Message = ({ message }) => {
  const { currentuser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);
 console.log(message.text);
  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  return (
    <div
      ref={ref}
      className={`message ${message.senderId === currentuser.uid && "owner"}`}
    >
      <div className="messageinfo">
        <img
          src={
            message.senderId === currentuser.uid
              ? currentuser.photoURL
              : data.user.photoURL
          }
          alt=""
        />
        <span>just now</span>
      </div>
      <div className="messagecontent">
        <p>{message.text}</p>
        {message.img && <img src={message.img} alt="" />}
      </div>
    </div>
  );
};

export default Message