
import {createSlice} from '@reduxjs/toolkit'

const initialState={
    id:'',
    name:'',
    email:'',
    username:'',
    avatar:'',
     posts:'',
     followers:'',
     following:''
}

const searchSlice=createSlice({
    name:'userDetails',
    initialState,
    reducers:{
        updateList:(state,action)=>{
        console.log(action)
        state.id=action.payload.id,
        state.name=action.payload.name,
        state.email=action.payload.email,
        state.username=action.payload.username,
        state.avatar=action.payload.avatar
        state.followers=action.payload.followers,
        state.following=action.payload.following
        state.posts=action.payload.posts
    },
   
  

}
})
 export const {updateList}=searchSlice.actions;
 export default searchSlice.reducer;
