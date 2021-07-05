import React from 'react';
import { useDispatch} from 'react-redux'
import { useHistory } from 'react-router-dom'
import { setNotification } from '../reducers/notificationReducer'
import { Table, Form, Button } from 'react-bootstrap'
import registerService from '../services/register'
const RegistrationForm=(props)=>{
  const dispatch =useDispatch()
  const history = useHistory()
  const handleRegister = async (event) => {
    event.preventDefault()
    const username =event.target.Username.value
    const name = event.target.Name.value
    const phonenumber = event.target.Phonenumber.value
    const email = event.target.Email.value
    const password = event.target.Password.value
    event.target.Username.value=''
    event.target.Password.value=''
    event.target.Email.value=''
    event.target.Phonenumber.value=''
    event.target.Name.value=''
    try{
        const registered=await registerService.registeruser({username:username,name:name,phonenumber:phonenumber,email:email,password:password})
        dispatch(setNotification({text:`Registered successfully`,type:"success"},5))
    }
    catch(exception){
        dispatch(setNotification({text:`${exception.response.data.error}`,type:"danger"},5))
    }
  
    
  }
    return(
      <div class="container" style={{maxWidth:"500px",marginTop:"60px"}}>
      <h2>Register</h2>
      <Form onSubmit={handleRegister}>
        <Form.Group>
          <Form.Label>username:</Form.Label>
          <Form.Control
            id="username" type="text" name="Username" required
          />
          <Form.Label>name:</Form.Label>
          <Form.Control
            id="name" type="text" name="Name" required
          />
          <Form.Label>phonenumber:</Form.Label>
          <Form.Control
            id="phonenumber" type="text" name="Phonenumber" maxlength="10" required
          />
          <Form.Label>email:</Form.Label>
          <Form.Control
            id="email" type="email" name="Email" required
          />
          <Form.Label>password:</Form.Label>
          <Form.Control
            id="password" type="password" name="Password" required
          />
          <br/>
          <Button variant="primary" type="submit">
            Register
          </Button>
        </Form.Group>
      </Form>
    </div>
    )
}
export default RegistrationForm