import React from 'react';
import { useState } from 'react';
import { useDispatch} from 'react-redux'
import { useHistory } from 'react-router-dom'
import { setNotification } from '../reducers/notificationReducer'
import { Table, Form, Button } from 'react-bootstrap'
import {updateuser} from '../reducers/loginReducer'
import userService from '../services/users'
const UpdateProfile=({user})=>{
  if(!user){
    return null
}
   const [username,setUsername]=useState(user.username)
   const [name,setName]=useState(user.name)
   const [phonenumber,setPhonenumber]=useState(user.phonenumber)
   const [email,setEmail]=useState(user.email)
  const dispatch =useDispatch()
  const history = useHistory()
  const handleProfile = async (event) => {
    event.preventDefault()
        dispatch(updateuser({...user,username:username,name:name,phonenumber:phonenumber,email:email},history))    
  }
    return(
      <div class="container" style={{maxWidth:"500px",marginTop:"60px"}}>
      <h2>Update profile</h2>
      <Form onSubmit={handleProfile}>
        <Form.Group>
          <Form.Label>username:</Form.Label>
          <Form.Control
            id="username" type="text" name="Username" onChange={(event)=>setUsername(event.target.value)} value={username}
          />
          <Form.Label>name:</Form.Label>
          <Form.Control
            id="name" type="text" name="Name" onChange={(event)=>setName(event.target.value)} value={name}
          />
          <Form.Label>phonenumber:</Form.Label>
          <Form.Control
            id="phonenumber" type="text" name="Phonenumber" onChange={(event)=>setPhonenumber(event.target.value)} value={phonenumber}
          />
          <Form.Label>email:</Form.Label>
          <Form.Control
            id="email" type="email" name="Email" onChange={(event)=>setEmail(event.target.value)} value={email}
          />
          <br/>
          <Button variant="primary" type="submit">
            update
          </Button>
        </Form.Group>
      </Form>
    </div>
    )
}
export default UpdateProfile