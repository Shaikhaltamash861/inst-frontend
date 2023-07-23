import React, { useEffect, useRef, useState } from 'react'
import './right.css'
import { useSelector } from 'react-redux'
import ChatBox from './ChatBox'
import { io } from "socket.io-client";

function Right() {
    const socket=useRef()
    const users =useSelector((state)=>state.user)
    
    const user=users.chat;
    const [onlineUsers,setOnlineUsers]=useState();
    const [status,setStatus]=useState(false)
    const [socketMsg,setScoketMsg]=useState()
    useEffect(()=>{
    
        socket.current=io('ws://localhost:8900');
        socket?.current?.on('getMessage',(data)=>{
        
            if(data?.senderId)
            setScoketMsg({
                senderId:data.senderId,
                message:data.message,
                createdAt:Date.now()

            })
           })
    },[])
    
    
    useEffect(()=>{
        socket?.current.emit('addUsers',users.id)
        socket?.current.on('online-users',(user)=>{
            
             setOnlineUsers(user)
            
        })
    },[])
    useEffect(()=>{
        
        const x=onlineUsers?.find((item)=>item.userId===user?._id

        )
        
        setStatus(x)
 },[user,onlineUsers])
    
  return (
    <div className='right-bar'>
        {
            user?(
               <>
                <div className='user-nav'>
            <div className='current-user'>
                <img className='profile-pic' src={user?.avatar}/>
                <div className='user-chat'>
                   <h4>{user?.name}</h4>
                   
                   <p>{
                    status?(<>online</>):(<>offline</>)
                    }</p>
                </div>
            </div>
            <div></div>
            
        </div>
        <div className='chat-box'>
           <ChatBox socket={socket} socketMsg={socketMsg} />
        </div>
               </>
        
            ):(
                <>
                Message me
                </>
            )
        }
    </div>
  )
}

export default Right