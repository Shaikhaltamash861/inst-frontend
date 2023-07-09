import React, { useState } from 'react'
import Sidebar from '../Home/sidebar/Sidebar'
import './profile.css'
import axios from 'axios'
import { useDispatch, useSelector } from "react-redux";
import EditPopUp from './EditPopUp'
import Follower from './friends/Follower'
import Followings from './friends/Followings'
import { userFollowers, userFollowing } from '../../reducers/myFriends'
// import { useSelector } from 'react-redux'
function Profile() {
   const dispatch=useDispatch()
  const myProfile=useSelector((state)=>state.user)
  const myPost=useSelector((state)=>state.post)
  const [handleOpen,setHandleOpen]=useState(false)
  const [close, setClose]=useState(false)
  const [open,setOpen]=useState(false)

  
 const getFollowers=async()=>{
      
      
      const {data}= await axios.post('http://localhost:8000/api/get/followers',
      {
        id:myProfile.id
      }
      
      )
      if(data.message){
        dispatch(userFollowers({
          
          followers:data.message
        }
        ))
        
      }
      
     
   }
   const getFollowing=async()=>{
 
     
     const {data}= await axios.post('http://localhost:8000/api/get/following',
     {
       id:myProfile.id
      }
      
      )
      if(data.message){
        
         
        dispatch(userFollowing({
          following:data.message
        }))
        
      }
      
      
    }
    const handleOpenFollowing=()=>{
      
      getFollowing()
      setHandleOpen(!handleOpen)
    }
    const openFollower=()=>{
      getFollowers()
      setClose(!handleOpen)
    }
    
  return (
    <div className='main' style={{
      display:'flex'
    }} >
   <Sidebar/>
    <div className='profile'>
      <div className='first'>
        <div className='image'>
     
          <img src={myProfile?.avatar}/>

        </div>
        <div className='me'>

        <div className='details'>
          <p>{myProfile.username}</p>
          <button onClick={()=>setOpen(!open)}>edit profile</button>
        </div>

        <div className='about'>
          <p>{myProfile?.posts?.length}post</p>
          <p  onClick={openFollower}>{myProfile?.followers?.length}followers</p>
          <p onClick={ handleOpenFollowing}>{myProfile?.following?.length}following</p>
        </div>
        </div>
      </div>
      <div className='post-cards'>

      {
        myPost?.myPost?.map((val)=>(
          
          <div className='post-card' key={val._id}>
          <img src={val.image} />
      </div>
        ))
      }
      
    
      </div>
    </div>
    <EditPopUp open={open} setOpen={setOpen}/>
    <Follower open={close} setOpen={setClose}/>
    <Followings  open={handleOpen} setOpen={setHandleOpen}/>
          </div>
  )
}

export default Profile