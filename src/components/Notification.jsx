import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Typography,
    Button,
  } from "@mui/material";
  import FileBase64 from 'react-file-base64';
  import axios from "axios";
  import image from '../assests/icons/image.png'
  import KeyboardBackspaceSharpIcon from '@mui/icons-material/KeyboardBackspaceSharp';
  import CollectionsOutlinedIcon from '@mui/icons-material/CollectionsOutlined';
  import { addNewPost } from "../actions/postAction";
  import { Input } from '@mui/material';
  import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
  import './notify.css'
  import { useDispatch, useSelector } from "react-redux";
  import {Cloudinary} from "@cloudinary/url-gen";
  import { ToastContainer, toast } from 'react-toastify';
  import CircularProgress from '@mui/material/CircularProgress';
  import Box from '@mui/material/Box';
  const cld = new Cloudinary({cloud: {cloudName: 'dwtnjp4gb'}});

import { useState } from "react";
import { getMyPost, getUserPost, updater } from "../reducers/postReducer";
import url from "../routes/baseUrl";

  const ConfirmNotification = ({open,setOpen}) => {
  
 
    const dispatch=useDispatch()
   const _id= useSelector((state)=>state.user.id)
  
    const [item,setItem]=useState();
    const [items,setItems]=useState(true);
    const [caption,setCaption]=useState('')
    const [postImage,setPostImage]=useState()
    const handleChange = (e) => {
      const reader = new FileReader();
      reader.onload = (env) => {
             setPostImage(env.target.result)

      };

      reader.readAsDataURL(e.target.files[0]);
      setItem(e.target.files[0]);
      
    }

    const sendPost= async(e)=>{
          setItems(false)
      const formdata=new FormData();
      
      formdata.append('file',postImage)

      formdata.append('upload_preset','insta_clone')
      formdata.append('cloud-name','dwtnjp4gb')
      
      const uri= 'https://api.cloudinary.com/v1_1/cloud2shaikh/image/upload';
      const {data}= await axios.post(uri,formdata)
      if(data.url){
       
        const response=await axios.post(`${url}/api/post`,{
          image:data.url,
          caption:caption,
          id:_id
        })
        if(response?.data?.success){
          
          console.log(response.data.post)
          setOpen(!open)
          toast.success('successfully uploaded')
       
          setItems(true)
        
        }
        else{
            setOpen(!open)
            toast.error('Something went worng')
        }
      }
      else{
        setOpen(!open)
        toast.error('Cloudinary Error')
      }
    
  
  

  
  // console.log(data)
  
  
  // // const { data } = await axios.post('http://localhost:8000/api/post',caption);
  // dispatch(addNewPost(formData));
  
}


return (
      <Dialog open={open}    >
           <div className={item?'bigDialog':'dialog'}>
              
             <div className="title">
              <p onClick={()=>setOpen(!open)} >
                <KeyboardBackspaceSharpIcon style={{ color:'black' }} onClick={()=>setItem('')}/>
              </p>
                {/* <p onClick={sendPost}>Create new post</p> */}
              
                {
                  item?(

              
                  <p className="share" onClick={sendPost}>
                      {
                        items?(
                          <>
                          Share
                          </>
                        ):(

                       <Box sx={{     top: 0,
                        left: 0,
                        bottom: 0,
                        right: 0,
                        position: 'absolute',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center', }}>
                      <CircularProgress />
                      </Box>
                        )
                      }
                  </p>
                
                  ):(<></>)
                }
             </div>

           <div className="content">
            {
              item?
              <div className="boxx">
                 <div className="left">
                  <img className="img" src={ URL.createObjectURL(item)}/>

                 </div>
                 <div className="right">
                  {/* <p></p> */}
                    <input type="textarea" placeholder="Write somethong..." value={caption} onChange={(e)=>setCaption(e.target.value)}  />
                 </div>
              
                 </div>
              :
              <> 

            {/* <CollectionsOutlinedIcon className="gall" style={{
              width:'100px',
              fontSize:'100px',
              paddingBottom:'20px'
            }}/> */}
            <InsertPhotoIcon className="galls" style={{
              width:'100px',
              fontSize:'100px',
              paddingBottom:'20px'}}/>
             {/* <img src={image} className="gall" style={{
              width:'100px',
              height:'100px',
              fontSize:'100px',
              paddingBottom:'20px'
            }}/> */}
           <input type="file" n name="file" id="file" class="inputfile"
           accept="image/*"
           onChange={handleChange}
            />
           <label for="file">Select from computer</label>
            </>
          }
           </div>
      
           </div>
      </Dialog>
    );
  };
   
  export default ConfirmNotification;