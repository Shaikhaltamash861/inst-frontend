import { Dialog } from "@mui/material";
import './dialog.css'
import ClearIcon from '@mui/icons-material/Clear';
import React, { useState } from 'react'
import Comment from "./Comment";
function PostDialog({open,setOpen,user,post}) {
  const [comment,setComment]=useState()
  console.log('comment')
  
  return (
    <div>
        <Dialog open={open}  fullWidth='700px' maxWidth='md' >
            <div className="box">
                 <div className="nav" >
                    <p onClick={()=>setOpen(!open)}><ClearIcon/> </p>
                 </div>
                 <div className="childs">

            <div className="left-img">
                <img src={post?.image}/>
            </div>
            <div className="right-user">
              <div className="user-detail">
               <img src={user.avatar}/>
               <p style={{
              
               }}
               >{user.username}</p>
              </div>
              <div className="comments">
              <div className="user">
               <img src={user.avatar}/>
               <p className="username"
               >{user.username}</p>
                  <p className="caption">{post?.caption}</p>
              </div>
              <div className="all-comments">

               {
                 open?(
                   <Comment postId={post._id}/>
                   ):(<></>)
                  }
                  </div>
              </div>
              <div className="comment">
        
        <input src='text'  placeholder='Add a comment' onChange={(e)=>setComment(e.target.value)} />
        <p style={{
          display:'flex'
        }}>
          {
            comment?(

              <button >Post</button>
            ):(
              <></> 
            )
          }
      
      
        </p>
       </div>

            
            </div>

            </div>
                 </div>
        </Dialog>
    </div>
  )
}

export default PostDialog