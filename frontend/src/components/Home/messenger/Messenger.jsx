import React from 'react'
import './msg.css'
import Sidebar from '../sidebar/Sidebar'
import Chat from './Chat'
function Messenger() {
  return (
    <div className='messenger' style={{ display:'flex',width:'100%',height:'100vh'}}>
        <Sidebar />
        <div className='chat' style={{width:'100%'}}>
        <Chat/>
        </div>
    </div>
  )
}

export default Messenger