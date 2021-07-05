import React from 'react';
import { useDispatch} from 'react-redux'
import { useHistory } from 'react-router-dom'
import { setNotification } from '../reducers/notificationReducer'
import { Table, Form, Button } from 'react-bootstrap'
import {
    useParams
  } from "react-router-dom"
import { initializeusers } from '../reducers/usersReducer'
import resetpasswordservice from '../services/resetpassword'
const ResetPasswordForm=(props)=>{
  const dispatch =useDispatch()
  const history = useHistory()
  const uid=useParams().uid
  const token=useParams().token
  const handleResetForm = async (event) => {
    event.preventDefault()
    const password = event.target.Password.value
    const confirmpassword=event.target.ConfirmPassword.value
    if(password!==confirmpassword)
    {
        dispatch(setNotification({text:"password mismatch",type:"danger"},5))
    }
    else{
    event.target.Password.value=''
    event.target.ConfirmPassword.value=''
    try{
        const response=await resetpasswordservice.resetpasswordform({password:password},uid,token)
        dispatch(initializeusers())
        history.push('/')
        dispatch(setNotification({text:`${response}`,type:"success"},5))
    }
    catch(exception){
        dispatch(setNotification({text:`${exception.response.data}`,type:"danger"},5))
    }
  }

    
  }
    return(
      <div class="container" style={{maxWidth:"500px",marginTop:"60px"}}>
      <h2>Update your password</h2>
      <Form onSubmit={handleResetForm}>
        <Form.Group>
          <Form.Label>password:</Form.Label>
          <Form.Control
            id="password" type="password" name="Password" required
          /><br/>
          <Form.Label>Confirm password:</Form.Label>
           <Form.Control
            id="confirmpassword" type="password" name="ConfirmPassword" required
          />
          <br/>
          <Button variant="primary" type="submit">
            Reset
          </Button>
        </Form.Group>
      </Form>
    </div>
    )
}
export default ResetPasswordForm