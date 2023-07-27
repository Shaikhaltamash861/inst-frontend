import axios from "axios";
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'
import FormHelperText from '@mui/material/FormHelperText'
export const searchedUser=(data)=>async(dispatch)=>{
    try {
        dispatch({
            type:'OPEN_USER_PROFILE',
            payload:data
        })
        
    } catch (error) {
        dispatch({
            type:'FAIL_OPEN_USER_PROFILE',
            payload:error
        })
    }
}

export const addNewPost = (postData) => async (dispatch) => {
  
 
    try {

        dispatch({ type: 'NEW_POST_REQUEST' });
        
        const { data } = await axios.post('http://localhost:8000/api/post', postData);
     
        console.log(data)


        dispatch({
            type: 'NEW_POST_SUCCESS',
            payload: data,
        });

    } catch (error) {
        console.log(error)
        dispatch({
            type:"NEW_POST_FAIL",
            payload: error,
        });
    }
}
