
import {createSlice} from '@reduxjs/toolkit'

const initialState={

     followers:[],
     following:[],
     
}

const myFriSlice=createSlice({
    name:'friend',
    initialState,
    reducers:{
        userFollowers:(state,action)=>{
    
       
        state.followers=action.payload.followers
    
    },
    userFollowing:(state,action)=>{
    
        
        state.following=action.payload.following
    }
   
  

}
})
 export const { userFollowers,userFollowing}=myFriSlice.actions;
 export default myFriSlice.reducer;
