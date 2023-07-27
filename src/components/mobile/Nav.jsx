import React from 'react'
import './nav.css'
import logo from'../../assests/images/logos/instagram_logo.svg.png';

function Nav({children}) {
  return (
    <div className='nav'>
      <div className='nav-logo'>
      <img src={logo}/> 

      </div>
      <div className='nav-icons'>
      {
        children
      }

      </div>

    </div>
  )
}

export default Nav