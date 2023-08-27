import React,{useState,useEffect} from 'react'
import Story from '../story/Story'
import './main.css'
import Post from '../post/Post'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { getMyPost } from '../../../reducers/postReducer'
import { setPostOfFloowing } from '../../../reducers/userReducers'
import Nav from '../../mobile/Nav'
import messengerIcon from '../../../assests/icons/messenger.png'
import FavoriteBorderSharpIcon from '@mui/icons-material/FavoriteBorderSharp';
import arrow from '../../../assests/icons/arrow.png'
import { SwipeableDrawer } from '@mui/material';
import url from '../../../routes/baseUrl'
import Suggestion from '../../User/suggetion/Suggestion'
function Main() {
  const dispatch=useDispatch()
  const [posts,setPost]=useState([])
  const [randomPost,setRandom]=useState([])
  const [notify,setNotify]=useState(false)  
const id=useSelector((state)=>state.user.id)

const post=useSelector((state)=>state.user.myFollowingPost)
const getRandom=async()=>{
  const {data}=await axios.get(`${url}/api/random/post?id=${id}`)
  if(data.success){
    
    setRandom(data.posts)
  }
}
  
  const getPosts=async()=>{
    const {data}=await axios.post(`${url}/api/get/posts/following`,{
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
     getRandom()
  }, [id])
  
  return (<>
    <div className='post-section'>
      <Nav>
      <FavoriteBorderSharpIcon onClick={()=>setNotify(true)} style={{
        marginRight:'10px',
        cursor:'pointer'
        
      }}/>
        <SwipeableDrawer open={notify}  onClose={()=>setNotify(false)}
        anchor='bottom'  disableSwipeToOpen={true}>
          <div className='heights'>
            <div className='notify-bar'>
               <img onClick={()=>setNotify(false)} src={arrow}/>
               <p>Notification</p>
            </div>
            <div>
              <Suggestion/>
            </div>
          </div>

          </SwipeableDrawer>
      {/* <div style={{display:'flex' ,position:'relative'}}>

        <img style={{
          width:'25px',
          height:'24px',
          cursor:'pointer',
          position:'relative',
          top:'0'
        }} src={messengerIcon}/>
        <span style={{position:'absolute',top:'-6px',left:'13px',
        width:'18px',
        height:'17px',
        background:'#ff1212',
        color:'white',
        textAlign:'center',
        borderRadius:'50%',
        fontFamily:'sans-serif',
        fontSize:'14px'
      }}>5</span>
        </div>
     */}
      {/* <HomeIcon fontSize="small" /> */}
      </Nav>
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
        {
          randomPost?.map((val,i)=>(
            <Post key={i} post={val} followType={true} />
          ))
        }

      </div>
         
        }
    </div>
        </>
  )
}

export default Main