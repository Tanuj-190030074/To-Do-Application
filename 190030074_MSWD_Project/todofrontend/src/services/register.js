import axios from 'axios'
const baseUrl ='/api/users'
import { setNotification } from '../reducers/notificationReducer'
const registeruser = async(obj) =>{
    const registered = await axios.post(baseUrl,obj)
    return registered.data
}
export default {registeruser}