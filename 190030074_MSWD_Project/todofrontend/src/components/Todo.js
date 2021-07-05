import React,{useState} from 'react'
import {Button} from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import {updateTodo,removeTodo } from '../reducers/todoReducer'
import Icon from '@material-ui/core/Icon';
const Todo = ({todo}) => {
   const dispatch =useDispatch()
    const buttonname=todo.important?"Important":"Not Important"
    const variantstyle=todo.important?"danger":"primary"
    const handlebutton=async(event)=>{
      event.preventDefault()
      const updatedtodo={...todo,important:!todo.important}
      dispatch(updateTodo(updatedtodo.id,updatedtodo))
    }
  
    const removetodo=async(event) =>{
          event.preventDefault()
        if(window.confirm(`Are you sure`))
        {
          dispatch(removeTodo(todo.id))
        }
    }

  return(
  <>
    <td style={{width:"70%"}}>{todo.content}</td>
    <td><Button onClick={handlebutton} variant={variantstyle}>{buttonname}</Button></td>
    <td><Button onClick={removetodo} variant="warning">Done</Button></td>
    
  </> )
}

export default Todo