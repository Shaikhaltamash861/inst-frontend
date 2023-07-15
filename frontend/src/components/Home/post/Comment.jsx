import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setComments } from '../../../reducers/postReducer'
import url from '../../../routes/baseUrl'

function Comment({userId,comment}) {
  const dispatch=useDispatch()  
    const [items,setItems]=useState()
    const getComments=async()=>{
      const {data}=await axios.get(`${url}/api/user?_id=${userId}`)
      if(data){
         
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