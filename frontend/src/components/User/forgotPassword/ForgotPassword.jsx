import React, { useState } from 'react'
import Auth from '../Auth'
import { Link } from 'react-router-dom'
function ForgotPassword() {
    const [email,setEmail]=useState('')
    const sendEmail=()=>{

    }
  return (
    <>
    <Auth>
    <input className='id' type='text'
                  name='email' placeholder='Email' value={email}
                  onChange={(e)=>setEmail(e.target.value)}

                  />
                  <button onClick={sendEmail}>Submit</button>
                  <div className='box2' style={
                    {
                      marginTop:'30px'
                    }
                  }>
            <p>Don't have any account ?  <Link to="/register" ><span>Sign Up</span></Link></p>
        </div>
    </Auth>
    </>
  )
}

export default ForgotPassword