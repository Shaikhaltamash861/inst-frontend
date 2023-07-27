import React, { useState } from 'react'
import Left from './Left'
import Right from './Right'
import './chat.css'
import { useSelector } from 'react-redux'
function Chat() {
    // const []=useState()
   const open= useSelector((state)=>state.user.chat)
    
  return (
    <div className= { open?'leftNone  page':'rightNone page'}>
        <div className='left-chat' >
            <Left/>
        </div>
        <div className='right-chat'>
            <Right/>
        </div>
    </div>
  )
}

export default Chat