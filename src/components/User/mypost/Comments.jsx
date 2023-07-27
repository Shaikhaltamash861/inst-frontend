import React,{useState} from 'react'
import Comment from '../../Home/post/Comment'
import axios from 'axios'
import url from '../../../routes/baseUrl'
import { toast } from 'react-toastify'
export default function Comments({post,user}) {
    const [comment,setComment]=useState('')
    const hitComment= async(prop)=>{
        const {data}=await axios.post(`${url}/api/add/comment`,{
          comment:prop,
          user:user.id,
          postId:post._id
        })
        console.log(data)
        if(data.message){
          setComment('')
          toast(data.message)
        }else{
          toast.error('cannot comment')
        }
        
      }
  return (
    <div>
         <div className="right-user">
            
              <div className="comments">
              <div className="user">
               <img src={user?.avatar}/>
               <p className="username"
               >{user?.username}</p>
                  <p className="caption">{post?.caption}</p>
              </div>

               {
                 open?(
                <>
                   {
                     post?.comments?.map((commet,id)=>(
                       
                       <div className="user" key={id}>
                          <Comment  userId={commet.user} comment={commet.comment}/>
                          </div>
                        ))
                      }
                      </>
          
                   ):(<></>)
                  }
              </div>
              <div className="comment">
        
        <input src='text'  placeholder='Add a comment' onChange={(e)=>setComment(e.target.value)} />
        <p style={{
          display:'flex'
        }}>
          {
            comment?(

              <button onClick={()=>hitComment(comment)} >Post</button>
            ):(
              <></> 
            )
          }
      
      
        </p>
       </div>
</div>
    </div>
  )
}
