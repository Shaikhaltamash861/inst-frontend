import React from 'react'
import Sidebar from './sidebar/Sidebar'
import Main from './MainPost/Main'
import './home.css'
import Suggestion from '../User/suggetion/Suggestion'

function Home({username}) {
  return (
    <div className='container'>
        <div className="leftbar" >
    <Sidebar username={username} />

        </div>
        <div className="rightbar">

    <Main />
    <Suggestion/>
        </div>
    </div>
  )
}

export default Home