import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Typography,
    Button,
  } from "@mui/material";
  import ClearIcon from '@mui/icons-material/Clear';
  import '../../notify.css'
  import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

  const Followers = ({open,setOpen,follower,follow}) => {
      const followers=useSelector((state)=>state.myFriends)
      const userId=useSelector((state)=>state.user.id)
      
      
return (
      <Dialog open={open}    >
           <div className={'dialog'} style={{
            
           }}>
              
             <div className="title" style={{
              display:'flex',
              justifyContent:'end',
              paddingRight:'10px'
             }}
             >
              
              <p onClick={()=>setOpen(!open)}  >
                 <ClearIcon /> 
              </p>
               </div>
               <div className="main"
               style={{
                
               }}
               >
                {
                followers?.followers?.map((val,idx)=>(

                  <div className="people" key={val._id}>
                <div className="img-name">
                  
                <img src={val.avatar}/>
                <h2>{val.name}</h2>
                </div>
                {
              val.followers.includes(userId)?(
              
                  <button onClick={follow}>Unfollow</button>
                  ):(
                      <button onClick={follow}>Follow</button>
              )
            }
               </div>
                 ))
                }  
               
               </div>
               </div>
      </Dialog>
    );
  };
   
  export default Followers