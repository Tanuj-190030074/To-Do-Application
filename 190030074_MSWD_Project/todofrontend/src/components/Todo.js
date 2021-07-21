import React,{useState} from 'react'
import {Button} from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import {updateTodo,removeTodo } from '../reducers/todoReducer'
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
const Todo = ({todo}) => {
   const dispatch =useDispatch()
    const buttonname=todo.important?"Important":"Not Important"
    const variantstyle=todo.important?"danger":"primary"
    const variantstyle2=todo.completed?"success":"warning"
    const styling=todo.completed
    const variantstyle3={
      textDecorationLine:styling?'line-through':'none',
      width:"70%",
      
    }
    const handlebutton=async(event)=>{
      event.preventDefault()
      const updatedtodo={...todo,important:!todo.important}
      dispatch(updateTodo(updatedtodo.id,updatedtodo))
    }

    const updatecompletebutton=async(event)=>{
        event.preventDefault()
        const updatedtodo2={...todo,completed:!todo.completed}
        dispatch(updateTodo(updatedtodo2.id,updatedtodo2))
    }
  
    const removetodo=async(event) =>{
          event.preventDefault()
        if(window.confirm(`Are you sure?`))
        {
          dispatch(removeTodo(todo.id))
        }
    }

  return(
  <>
    <td style={variantstyle3} className="stylingclas">{todo.content}</td>
    {todo.completed?<td><Button onClick={handlebutton} variant={variantstyle} size="md" disabled>{buttonname}</Button></td>:
    <td><Button onClick={handlebutton} variant={variantstyle} size="md">{buttonname}</Button></td>}
    <td><Button onClick={updatecompletebutton} variant={variantstyle2}>Done</Button></td>
    <td> <IconButton aria-label="delete" style={{outline:0}} size="small" onClick={removetodo}>
        <DeleteIcon />
      </IconButton></td>
  </> )
}

export default Todo