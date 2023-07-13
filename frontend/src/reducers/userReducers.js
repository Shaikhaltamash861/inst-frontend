
import {createSlice} from '@reduxjs/toolkit'

const initialState={
    id:'',
    name:'',
    email:'',
    username:'',
    avatar:'',
     posts:'',
     followers:'',
     following:'',
     myFollowingPost:'',
     users:[]
}

const userSlice=createSlice({
name:'user',
initialState,
reducers:{
    setUserLoginDetail:(state,action)=>{
        
        

        state.id=action.payload.id,
        state.name=action.payload.name,
        state.email=action.payload.email,
        state.username=action.payload.username,
        state.avatar=action.payload.avatar
        state.followers=action.payload.followers,
        state.following=action.payload.following
        state.posts=action.payload.posts
    },
    setUpdateImage:(state,action)=>{
           state.avatar=action.payload.avatar;
    },
    setPostOfFloowing:(state,action)=>{
         state.myFollowingPost=action.payload.myFollowingPost
    },
    setUserLogout:(state,action)=>{
        state.id=null,
        state.name=null,
        state.email=null,
        state.username=null,
        state.avatar=null
    },
    setRecent:(state,action)=>{
        state.users=action.payload.users
    }
  

}
})
 export const {setUserLoginDetail,setUserLogout,setUpdateImage,setPostOfFloowing,setRecent}=userSlice.actions;
 export default userSlice.reducer;
