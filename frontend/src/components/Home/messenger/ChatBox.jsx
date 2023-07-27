import React, { useEffect, useRef, useState } from 'react'
import './chat.css'
import url from '../../../routes/baseUrl'
import { useSelector } from 'react-redux'
import axios from 'axios'

function ChatBox({socket,socketMsg}) {
    const [text,setText]=useState('')
    const user=useSelector((state)=>state.user)
    const receiver=user.chat._id
    const conversatiion=user.consversation
    const [messages,setMessages]=useState([])
  
    const scrollRef = useRef()
   

    useEffect(()=>{
    
           if(socketMsg?.senderId){

               if(conversatiion.senderId===socketMsg.senderId||conversatiion.receiverId===socketMsg.senderId){
               
                   setMessages(prev=>[...prev,socketMsg])
                }
            }
      },[socketMsg])

    const send=async()=>{
        if(!text){
            return;
        }
        const newMessage={
               senderId:user.id,
                message:text,
                createdAt:Date.now()
            }
            setMessages([...messages,newMessage])

        socket?.current?.emit('sendMessage',{
            senderId:user.id,
            receiverId:receiver,
            message:text
         })
        const {data}= await axios.post(`${url}/api/new/message`,{
            conversationId:user?.consversationId,
            senderId:user.id,
            message:text
        })
        if(data.success){
            setText(' ')
            
        }
        
    }
    const getMessages=async()=>{
        const {data}=await axios.get(`${url}/api/retrive/messages?conversationId=${user.consversationId}`)
         setMessages(data)
        
    }
    useEffect(()=>{
          getMessages()
    },[user.consversationId])

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: 'smooth' })
      }, [messages])
  return (
    <div className='chat-box'>
        <div className='chattings'>
            {
                messages?.map((message,id)=>(
                    // {id===item.senderId?"me":"you"}
            <div  key={id} className={ message?.senderId==user.id? "message send":'message receive'}>

                                <p ref={scrollRef}>{message?.message}</p>
            </div>
                ))
            }
            
            
                    
        </div>
        <div className='text'>
            <input type='text' placeholder='Write something ....' value={text} onChange={(e)=>setText(e.target.value)}/>
            <p className='send-button' onClick={send}>send</p>
        </div>
    </div>
  )
}

export default ChatBox