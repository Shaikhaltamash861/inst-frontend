import React, { useState } from 'react'
import './posts.css'
import postImg from '../../../assests/images/logos/mongodb.webp'
import  Send  from '../../../assests/icons/Send.png'
import  Comment  from '../../../assests/icons/comment.png'
import  Emoji  from '../../../assests/icons/emoji.png'
import  Heart  from '../../../assests/icons/heart.png'
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import MapsUgcOutlinedIcon from '@mui/icons-material/MapsUgcOutlined';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import { useSelector } from 'react-redux';
import EmojiPicker from 'emoji-picker-react';
import moment from 'moment'
import axios from 'axios'
function Post({post}) {
  console.log(post.bucket[0].avatar)
  const user=useSelector((state)=>state.user)
  const [comment,setComment]=useState('')

  const hitComment= async()=>{
    const {data}=await axios.post('http://localhost:8000/api/add/comment',{
      comment:comment,
      user:user.id,
      postId:post._id
    })
    
  }
  return (
    <div className='post-card'>

    <div className='card'>
        <div className='account'>
          <div className='image'>

            <img src={post?.bucket[0]?.avatar}/>
          </div>
            <p className='account-title'>{post?.bucket[0]?.username}s</p>
            <span className='timeago'>
                

            <span ></span><span>{moment(post.createdAt).startOf('hour').fromNow()}</span>
            </span>
    
        </div>
        <div className='post-img'>
            <img src={post.image}/>

    </div>
    <div className='others'>
    <img src={Heart} className='material'/>
    <img src={Comment} className='material'/>
    <img src={Send} className='material'/>
    
    </div>
    <div className='likes' style={{
      display:'flex',
      paddingTop:'4px',
      fontFamily:'sans-serif'
    }}>
      <span>1920</span>
      <p style={{
        paddingLeft:'6px'
      }}>likes</p>
       </div>
       <div className='comments' style={{

         display:'flex',
         alignItems:'center'
       }}>
        <p style={{
          fontFamily:'sans-serif',
          fontWeight:'600',
          fontSize:'13px'
        }}>{user.username}</p>
        <p className='caption' style={{
          wordBreak:'break-word',
          paddingLeft:'5px',
          fontFamily:'sans-serif'

        }}>{post.caption}</p>
       </div>
       <div className='add-comment'>
        <input style={{
          width:'80%'
        }} src='text' placeholder='Add a comment' onChange={(e)=>setComment(e.target.value)} />
        <p style={{
          display:'flex'
        }}>
          {
            comment?(

              <button onClick={hitComment}>Post</button>
            ):(
              <></> 
            )
          }
        <img style={{
          width:'30px',
          cursor:'pointer',
          paddingLeft:'7px'
        }} src={Emoji}/>
      
        </p>
       </div>
        </div>
        
    </div>
  )
}

export default Post