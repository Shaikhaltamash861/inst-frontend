import React from 'react'
import  './banner.css'
import Drawer from '@mui/material/Drawer';
function Banner() {
  return (
    <div className='banner'>
       <Drawer 
      
            anchor='bottom'
            open={true}
            // onClose={toggleDrawer(anchor, false)}
          >
            hii
          </Drawer>
    </div>
  )
}

export default Banner