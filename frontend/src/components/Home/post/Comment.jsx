import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setComments } from '../../../reducers/postReducer'

function Comment({postId}) {
  const dispatch=useDispatch()
  const comments=useSelector((state)=>state.post.commentDetail)
  console.log(comments)
    const [items,setItems]=useState()
    // const getComments=async()=>{
    //   const {data}=await axios.post('http://localhost:8000/api/get/commented/user',{
    //     postId:postId,
   
    //   })
    //   if(data){
        
    //     dispatch(setComments({
    //       commentDetail:data.message.comments
    //     }) )
    //   }
       
       
    // }
    // useEffect(()=>{
     
       
    //    getComments()
       
    //   },[postId])
      

  return (
    <div className='comments'>
      {
             comments?.map((comment,id)=>(
              <div key={id} className='user  all-comments'>
                <img src={comment?.userDetail?.avatar}/>
                <p  className="username">{comment?.userDetail?.username}</p>
                <p className="caption">{comment?.comment}</p>
              </div>
             ))

      }


    </div>
  )
}

export default Comment