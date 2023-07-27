import React from 'react'
import './story.css'
import photo from '../../../assests/images/hero.png';
import { useSelector } from 'react-redux';

function Story() {
   const user= useSelector((state)=>state.user)
   const friends= useSelector((state)=>state.myFriends)

  return (
    <div className='storys'>
        <ul>
            <li >
                <img src={user?.avatar}/>
                <div className='wrapper'>
                <p className='demo'>{user?.username}</p>

                </div>
            </li>
            
           {/* {
            friends?.following?.map((dost)=>(
                <ul>
                <li>
                <img src={dost?.avatar}/>
                <p>{dost?.username}</p>
            </li>
            </ul>
            ))
           } */}
           
        </ul>
    </div>
  )
}

export default Story