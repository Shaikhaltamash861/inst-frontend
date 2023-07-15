import React, { useState,useEffect } from 'react'
import { useSelector } from 'react-redux'
import Post from '../../Home/post/Post'
import Posts from './Posts'
import KeyboardBackspaceSharpIcon from '@mui/icons-material/KeyboardBackspaceSharp';
import Sidebar from '../../Home/sidebar/Sidebar'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import url from '../../../routes/baseUrl';

function MyPost() {
    const navigate=useNavigate()
    const  posts=useSelector((state)=>state.post.userPost)
    const [user,setUser]=useState()
    const getUser=async()=>{
        const {data}=await axios.get(`${url}/api/user?_id=${posts[0]?.postedBy}`)
    
           if(data){
    
             
          setUser(data)
            }
    
    
      }
      useEffect(() => {
         getUser()
      }, [])
    
  return (
    <div style={
        {
            height:'100vh'
        }
    } >
    
    {/* <Sidebar/> */}
    <div className='page-name' style={{
        display:'flex',
        justifyContent:'center',
        height:'50px',
        background:'white',
        alignItems:'center',
        fontSize:'17px',
        fontFamily:'sans-serif'
       
        
    }}>
        <div style={{
        display:'flex',
        width:'365px',
        justifyContent:'start',
        alignItems:'center',
        marginLeft:'6px'
      
    }}>
   <KeyboardBackspaceSharpIcon onClick={()=>navigate(-1)} style={{
    width:'30px'
   }}/>
    Posts
        </div>
    </div>
    <div className='post-section' >
    <div className='post' style={{
        
        display:'flex',
        justifyContent:'center',
        marginBottom:'10px'
    
    }}>
        {
            posts?.map((post,id)=>(
                <Posts key={id} post={post} user={user}/>
                ))
            }

    </div>
    </div>
            </div>
  )
}

export default MyPost