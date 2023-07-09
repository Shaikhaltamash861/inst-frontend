
import {createSlice} from '@reduxjs/toolkit'

const initialState={
    myPost:[],
    userPost:[]
     
}

const postSlice=createSlice({
    name:'post',
    initialState,
    reducers:{
        getMyPost:(state,action)=>{
        
        state.myPost=action.payload.myPost
    },
    getUserPost:(state,action)=>{
        state.userPost=action.payload.userPost
    }
   
  

}
})

 export const {getMyPost,getUserPost}=postSlice.actions;
 export default postSlice.reducer;
