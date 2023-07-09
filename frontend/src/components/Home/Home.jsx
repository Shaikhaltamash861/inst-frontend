import React from 'react'
import Sidebar from './sidebar/Sidebar'
import Main from './MainPost/Main'
import './home.css'

function Home({username}) {
  return (
    <div className='container'>
        <div className="leftbar" >
    <Sidebar username={username} />

        </div>
        <div className="rightbar">

    <Main />
        </div>
    </div>
  )
}

export default Home