import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setComments } from '../../../reducers/postReducer'

function Comment({userId,comment}) {
  const dispatch=useDispatch()
  const comments=useSelector((state)=>state.post.commentDetail)
  console.log(comments)
    const [items,setItems]=useState()
    const getComments=async()=>{
      const {data}=await axios.get(`http://localhost:8000/api/user?_id=${userId}`)
      if(data){
         console.log(data)
          setItems(data)
      }
       
       
    }
    useEffect(()=>{
     
       
       getComments()
       
      },[userId])
      

  return (
    <>
         
              
                <img src={items?.avatar}/>
                <p  className="username">{items?.username}</p>
                <p className="caption">{comment}</p>
              
            

      


    </>
  )
}

export default Comment