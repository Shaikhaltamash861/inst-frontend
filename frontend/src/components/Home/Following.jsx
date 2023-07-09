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

  const Following = ({openFollowing,setOpenFollowing}) => {
        const following=useSelector((state)=>state.friends)
        
    
return (
      <Dialog open={openFollowing}    >
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
              <p onClick={()=>setOpenFollowing(!openFollowing)}  >
                <ClearIcon />
              </p>
               </div>
               <div className="main"
               style={{
                background:'black'
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
                <button>Follow</button>
               </div>
                 ))
                }
               
               </div>
               </div>
      </Dialog>
    );
  };
   
  export default Following;