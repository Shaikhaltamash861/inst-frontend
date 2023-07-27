import React, { useState } from 'react'

import { Link,useNavigate } from 'react-router-dom';
import './registers.css'
import Auth from '../Auth'
import avatar from '../../../assests/images/logos/avatar.png'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import { setUserLoginDetail } from '../../../reducers/userReducers'
import url from '../../../routes/baseUrl';
import { useDispatch } from 'react-redux';
function Register() {
    const navigate=useNavigate()
    const dispatch=useDispatch()
    const [email,setEmail]=useState('');
    const  [name,setName]=useState('')
    const [username,setUserName]=useState('')
    const [password,setPassword]=useState('');
    const [forget,setForget]=useState()
  
    const handleLogin=async(e)=>{
        e.preventDefault()
        const {data}=await axios.post(`${url}/api/signup`,{
          name:name,
          email:email,
          username:username,
          password:password
        })
        console.log(data)
        if(data.status){
          
          
          dispatch(setUserLoginDetail({
            
            id:data?.user?._id,
            email:data.user.email,
            name: data.user.name,
            username:data.user.username
          }))
          toast("Registerd successfuly");
          navigate('/')
          
          return;
        }
        toast(data.message)
      

    }
  return (
    <>
    <Auth>
    <div className='inputs'>
                
                <input className='id' type='text'
                value={email}
                  name='email' placeholder='Email'
                  onChange={(e)=>setEmail(e.target.value)}

                  />
                <input className='id' type='text'
                  name='text' placeholder='FullName'
                  value={name}
                  onChange={(e)=>setName(e.target.value)}

                  />
                <input className='id' type='text'
                  name='text' placeholder='UserName'
                  value={username}
                  onChange={(e)=>setUserName(e.target.value)}

                  />
                 

                        <input className='id' type='text' value={password}  name='email' placeholder='Password' onChange={(e)=>setPassword(e.target.value)}/>
                    
                    {/* <div className='file-avatar'>
                        <img src={avatar} alt='l'/>
                        <input
                                    type="file"
                                    accept="image/*"
                                    name="avatar"
                                    
                                    className="block w-full text-sm text-gray-400
                                    file:mr-3 file:py-2 file:px-6
                                    file:rounded-full file:border-0
                                    file:text-sm file:cursor-pointer file:font-semibold
                                    file:bg-blue-100 file:text-blue-700
                                    hover:file:bg-blue-200
                                    "/>
                                    </div> */}
                
               <button onClick={handleLogin}>Register</button>
               <div className='options'>

                <div className='or'>OR</div>
                <p onClick={()=>setForgot(!forgot)}> <Link style={{
                  textDecoration:'none',
                  color:'gray',
                  fontWeight:'100'
                }} to="/password/forgot">
                Forgot Password ? </Link></p>
               </div>

            </div>
    <div className='box2'>
            <p>Have already account ?  <Link to="/"  ><span>Sign In</span></Link></p>
        </div>
    </Auth>
    
</>
  )
}

export default Register