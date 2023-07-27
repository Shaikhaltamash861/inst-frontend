import React from 'react'
import { Link } from 'react-router-dom'
import Auth from '../Auth'
function ResetPassword() {
  return (
    <>
    <Auth>
    <div className='inputs'>
                
                <input className='id' type='password'
                  name='email' placeholder='New Password'
                  onChange={(e)=>setEmail(e.target.value)}

                  />
                <input className='id' type='text'
                  name='email' placeholder='Confirm Password'
                  onChange={(e)=>setEmail(e.target.value)}

                  />
                 

                       

                
               <button >Log In</button>
               <div className='options'>

                <div className='or'>OR</div>
                <p onClick={()=>setForgot(!forgot)}> <Link to="/password/forgot">
                Forgot Password ? </Link></p>
               </div>

            </div>
            <div className='box2'>
            <p>Have already account ?  <Link to="/" ><span>Log In</span></Link></p>
        </div>
    </Auth>
    </>
  )
}

export default ResetPassword