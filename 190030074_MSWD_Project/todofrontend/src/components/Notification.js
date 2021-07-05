import React from 'react'
import {useSelector } from 'react-redux'
import {Alert} from 'react-bootstrap'
const Notification = () => {
    const errorMessage=useSelector(state=>state.notification)
    if (errorMessage === null) {
      return null
    }
     
      return (
        <Alert variant={errorMessage.type}>
        {errorMessage.text}
        </Alert>
      )
     
  }

  export default Notification
  