import React, { useState } from 'react'
import logo from '../../../assests/images/logos/instagram_logo.svg.png'
import './side.css'
import profile from '../../../assests/images/hero.png'
import OtherHousesSharpIcon from '@mui/icons-material/OtherHousesSharp';
import instalogo from '../../../assests/images/logos/intalogo.png'
import OtherHousesOutlinedIcon from '@mui/icons-material/OtherHousesOutlined';
import SearchSharpIcon from '@mui/icons-material/SearchSharp';
import ExploreSharpIcon from '@mui/icons-material/ExploreSharp';
import MovieSharpIcon from '@mui/icons-material/MovieSharp';
import MarkunreadSharpIcon from '@mui/icons-material/MarkunreadSharp';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import MenuIcon from '@mui/icons-material/Menu';
import Dialog from '@mui/material/Dialog';
import { useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { setUserLogout } from '../../../reducers/userReducers';
import ConfirmNotification from '../../Notification';
import { useEffect } from 'react';
import SearchBar from '../search/SearchBar';
import Banner from '../../User/dropDown/Banner';
function Sidebar() {
  const navigate=useNavigate();
  const dispatch=useDispatch()
 const location=useLocation()

  const [searchInput,setSearchInput]=useState(false)
  const [open,setOpen]=useState(false)
  const [layout,setLayout]=useState(false)
  const [openSetting,setOpenSetting]=useState(false)       
  const user=useSelector((state)=>state.user)
  const username=user.username
  const myImg=user.avatar;
  const handleScreen=()=>{

    
    if(window.innerWidth<980){
      setLayout(false)
    }
    else{
      setLayout(false)
    }
  }
  window.addEventListener('resize',handleScreen)

  const logOut=()=>{
    dispatch(setUserLogout())
  }
  useEffect(()=>{
    if(location.pathname==='/'){

      setLayout(true)
    }
           if(location.pathname===username){
            setLayout(true)
           }
           if(location.pathname==='/direct/inbox'){
            
            setLayout(false)
           }
  },[location])
  const handleSearch=()=>{
    setSearchInput(!searchInput)
    setLayout(!layout)
    
  }
  const navigator=(path)=>{
    
      
    if(path!==location.pathname){
      
      if(location.pathname==='/direct/inbox'){
        
        setLayout(false)
      }
      navigate(path)
    }
    else{
       if(searchInput){
         setSearchInput(false)
         setLayout(false)
       }
     }
  }
  
  return (<div className={searchInput?'full':''}>
    <div className={layout?'sidebar':'tag'}  >
        <div className='logo' onClick={()=>navigate('/')}>
          {
            !layout?(
            <img src={instalogo} />
            
            ):(
              <img onClick={logOut} src={logo}/>
              )
            }
        </div>
        <ul className='list'>
            <li className='item' onClick={()=>navigator('/')}>
              <OtherHousesOutlinedIcon className='icon'/>
              <h3>Home</h3>
            </li>
            <li className='item' onClick={()=>navigator('/search')}>
            <SearchSharpIcon  className='icon'/>
             
               
              <h3>Search</h3>
            </li>
            <li className='item'>
            <ExploreSharpIcon className='icon'/>
            <h3>Explore</h3>
            </li>
            <li className='item'>
            <MovieSharpIcon className='icon'/>
            <h3>Reels</h3>
            </li>
            <li className='item'  onClick={()=>navigator('/direct/inbox')}>
            <span style={{display:'flex' ,position:'relative'}}>

            <MarkunreadSharpIcon  style={{
          position:'relative',
          top:'0'
        }}className='icon'/>
        {
          user?.notifications>0?(

            <span style={{
              position:'absolute',
              right:'-4px',
              top:'-4px',
              width:'18px',
              height:'17px',
              background:'#ff1212',
              color:'white',
              textAlign:'center',
              borderRadius:'50%',
              fontFamily:'sans-serif',
              fontSize:'14px'
            }}>{user?.notifications}</span>
            ):(
                <></>
            )
          }
            </span>
            <h3>Messages</h3>
            </li>
            <li className='item'>
            <FavoriteBorderOutlinedIcon className='icon'/>
            <h3>Notifications</h3>
            </li>
            <li className='item'onClick={()=>setOpen(!open)}>
            <AddBoxOutlinedIcon className='icon'/>
            <h3 >Create</h3>
            </li>
            <li className='item' onClick={()=>navigator('/profile')}>
                <img src={myImg} alt='profile'/>
            <h3>Profile</h3>
            </li>
          
        </ul>
        < ConfirmNotification open={open} setOpen={setOpen}/>
         
        <div className='menu' onClick={()=>setOpenSetting(!openSetting)} >
          {/* <p>LogOut</p> */}
          <MenuIcon className='m'/> <h3>More</h3>
          {/* {
            openSetting?(

              <Banner/>
            ):(<></>)
          } */}
        </div>
        </div>
        {
          searchInput?(
            <SearchBar/>
            ):(<></>)
          }
          </div>
  )
}

export default Sidebar