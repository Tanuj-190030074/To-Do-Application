import loginService from '../services/login'
import { setNotification } from './notificationReducer'
import { initializeusers } from './usersReducer'
import { initializeTodos } from './todoReducer'
import todoService from '../services/todos'
import userService from '../services/users'

const loginReducer =(state=null, action)=>{
    switch(action.type){
        case 'INIT_USER':return action.data
        case 'LOGIN':return action.data
        case 'LOGOUT':return action.data
        case 'UPDATE': return {...state,username: action.data}
        default:return state
    }
}

export const initializeuser=()=>{
    const loggedUserJSON = window.localStorage.getItem('loggedTodoappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      todoService.setToken(user.token)
      return{
          type:'INIT_USER',
          data:user
      }
    }
    return{
        type:'INIT_USER',
        data:null
    }
}

export const loginuser=(username, password,history)=>{
    return async dispatch=>{
    try {
        const user = await loginService.login({
          username, password,
        })
        window.localStorage.setItem(
          'loggedTodoappUser', JSON.stringify(user)
        ) 
        todoService.setToken(user.token)
        dispatch({
            type:'LOGIN',
            data:user
        })
        history.push("/")
      } catch (exception) {
        dispatch(setNotification({text:"wrong username or password",type:"danger"},5))
      }
    }
}

export const logoutuser=()=>{
    return async dispatch=>{
        window.localStorage.removeItem("loggedTodoappUser")
        dispatch({type:'LOGOUT',data:null})
    }
}

export const updateuser=(obj,history)=>{
  return async dispatch=>{
    try{
      const registered=await userService.updateusers(obj)
      const loggedUserJSON = window.localStorage.getItem('loggedTodoappUser')
      var user = JSON.parse(loggedUserJSON);
      user.username=obj.username
      window.localStorage.setItem(
        'loggedTodoappUser', JSON.stringify(user)
      ) 
      dispatch({type:"UPDATE",data:obj.username})
      console.log(registered)
      dispatch(initializeusers())
      dispatch(initializeTodos())
      history.push('/')
      dispatch(setNotification({text:`Updated profile successfully`,type:"success"},5))
  }
  catch(exception){
      dispatch(setNotification({text:`${exception.response.data.error}`,type:"danger"},5))
  }
  }
}

export default loginReducer