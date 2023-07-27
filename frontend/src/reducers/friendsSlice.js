
import {createSlice} from '@reduxjs/toolkit'

const initialState={

     followers:[],
     following:[],
     
}

const followSlice=createSlice({
    name:'friends',
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
 export const { userFollowers,userFollowing}=followSlice.actions;
 export default followSlice.reducer;
