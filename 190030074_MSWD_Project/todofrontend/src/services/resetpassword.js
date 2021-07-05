import axios from 'axios'
const baseUrl ='/api/password-reset'
import { setNotification } from '../reducers/notificationReducer'
import { useDispatch } from 'react-redux'
const resetpasswordmail = async(obj) =>{
    const response=await axios.post(baseUrl,obj)
    return response.data
}

const resetpasswordform=async(obj,uid,token)=>{
    const response=await axios.post(`${baseUrl}/${uid}/${token}`,obj)
    return response.data
}
export default {resetpasswordmail,resetpasswordform}