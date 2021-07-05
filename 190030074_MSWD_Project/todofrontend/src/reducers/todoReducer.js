import todoService from "../services/todos";
import {setNotification} from './notificationReducer'
import { useHistory } from "react-router";
const reducer=(state=[],action)=>{
    switch(action.type){
        case 'CREATE':{
            return [...state,action.data]
        }
        case 'INIT_TODOS':{
            return action.data.sort((a,b)=>b.important-a.important)
        }
        case 'UPDATE_TODO':{
            const updatedone=action.data
            return state.map(x=>x.id!==updatedone.id?x:updatedone).sort((a,b)=>b.important-a.important)
        }
        case 'REMOVE':{
            const id=action.data
            return state.filter(x=>x.id!==id)
        }
        default:return state
    }
}

export const createTodo=(obj)=>{
    return async dispatch=>{
        try{
        const newtodo=await todoService.createtodo(obj)
        dispatch({
            type:'CREATE',
            data: newtodo
        })
        dispatch(setNotification({text:`a new todo ${obj.content} added`,type:"success"},5))
       }
       catch(exception){
        dispatch(setNotification({text:`${exception.response.data.error}`,type:"danger"},5))
       }
    }
}

export const removeTodo=(id)=>{
    return async dispatch=>{
        try{
        await todoService.deletetodo(id)
        dispatch({
            type:'REMOVE',
            data:id
        })
        dispatch(setNotification({text:`deleted todo successfully`,type:'success'},5))
     }
        catch(exception){
            if(exception.response.data.error){
                dispatch(setNotification({text:`${exception.response.data.error}`,type:'danger'},5))
            }
            else{
            dispatch(setNotification({text:`already the todo was removed, ${exception.message}`,type:'danger'},5))
            }
        }
    }
}

export const updateTodo=(id,obj)=>{
    return async dispatch=>{
        try{
        const updatedone=await todoService.updatetodo(id,obj)
        dispatch({
            type:'UPDATE_TODO',
            data:updatedone
        })
        dispatch(setNotification({text:`${obj.content} updated successfully`,type:'success'},5))
    }
        catch(exception){
            dispatch(setNotification({text:`${exception.response.data.error}`,type:'danger'},5))
        }
    }
}

export const initializeTodos=()=>{
    return async dispatch=>{
        const todos=await todoService.getAll()
        dispatch({
            type:'INIT_TODOS',
            data:todos
        })
    }
}

export default reducer