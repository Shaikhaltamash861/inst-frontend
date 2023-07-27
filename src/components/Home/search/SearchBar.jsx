import React,{useState} from 'react'
import './sea.css'
import { useEffect } from 'react'
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  Button,
} from "@mui/material";
import arrow from '../../../assests/icons/arrow.png'
import { useNavigate } from 'react-router-dom';
import SearchSharpIcon from '@mui/icons-material/SearchSharp';
import axios from 'axios'
import fakeImg from '../../../assests/icons/dummy.png'
import { useDispatch, useSelector } from 'react-redux';
import { updateList } from '../../../reducers/searchSlice';
import Sidebar from '../sidebar/Sidebar';
import { setRecent } from '../../../reducers/userReducers';
import url from '../../../routes/baseUrl';
function SearchBar() {
  const dispatch=useDispatch()
  const recent =useSelector((state)=>state.user.users)
  const user=useSelector((state)=>state.user)
  const navigate=useNavigate()

  const [accounts,setAccount]=useState([])
  
  const [query,setQuery]=useState('')
  const getUserByUserName=async(e)=>{
   
    const {data}=await axios.post(`${url}/api/retrive/user?user=${user.id}`,{
      query

    })
    if(data.success){

      
      setAccount(data.users)
      dispatch(setRecent({
        users:data.users
      }))
      console.log(data.users)
    
  
    }

  }
  useEffect(()=>{
        let timer=setTimeout(()=>{
          getUserByUserName()
        },2000)
        return ()=> clearTimeout(timer)
  },[query])
 
  const navigator=(path,user)=>{
    
    dispatch(
      updateList({
        id:user._id,
        email:user.email,
        name:user.name,
        username:user.username,
        avatar:user.avatar,
        followers:user.followers,
        following:user.following,
        posts:user.posts,
      })
    )
    if(path!=location.pathname){
        
      // location.replace(`profile/${path}`)
     navigate(`${path}`)
    }
 }
  const clearAll=()=>{
    dispatch(setRecent({
      users:[]
    }))
  }

  return (
    
    <div className='container'>
        <div className="leftbar" >
    <Sidebar />

        </div>
        <div className="rightbar">

    
    <div className='searchbar'>
        <div className='search'>
          <div className='back-btn' >

          <img onClick={()=>navigate('/')} src={arrow}/>
            <h2  >Search</h2>
            </div>
            <div style={{
              display:'flex'
            }}>

            <input type='text' placeholder='Search' value={query} onChange={(e)=>setQuery(e.target.value)}/>
            {/* <button className='search-btn' onClick={getUserByUserName}><SearchSharpIcon/></button> */}
            </div>
        </div>
           <hr/>
        <div className='accounts'>
          <div className='recent-nav' style={{
            display:'flex',
            justifyContent:'space-between',
            alignItems:'center',
            marginRight:'6px'
          }}>

          <h3>Recent</h3>
          <p style={{
            color:'#0171e9',
            cursor:'pointer'
          }} onClick={clearAll} >clear all</p>
          </div>
          <div className='recent-list'>
            {
              accounts?(<>

                {
                  recent?.map((user,idx)=>(
                    
                    
                    <div className='users' key={idx} onClick={()=>navigator(user?.username,user)}>
                      {
                        user?.avatar=='i am image'?(
                          <img src={fakeImg}/>
                          ):(
                            
                            <img src={user?.avatar}/>
                            )
                          }
              <div className='user'>
              <p className='user-id'>{user.username}</p>
              <p className='user-name'>{user.name}</p>
              </div>
              </div>
              ))
            }
          </>
            ):(
              <div>
                <h2>NOT FOUND</h2>
              </div>
            )
          }
         
        </div>
          </div>
          </div>
          
          </div>
      </div>
          
  )
}

export default SearchBar