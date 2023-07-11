import React,{useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { getUserPost } from '../../../reducers/postReducer'
export default function SearchedUserPost({user}) {
    const dispatch=useDispatch()
   const post= useSelector((state)=>state.post)
   console.log(post)
    const getPosts=async()=>{
        const {data}=await axios.get(`http://localhost:8000/api/posts?id=${user.id}`)
        console.log(data)
           if(data){
    
             
             dispatch(getUserPost({
                userPost:data
             }))
            }
    
    
      }
      useEffect(() => {
         getPosts()
      }, [user])
      

  return (
    <div className='post-cards'>

    {
      post?.userPost?.map((val)=>(
        
        <div className='post-card' key={val._id}>
        <img src={val.image} />
    </div>
      ))
    } 
    
  
    </div>
  )
}
