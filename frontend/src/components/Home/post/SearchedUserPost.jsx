import React,{useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { getUserPost } from '../../../reducers/postReducer'
import url from '../../../routes/baseUrl'
import { useNavigate } from 'react-router-dom'
export default function SearchedUserPost({user}) {
  const navigate=useNavigate()
    const dispatch=useDispatch()
   const post= useSelector((state)=>state.post)
  
    const getPosts=async()=>{
        const {data}=await axios.get(`${url}/api/posts?id=${user?.id}`)
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
        
        <div className='post-card' key={val._id} onClick={()=>navigate('/post')} >
        <img src={val.image} />
    </div>
      ))
    } 
    
  
    </div>
  )
}
