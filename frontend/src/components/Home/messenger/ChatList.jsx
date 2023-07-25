import axios from 'axios'
import React, { useEffect, useState } from 'react'
import url from '../../../routes/baseUrl'
import { useDispatch, useSelector } from 'react-redux';
import { setChat } from '../../../reducers/userReducers';

function ChatList({value}) {
    const dispatch=useDispatch()
    const user=useSelector((state)=>state.user)
    const [item,setItem]=useState();
    const [lastMessage,setLastMessage]=useState()
    let id
     if(value.senderId===user.id){
           id=value.receiverId
     }
     else{
        id=value.senderId
     }
     useEffect(()=>{
        const getLastMsg=async()=>{
            const {data}=await axios.get(`${url}/api/last/message?id=${value._id}`)

            setLastMessage(data.message)
        }
        getLastMsg()
     },[value])
    useEffect(()=>{
        const userlist=async()=>{
            const {data}=await axios.get(`${url}/api/user?_id=${id}`)
            setItem(data)

        }
        userlist()
    },[value])
    
  return (
    <div onClick={()=>dispatch(setChat({
        chat:item,
        consversationId:value._id,
        consversation:value
    }))} >

            <div className='user-card'  >
            <img src={item?.avatar}/>
            <div className='user-intel' style={{
                display:'flex',
                justifyContent:'space-between',
                width:'100%'
            }}>

            <div className='user-info'>
                <h4>{item?.name}</h4>
                <div className='wrap-msg'>

                <p>{lastMessage}</p>
                </div>
            </div>
            <div style={{width:'100%',display:'flex',justifyContent:'end',paddingRight:'6px'}}>

            {/* <span style={{
                
                width:'18px',
                height:'17px',
                background:'rgb(22 93 185)',
                color:'white',
                textAlign:'center',
                borderRadius:'50%',
                fontFamily:'sans-serif',
                fontSize:'14px'
            }}></span> */}
            </div>
            </div>
         </div>

        
</div>
  )
}

export default ChatList