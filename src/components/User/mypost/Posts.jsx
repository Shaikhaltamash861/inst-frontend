import React,{useState,useEffect} from 'react'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import moment from 'moment'
import axios from 'axios'
import './posts.css'
// import Heart from '../../../assests/icons/heart.png'
import  Send  from '../../../assests/icons/Send.png'
import  Comment  from '../../../assests/icons/comment.png'
import  Emoji  from '../../../assests/icons/emoji.png'
import  Heart  from '../../../assests/icons/heart.png'
import  redHeart  from '../../../assests/icons/redheart.png'
import  vertical  from '../../../assests/icons/vertical.png'

import { SwipeableDrawer } from '@mui/material';
import Comments from './Comments'
import url from '../../../routes/baseUrl'
function Posts({post,user}) {
       const id=useSelector((state)=>state.user.id)
       const [comment,setComment]=useState('')
       const [like,setLike]=useState('')
       const [open,setOpen]=useState(false)
       const [draw,setDraw]=useState(false)
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
       useEffect(()=>{
         const x=post.likes.includes(user?.id)
         setLike(x)
     
       },[post])
       const likePost=async()=>{
          const {data}=await axios.post(`${url}/api/like`,{
           postId:post._id,
           userId:user.id
          })
          if(data.success){
           toast(data.message)
           setLike(!like)
          }
          else{
            setLike('')
           toast.error(data.message)
          }
     
       }
       const deletePost=async()=>{
            const {data}=await axios.post(`${url}/api/delete/post?postId=${post?._id}`,{
              userId:id
            })
            console.log(data)
            if(data.success){
              toast(data.message)
            }else{
              toast.error(data.message)
            }
       }
       
  return (
    <div className='my-card'>
   <SwipeableDrawer open={open} onClose={()=>setOpen(false)}
        anchor='bottom'  disableSwipeToOpen={true} >
             <div className='drawer' style={{
                height:'87vh'
             }}>
                 <Comments post={post} user={user}/>
             </div>
         </SwipeableDrawer>
         <SwipeableDrawer open={draw} onClose={()=>setDraw(false)} anchor='bottom' disableSwipeToOpen={true}>
              <div style={{ height:'40vh' }}>
                <ul style={{
                  padding:'15px',
                  listStyle:'none'
                }}>
                  <li style={{
                    color:'red',
                    cursor:'pointer'
                  }} onClick={deletePost}>Delete</li>
                </ul>
              </div>
         </SwipeableDrawer>
    <div className='card'>
        <div className='account' style={{
            display:'flex',
            justifyContent:'space-between'

        }}>
            <div className='strip' style={{
                display:'flex',
                alignItems:'center'
            }}>

          <div className='image'>

            <img style={{
                width:'343px'
            }} src={user?.avatar}/>
          </div>
            <p className='account-title'>{user?.username}</p>
            <span className='timeago'>
                

            <span ></span><span>{moment(post.createdAt).startOf('hour').fromNow()}</span>
            </span>
            </div>

       <div>
        <img style={{
            width: '19px',
            height: '19px',
            cursor:'pointer'
        }} src={vertical} onClick={()=>setDraw(!draw)} />
       </div>
        </div>
        <div className='my-post-img'>
            <img src={post.image}/>

    </div>
    <div className='others'>
      {
        like?(

          <img onClick={likePost} src={redHeart} className='material'/>
        ):(<img onClick={likePost}  src={Heart} className='material'/>)
      }
    <img src={Comment} onClick={()=>setOpen(!open)} className='material'/>
    <img src={Send} className='material'/>
    
    </div>
    <div className='likes' style={{
      display:'flex',
      paddingTop:'4px',
      fontFamily:'sans-serif'
    }}>
      <span>{post?.likes?.length}</span>
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
        }}>{user?.username}</p>
        <p className='caption' style={{
          wordBreak:'break-word',
          paddingLeft:'5px',
          fontFamily:'sans-serif'

        }}>{post?.caption}</p>
       </div>
        <div onClick={()=>setOpen(!open)} style={{
          wordBreak:'break-word',
          fontFamily:'sans-serif',
          color:'gray',
          cursor:'pointer',
          fontSize:'13px',
          paddingTop:'9px'

        }}>View {
          post?.comments?.length>0?(
            <>{post?.comments?.length}</>
          ):(
            <>all</>
          )
        } comment</div>
       <div className='add-comment'>
        <input style={{
          width:'80%'
        }} src='text' value={comment} placeholder='Add a comment' onChange={(e)=>setComment(e.target.value)} />
        <p style={{
          display:'flex'
        }}>
          {
            comment?(

              <button onClick={()=>hitComment(comment)}>Post</button>
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
        {/* {
          open?(

            <PostDialog open={open} setOpen={setOpen} user={post?.bucket[0]} post={post} hitComment={hitComment} />
          ):(
            <></>
          )
        } */}
    </div>
  )
}

export default Posts