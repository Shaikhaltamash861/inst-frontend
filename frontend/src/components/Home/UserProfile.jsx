import React, { useState } from 'react'
import img from '../../assests/images/hero.png'
import Sidebar from '../Home/sidebar/Sidebar'
import '../User/profile.css'
import { useEffect } from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from "react-redux";
import { toast } from 'react-toastify'
import { useLocation, useNavigate } from 'react-router-dom'
import Follow from './Follow'
import { userFollowers, userFollowing } from '../../reducers/friendsSlice'
import Following from './Following'
import SearchedUserPost from './post/SearchedUserPost'
import { searchedUser } from '../../actions/postAction'
import url from '../../routes/baseUrl'
import { setChat, setChatList } from '../../reducers/userReducers'
// import { useSelector } from 'react-redux'
function UserProfile() {
  const dispatch=useDispatch()
 const navigate=useNavigate()
  const id=useSelector((state)=>state.user.id)
  const h=useSelector((state)=>state.user)
  // const myProfile=useSelector((state)=>state.searchedUser)
  const user=useSelector((state)=>state.searchedUser)

  const [follower,setFollower]=useState(true)
  const [openFollowing,setOpenFollowing]=useState(false);
  const [openFollow,setOpenFollow]=useState(false);
  const message=async()=>{
     console.log(id)
     console.log(user.id)

    const {data}=await axios.post(`${url}/api/new/conversation`,{
      senderId:id,
      receiverId:user.id
      
     })
     
     if(data.success){
  
     
      dispatch(setChat({
        chat:user,
        consversationId:data?.message[0]?._id
      }))
       navigate('/direct/inbox')
      //  dispatch(setChat({
      //       chat:user,
      //       consversationId:data?.message[0]?._id
      //   }))
     }
     else{
       console.log('wrong')
       toast.error('something went wrong')
     }
   }
  useEffect(()=>{
    const x= user.followers.includes(id)
   if (x) {
    setFollower(false)
    
   }
                
  },[user])
  const follow= async()=>{
    const ids={
      myId:id,
      yourId:user.id
    }
    const {data}=await axios.post(`${url}/api/follow/user`
    ,ids
    )
  if(data.success){
    toast(data.message)
  }
  else{
    toast.error(data.message)
  }
    setFollower(!follower)
    
  }
  
   
    const getFollowers=async()=>{
      
      
      const {data}= await axios.post(`${url}/api/get/followers`,
      {
        id:user.id
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
 
     
     const {data}= await axios.post(`${url}/api/get/following`,
     {
       id:user.id
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
      setOpenFollowing(!openFollowing)
    }
    const handleOpenFollower=()=>{
      getFollowers()
      setOpenFollow(!openFollow)
    }
    
    return (
      <div className='main' style={{
        display:'flex'
      }} >
   <Sidebar/>
    <div className='profile'>
      <div className='first'>
        <div className='image'>
     
          <img src={user?.avatar}/>

        </div>
        <div className='me'>

        <div className='details'>
          <p>{user?.username}</p>
          <div style={{
            display:'flex'
          }}>
            {
              follower?(

                <button className='f-btn' onClick={follow}>Follow</button>
              ):(
                <button className='f-btn' onClick={follow}>Unfollow</button>
              )
            }
          <button  onClick={message} style={{
            color:'black',
            background:' rgb(204, 204, 204)',
            marginLeft:'10px',
            height:'26px',
            fontFamily:'sans-serif',
            fontWeight:'600'

          }}>Message</button>
          </div>
        </div>
        <div className='about'>
          <p>
          <span style={{
            fontWeight:'600',
            marginRight:'2px'
          }}>
            {user?.posts?.length}
            </span>
           
            post</p>
          <p onClick={handleOpenFollower} >
          <span style={{
            fontWeight:'600',
            marginRight:'2px'
          }}>
           
            {user?.followers?.length}
            </span>
            
            followers</p>
          <p onClick={handleOpenFollowing}>
          <span style={{
            fontWeight:'600',
            marginRight:'2px'
          }}>
    
            {user?.following?.length}
            </span>
            following</p>
        </div>
        </div>
      </div>
      <SearchedUserPost user={user}/>
    </div>
<Follow openFollow={openFollow} setOpenFollow={setOpenFollow} follower={follower} setFollower={setFollower} follow={follow} />
<Following openFollowing={openFollowing} setOpenFollowing={setOpenFollowing} />
          </div>
  )
}

export default UserProfile