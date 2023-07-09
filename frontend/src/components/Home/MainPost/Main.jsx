import React,{useState,useEffect} from 'react'
import Story from '../story/Story'
import './main.css'
import Post from '../post/Post'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { getMyPost } from '../../../reducers/postReducer'
import { setPostOfFloowing } from '../../../reducers/userReducers'
function Main() {
  const dispatch=useDispatch()
  const [posts,setPost]=useState([])
const id=useSelector((state)=>state.user.id)

const post=useSelector((state)=>state.user.myFollowingPost)
  
  const getPosts=async()=>{
    const {data}=await axios.post(`http://localhost:8000/api/get/posts/following`,{
      id:id
    })
       if(data){

         
         dispatch(setPostOfFloowing({
          myFollowingPost:data
         }))
        }


  }
  useEffect(() => {
     getPosts()
  }, [id])
  
  return (
    <div className='post-section'>
      <div className='story'>
        <Story/>

      </div>
      {
      

         <div className='post'>
        
        {
          post?.posts?.map((val,i)=>(
            
            <Post key={i} post={val} />
            ))
          }
        

      </div>
         
          }
    </div>
  )
}

export default Main