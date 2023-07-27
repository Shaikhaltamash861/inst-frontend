import React, { useEffect, useState } from 'react'
import { Dialog } from "@mui/material";
import './left.css'
import { useDispatch, useSelector } from 'react-redux'
import { setChat } from '../../../reducers/userReducers'
import SearchSharpIcon from '@mui/icons-material/SearchSharp';
import ClearSharpIcon from '@mui/icons-material/ClearSharp';
import axios from 'axios';
import url from '../../../routes/baseUrl';
import { ToastContainer, toast } from 'react-toastify';
import Nav from '../../mobile/Nav'
import KeyboardBackspaceSharpIcon from '@mui/icons-material/KeyboardBackspaceSharp';
import { useNavigate } from 'react-router-dom'
import ChatList from './ChatList';
function Left() {
  const navigate=useNavigate()
   const dispatch= useDispatch()
   const [open,setOpen]=useState(false)
   const me= useSelector((state)=>state.user)
   const  friends=useSelector((state)=>state.myFriends.following)
   const [conversations,setConversations]=useState([])
     useEffect(()=>{
         const getUser=async()=>{
          const {data}=await axios.get(`${url}/api/get/conversations?id=${me.id}`)
          setConversations(data)
          console.log(data)
         }  
         getUser()    
     },[me])
  
  //  const openChat=async(user)=>{
  //    console.log(user)
  //    const {data}=await axios.post(`${url}/api/new/conversation`,{
  //      senderId:me.id,
  //      receiverId:user._id
       
  //     })
      
  //     if(data.success){
        
  //       dispatch(setChat({
  //            chat:user,
  //            consversationId:data?.message[0]?._id
  //        }))
  //     }
  //     else{
  //       console.log('wrong')
  //       toast.error('something went wrong')
  //     }
  //  }

  return (
    <>
    <div className='navbar-mobile' >
        <Nav>
            <KeyboardBackspaceSharpIcon onClick={()=>navigate(-1)}/>
        </Nav>
      </div>
    <div  className='left-bar'>
        <Dialog open={open} >
         <div className='add'>
           <div className='add-nav'>
             <p>New message</p>
                 <ClearSharpIcon onClick={()=>setOpen(false)} style={{
                   cursor:'pointer',
                   marginRight:'9px'
             }}/>
           </div>
           <div className='add-content'>
              <div className='add-search'>
                <p>To</p>
                <input type='text'/>
              </div>
              <div className='results'>

              </div>
           </div>
         </div>
        </Dialog>
        <div className='header'>
             <h3>{me?.username}</h3> 
             <SearchSharpIcon onClick={()=>setOpen(true)} style={{
               cursor:'pointer',
               marginRight:'9px'
              }}/>
        </div>
        <div className='scroller'>

 {
   conversations?.map((user,id)=>(
     
     <ChatList key={id} value={user}/>
    ))
}

    
</div>
    
    </div>
      </>
  )
}

export default Left