import usersService from '../services/users'
import registerService from '../services/register'
import {setNotification} from '../reducers/notificationReducer'
const usersReducer=(state=[],action)=>{
    switch(action.type){
        case 'INIT_USERS':return action.data
        case 'ADD_USER':return [...state,action.data]
        default:return state
    }
}

export const initializeusers = ()=>{
    return async dispatch=>{
        const users=await usersService.getAll()
        dispatch({
            type: 'INIT_USERS',
            data: users
        })
    }
}

export const registeringuser=(obj)=>{
    return async dispatch=>{
        try{
            const registered=await registerService.registeruser(obj)
          dispatch({
            type:'ADD_USER',
            data:registered
            })
            dispatch(setNotification({text:`Registered successfully`,type:"success"},5))
        }
        catch(exception){
            dispatch(setNotification({text:`${exception.response.data.error}`,type:"danger"},5))
        }
    }
}





export default usersReducer