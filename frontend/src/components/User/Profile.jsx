import React, { useState } from 'react'
import Sidebar from '../Home/sidebar/Sidebar'
import './profile.css'
import axios from 'axios'
import MenuIcon from '@mui/icons-material/Menu';
import { useDispatch, useSelector } from "react-redux";
import EditPopUp from './EditPopUp'
import Follower from './friends/Follower'
import Followings from './friends/Followings'
import myFriends, { userFollowers, userFollowing } from '../../reducers/myFriends'
import SearchedUserPost from '../Home/post/SearchedUserPost';
import { setUserLogout } from '../../reducers/userReducers';
import { useNavigate } from 'react-router-dom';
import Nav from '../mobile/Nav';
import { SwipeableDrawer } from '@mui/material';
import url from '../../routes/baseUrl';
// import { useSelector } from 'react-redux'
function Profile() {
  const navigate=useNavigate()
   const dispatch=useDispatch()
  const myProfile=useSelector((state)=>state.user)
  const myPost=useSelector((state)=>state.post)
  const [handleOpen,setHandleOpen]=useState(false)
  const [close, setClose]=useState(false)
  const [open,setOpen]=useState(false)
  const [drower,setDrower]=useState(false)
  
 const getFollowers=async()=>{
      
      
      const {data}= await axios.post(`${url}/api/get/followers`,
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
 
     
     const {data}= await axios.post(`${url}/api/get/following`,
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
    const logOut=()=>{
      dispatch(
        setUserLogout()
        )
        navigate('/')
    }
    
  return (
    <>
      <Nav>
         <MenuIcon onClick={()=>setDrower(!drower)}/>
         <SwipeableDrawer open={drower} onClose={()=>setDrower(false)}
        anchor='bottom'  disableSwipeToOpen={true} >
              <div className='drawer'>
                <ul >
                  <li>Setting and privacy</li>
                  <li> Your activity</li>
                  <li>Saved</li>
                  <li>Close Friends</li>
                  <li>change theme</li>
                  <li style={{
                    color:'red'
                  }} onClick={logOut} >Logout</li>
                </ul>
              </div>
         </SwipeableDrawer>
      </Nav>
    <div className='main' style={{
      display:'flex'
    }} >
   {/* <div className='layout'> */}
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
          <p > <span style={{
            fontWeight:'600',
            marginRight:'2px'
          }}>
            {myProfile?.posts?.length}
            </span> 
            post</p>
          <p  onClick={openFollower}>
          <span style={{
            fontWeight:'600',
            marginRight:'2px'
          }}>
           
            {myProfile?.followers?.length}
            </span>
            followers</p>
          <p onClick={ handleOpenFollowing}>
          <span style={{
            fontWeight:'600',
            marginRight:'2px'
          }}>
            
            {myProfile?.following?.length}
            </span>
            following</p>
        </div>
        </div>
      </div>
      <div className='post-card-box'>
        <SearchedUserPost user={myProfile}/>
            
      {/* {
        myPost?.myPost?.map((val)=>(
          
          <div className='post-card' key={val._id}>
          <img src={val.image} />
          </div>
          ))
        } */}
    
        </div>
    </div>
    <EditPopUp open={open} setOpen={setOpen}/>
    <Follower open={close} setOpen={setClose}/>
    <Followings  open={handleOpen} setOpen={setHandleOpen}/>
          </div>
   {/* </div> */}
          // </>
  )
}

export default Profile