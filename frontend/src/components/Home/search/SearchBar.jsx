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
import { useNavigate } from 'react-router-dom';
import SearchSharpIcon from '@mui/icons-material/SearchSharp';
import axios from 'axios'
import fakeImg from '../../../assests/icons/dummy.png'
import { useDispatch } from 'react-redux';
import { updateList } from '../../../reducers/searchSlice';
function SearchBar() {
  const dispatch=useDispatch()
  
  const navigate=useNavigate()
  const [accounts,setAccount]=useState([])
  
  const [query,setQuery]=useState('')
  const getUserByUserName=async(e)=>{
    e.preventDefault()
    const {data}=await axios.post('http://localhost:8000/api/retrive/user',{
      query
    })
    if(data.success){

      
      setAccount(data.users)
      console.log(data.users)
  
    }

  }
 
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
      
      location.replace(`/${path}`)
    //  navigate(path)
    }
 }

  return (
    

    <div className='searchbar'>
        <div className='search'>

            <h2 >Search</h2>
            <div style={{
              display:'flex'
            }}>

            <input type='text' placeholder='Search' value={query} onChange={(e)=>setQuery(e.target.value)}/>
            <button className='search-btn' onClick={getUserByUserName}><SearchSharpIcon/></button>
            </div>
        </div>
           <hr/>
        <div className='accounts'>
          <h3>Recent</h3>
          <div className='recent-list'>
            {
              accounts?(<>

                {
                  accounts.map((user,idx)=>(
                    
                    
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
          
  )
}

export default SearchBar