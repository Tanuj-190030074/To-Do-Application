import React from 'react';
import resetpasswordservice from '../services/resetpassword'
import { useDispatch} from 'react-redux'
import { useHistory } from 'react-router-dom'
import {useState} from 'react'
import {setNotification} from '../reducers/notificationReducer'
import { Table, Form, Button ,Spinner} from 'react-bootstrap'
const ResetPasswordEmail=(props)=>{
  const dispatch =useDispatch()
  const [sent,setSent]=useState(false)
  const [submitted,setSubmitted]=useState(false)
  const history = useHistory()

  const handleReset = async (event) => {
    event.preventDefault()
    setSubmitted(true)
    const email =event.target.Email.value
    try{
       const response=await resetpasswordservice.resetpasswordmail({email:email})
       dispatch(setNotification({text:`${response}`,type:"success"},5))
	   event.target.Email.value=''
       setSent(true)
    }
    catch(exception){
      dispatch(setNotification({text:`${exception.response.data}`,type:"danger"},5))
      setSubmitted(false)
    }
  }
    return(
      <div className="container" style={{maxWidth:"500px",marginTop:"60px"}}>
      <h2>Reset Password</h2>
      <Form onSubmit={handleReset}>
        {sent?<h1>email sent successfully</h1>:
        <Form.Group>
          <Form.Label>Email:</Form.Label>
          <Form.Control
            id="email" type="text" name="Email" required
          /><br/> 
          {!submitted?<Button variant="primary" type="submit">
            submit
          </Button>:<Button variant="primary" disabled>
         <Spinner
           as="span"
          animation="grow"
          size="sm"
          role="status"
          aria-hidden="true"
        />
        Submitting...
          </Button>}
        </Form.Group>
        }
      </Form>
    </div>
    )
}
export default ResetPasswordEmail