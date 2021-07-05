import React from 'react';
import { loginuser } from '../reducers/loginReducer'
import { useDispatch} from 'react-redux'
import { useHistory } from 'react-router-dom'
import { Table, Form, Button } from 'react-bootstrap'
import {
  Link
} from "react-router-dom"
const LoginForm=(props)=>{
  const dispatch =useDispatch()
  const history = useHistory()
  const handleLogin = async (event) => {
    event.preventDefault()
    const username =event.target.Username.value
    const password = event.target.Password.value
    event.target.Username.value=''
    event.target.Password.value=''
    dispatch(loginuser(username, password,history))
  }
    return(
      <div className="container" style={{maxWidth:"500px",marginTop:"60px"}}>
      <h2>login</h2>
      <Form onSubmit={handleLogin}>
        <Form.Group>
          <Form.Label>username:</Form.Label>
          <Form.Control
            id="username" type="text" name="Username" required
          />
          <Form.Label>password:</Form.Label>
          <Form.Control
            id="password" type="password" name="Password" required
          />
          <Link  to="/reset_password_email">forgotpassword?</Link>
          <br/><br/>
          <Button variant="primary" type="submit">
            login
          </Button>
        </Form.Group>
      </Form>
    </div>
    )
}
export default LoginForm