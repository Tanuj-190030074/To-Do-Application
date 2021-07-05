import React, {useEffect,useRef } from 'react'
import { useDispatch,useSelector} from 'react-redux'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import NavigationBar from './components/NavigationBar'
import RegistrationForm from './components/RegistrationForm'
import TodoForm from './components/TodoForm'
import TodoList from './components/TodoList'
import UpdateProfile from './components/UpdateProfile'
import ResetPasswordEmail from './components/ResetPasswordEmail'
import ResetPasswordForm from './components/ResetPasswordForm'
import {Table, Form, Button, Alert, Navbar, Nav } from 'react-bootstrap'
import { createTodo,updateTodo,initializeTodos,removeTodo } from './reducers/todoReducer'
import { initializeuser,logoutuser } from './reducers/loginReducer'
import { initializeusers } from './reducers/usersReducer'
import {
  BrowserRouter as Router,
  Switch, Route, Link,useRouteMatch,useHistory,Redirect
} from "react-router-dom"

const App = () => {
  
  const user=useSelector(state=>state.user)
  const users=useSelector(state=>state.users)
  const dispatch=useDispatch()
  const history=useHistory()
  
  useEffect(() => {
    dispatch(initializeTodos())
    dispatch(initializeuser())
    dispatch(initializeusers())
  }, [dispatch])
  

  const handleLogout=(event)=>{
    event.preventDefault()
    dispatch(logoutuser())
  }
  
  const addTodo=async(obj)=>{
    dispatch(createTodo(obj))
  }

  const match=useRouteMatch('/update/:username')
  const updateuser=match?users.find(x=>x.username===match.params.username):null

  const padding = { padding: 5 }
  return (
    <div>
      <NavigationBar handleLogout={handleLogout}/>
      <Notification/>
    <Switch>
    <Route path="/register">
       <RegistrationForm/>
    </Route>
    <Route path="/login">
      <LoginForm/>
    </Route>
    <Route path="/reset_password_form/:uid/:token">
      <ResetPasswordForm/>
    </Route>
    <Route path="/reset_password_email">
      <ResetPasswordEmail/>
    </Route>
    <Route path="/update/:id">
    {user===null?
        <LoginForm/>
      :
       <div style={{marginTop:"40px"}}>
           <UpdateProfile user={updateuser}/>
     </div>}
    </Route>
      <Route path="/">
      <div>
      {user===null?
        <LoginForm/>
      :
       <div style={{marginTop:"40px"}}>
           <TodoForm addTodo={addTodo} user={user}/>
           <TodoList/>
     </div>}
    </div>
      </Route>
    </Switch>
    </div>
  )
}

export default App