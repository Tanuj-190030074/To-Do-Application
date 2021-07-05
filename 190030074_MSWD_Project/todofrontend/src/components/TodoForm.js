import React from 'react'
import PropTypes from 'prop-types'
import { Form, Button,Row,Col } from 'react-bootstrap'
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import blue from '@material-ui/core/colors/blue';
import {setFilter} from '../reducers/filterReducer'
import { useDispatch } from 'react-redux'
const TodoForm=(props)=>{

  const dispatch=useDispatch()
    const handleTodo=async(event)=>{
        event.preventDefault()
        const content=event.target.Content.value
        event.target.Content.value=''
         props.addTodo({content:content})
    }
    const primary = blue[500];

    return(
    <div style={{marginLeft:"20%"}} className="container">
       <h2>Add your todo's here</h2>
       <Form onSubmit={handleTodo}>
        <Form.Row>
             <Col lg={5}>
          <Form.Label>Content:</Form.Label>
          <Form.Control
            id="content" type="text" name="Content" required
          />
          </Col>
          <Col lg={1}>
          <Fab  aria-label="add" type="submit" size="medium" style={{marginTop:"20px",outline:0,backgroundColor:"#43a047",color:"white"}}>
           <AddIcon />
           </Fab>
          </Col>
          <Col>
          <Form.Label>Filter:</Form.Label><br/>
          <Form.Control
             as="select"
             className="mr-sm-2"
             id="inlineFormCustomSelect"
             style={{width:"30%"}}
             onChange={(event)=>dispatch(setFilter(event.target.value))}
             custom
          >
        <option value="all">All</option>
        <option value="important">Important</option>
        <option value="notimportant">Not Important</option>
      </Form.Control>
          </Col>
        </Form.Row>
      </Form>
      <br/>
    </div>
    )
}


export default TodoForm