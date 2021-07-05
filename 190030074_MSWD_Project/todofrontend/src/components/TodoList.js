import React from 'react'
import Todo from './Todo'
import { useSelector } from 'react-redux'
import {Table} from 'react-bootstrap'

const TodoList=()=>{
    const todos=useSelector(state=>{
      if(!state.user){return state.todos
      }
      else if(state.filter==="all")
      {
      return state.todos.filter(x=>x.user.username==state.user.username)
      }
      else if(state.filter==="important")
      {
        return state.todos.filter(x=>x.user.username==state.user.username&&x.important===true)
      }
      else{
        return state.todos.filter(x=>x.user.username==state.user.username&&x.important===false)
      }
      })
    
    return (
      <div className="container" style={{maxWidth:"70%"}}>
        <Table striped>
      <tbody>
        {todos.map(todo =>
          <tr key={todo.id}>
            <Todo key={todo.id} todo={todo}/>
          </tr>
        )}
      </tbody>
    </Table>
    </div>
    )

}

export default TodoList