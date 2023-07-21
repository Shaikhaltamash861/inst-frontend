import React, { useState } from 'react'
import Left from './Left'
import Right from './Right'

function Chat() {
    // const []=useState()
    
  return (
    <div className='page' style={{display:'flex',width:'100%'}}>
        <div className='left-chat'>
            <Left/>
        </div>
        <div className='right-chat' style={{width:'100%'}}>
            <Right/>
        </div>
    </div>
  )
}

export default Chat