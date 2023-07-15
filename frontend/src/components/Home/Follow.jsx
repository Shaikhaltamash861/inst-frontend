import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Typography,
    Button,
  } from "@mui/material";
  import ClearIcon from '@mui/icons-material/Clear';

 
  import '../notify.css'
  



import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

  const Follow = ({openFollow,setOpenFollow,follower,setOpenFollower,follow}) => {
      const followers=useSelector((state)=>state.friends)
      const userId=useSelector((state)=>state.user.id)
      
return (
      <Dialog open={openFollow}    >
           <div className={'dialog'} style={{
            width:'400px',
            height:'500px'
           }}>
              
             <div className="title" style={{
              display:'flex',
              justifyContent:'end',
              paddingRight:'10px'
             }}
             >
              <p onClick={()=>setOpenFollow(!openFollow)}  >
                <ClearIcon />
              </p>
               </div>
               <div className="main"
               style={{
                color:'black'
               }}
               >
               {
                followers?.followers?.map((val,idx)=>(

                  <div className="people" key={val._id}>
                <div className="img-name">
                  
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSl7Cadho1YF1TCFZRfanGSwIxnklacJPtiycrPEgtw&s"/>
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
   
  export default Follow;