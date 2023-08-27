import React, { useEffect, useState } from 'react'
import './suggest.css'
import axios from 'axios'
import url from '../../../routes/baseUrl'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'

function Suggestion() {
   const [users,setUsers]=useState([])
   const [update,setUpdate]=useState()
  const user=useSelector((state)=>state.user)
  const userId=user.id
  
  const getUser=async()=>{
    const {data}=await axios.get(`${url}/api/retrive/suggestions?id=${userId}`)
    setUsers(data.users)
  }
  useEffect(()=>{
getUser()
  },[userId,update])
  const follow= async(hisId)=>{
   
      const ids={
        myId:userId,
        yourId:hisId
      }
      const {data}=await axios.post(`${url}/api/follow/user`
      ,ids
      )
    if(data.success){
      toast(data.message)
      setUpdate(data)
    }
    else{
      toast.error(data.message)
    }
      // setFollower(!follower)
      
    }
  
  const img='https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80'
  return (
    <div className='suggest'>
      {/* <div className='my-account'> */}
        {/* <img src={user?.avatar}/>
        <div>
          <h4>{user.username}</h4>
          <p>{user.name}</p>
        </div> */}
      
      <h6>Suggested for you</h6>
      {
        users?.map((user)=>(

          <div className='suggest-list'>

         <div className='img-name'>
         <img src={ user?.avatar==="i am image"?img:user?.avatar}/>
         <p>{user?.username}</p>
         </div>
         <div className='suggest-btn' >
           <button onClick={()=>follow(user._id)}>Follow</button>
         </div>
      </div>
        ))
      }
    
    
    </div>
  )
}

export default Suggestion