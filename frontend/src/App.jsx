import { Profiler, useState,useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom';
import './App.css'
import Login from './components/User/login/Login'
import Register from './components/User/register/Register';
import ForgotPassword from './components/User/forgotPassword/ForgotPassword';
import ResetPassword from './components/User/resetPassword/ResetPassword';
import Sidebar from './components/Home/sidebar/Sidebar';
import Home from './components/Home/Home';
import Messenger from './components/Home/messenger/Messenger';
import Profile from './components/User/Profile';
import { useDispatch, useSelector } from 'react-redux';


import { setUserLoginDetail } from './reducers/userReducers';
import UserProfile from './components/Home/UserProfile';

function App() {

  const dispatch=useDispatch()
  let username=useSelector((state)=>state.user.username)
  

  return (
    <>
     <Routes>
      

        <Route path="/" element={ 
        

         username? (<Home/>):<Login/>
        
        } 
        />
      
     <Route path="/login" element={<Login/>} />
     <Route path="/register" element={<Register />} />
     <Route path="/password/forgot" element={<ForgotPassword/>} />
     <Route path="/password/reset" element={<ResetPassword/>} />
     <Route path="/direct/inbox" element={<Messenger/>} />

     <Route exact path="/profile" element={ username && <Profile />} />
     <Route path="/:username" element={ <UserProfile/>} />

     </Routes>
       
    </>
  )
}

export default App
