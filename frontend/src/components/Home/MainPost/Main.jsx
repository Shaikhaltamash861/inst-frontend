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
import url from '../../../routes/baseUrl'
function Main() {
  const dispatch=useDispatch()
  const [posts,setPost]=useState([])
const id=useSelector((state)=>state.user.id)

const post=useSelector((state)=>state.user.myFollowingPost)
  
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
  }, [id])
  
  return (<>
    <div className='post-section'>
      <Nav>
      <FavoriteBorderSharpIcon style={{
        marginRight:'10px',
        cursor:'pointer'
      }}/>
      <div style={{display:'flex' ,position:'relative'}}>

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
    
      {/* <HomeIcon fontSize="small" /> */}
      </Nav>
      <div className='story'>
        {/* <Story/> */}

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
        </>
  )
}

export default Main