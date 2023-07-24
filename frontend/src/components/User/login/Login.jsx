import React, { useState } from 'react'
import './logins.css'
import phones from '../../../assests/images/phones.webp'
import homepage from '../../../assests/images/homepage.webp'
import logo from '../../../assests/images/logos/instagram_logo.svg.png'
import { Link } from 'react-router-dom'
import Auth from '../Auth'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { setUserLoginDetail } from '../../../reducers/userReducers'
import { toast } from 'react-toastify'
import url from '../../../routes/baseUrl'
function Login() {
    const dispatch=useDispatch()
    const name=useSelector((state)=>state.user.name)
    
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [forgot,setForgot]=useState(true)
    const config = {
      headers: {
          "Content-Type": "application/json",
      },
  }
    const handleLogin=async (e)=>{
        e.preventDefault()
      const {data}  = await axios.post(`${url}/api/signin`,
         {
          email:email,
          password:password
         })
         console.log(data)
          
         if(data.status){

           const {_id,name,username}=data.data;
           const myemail=data.data.email
           dispatch(setUserLoginDetail({
             id:_id,
             email:email,
             name: name,
             username: username,
             followers:data?.data?.followers,
             avatar:data?.data.avatar,
             following:data?.data?.following,
             posts:data?.data?.posts,
            }))
          
            
          }
          else{
           toast.error(data.message) 
          }
      
       
    }
  return (
    <>
    <Auth>
    <div className='inputs'>
                
                <input className='id' type='text'
                  name='email' placeholder='Username'
                  onChange={(e)=>setEmail(e.target.value)}

                  />
                 

                        <input className='id' type='password'  name='email' placeholder='Password' onChange={(e)=>setPassword(e.target.value)}/>

                
               <button onClick={handleLogin}>Log In</button>
               <div className='options'>

                <div className='or'>OR</div>
                <p onClick={()=>setForgot(!forgot)}> <Link style={{
                  textDecoration:'none',
                  color:'gray',
                  fontWeight:'100'
                }}
                 to="/password/forgot">
                Forgot Password ? </Link></p>
               </div>

            </div>
            <div className='box2'>
            <p>Don't have any accounts ?  <Link to="/register" ><span>Sign Up</span></Link></p>
        </div>
    </Auth>
    </>
  )
}

export default Login