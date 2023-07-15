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

  const Followings = ({open,setOpen}) => {
        const following=useSelector((state)=>state.myFriends)
  
    
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
                color:'black'
               }}
               >
                {
                following?.following?.map((val,idx)=>(

                  <div className="people" key={val._id}>
                <div className="img-name">
                  {
                    val?.avatar?(

                      <img src={val.avatar}/>
                    ):(
                      <img src='https://w7.pngwing.com/pngs/419/473/png-transparent-computer-icons-user-profile-login-user-heroes-sphere-black-thumbnail.png'/>
                    )
                  }
                <h2>{val.name}</h2>
                </div>
                <button>Unfollow</button>
               </div>
                 ))
                } 
               
               </div>
               </div>
      </Dialog>
    );
  };
   
  export default Followings;