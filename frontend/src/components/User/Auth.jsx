import React from 'react'
import phones from '../../assests/images/phones.webp'
import homepage from '../../assests/images/homepage.webp'
import logo from '../../assests/images/logos/instagram_logo.svg.png'
import { Link } from 'react-router-dom'
import './auth.css'

function Auth({children}) {
  return (
    <div className='login'>
        <div className='login-img'>

            <img className='image1' src={phones} alt='p'/>
            <img className='image2' src={homepage} alt='p'/>
        </div>
        <div className='login-box'> 
        <div  className='box1'>
            <img className='logo' src={logo} alt='p'/>
            <div className='inputs'>
                   {children}
               </div>
        </div>
        
    

        </div>
    </div>
  )
}

export default Auth