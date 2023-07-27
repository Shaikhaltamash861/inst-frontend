import { Dialog } from "@mui/material";
import './dialog.css'
import ClearIcon from '@mui/icons-material/Clear';
import React, { useState } from 'react'
import { setComments } from '../../../reducers/postReducer'
import Comment from "./Comment";
import axios from "axios";

function PostDialog({open,setOpen,user,post,hitComment}) {

  
const [comment,setComment]=useState('')
  return (
    <div>
        <Dialog open={open}   >
            <div className="box">
                 <div className="navs" >
                    <p onClick={()=>setOpen(!open)}><ClearIcon/> </p>
                 </div>
                 <div className="childs">

            <div  className="left-img">
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

               {
                 open?(
                <>
                   {
                     post?.comments?.map((commet,id)=>(
                       
                       <div className="user" key={id}>
                          <Comment userId={commet.user} comment={commet.comment}/>
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
                 </div>
        </Dialog>
    </div>
  )
}

export default PostDialog