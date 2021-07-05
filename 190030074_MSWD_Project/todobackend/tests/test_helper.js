const todomodel=require('../models/todolist')
const usermodel=require('../models/user')
const bcrypt = require('bcrypt')
const initialtodo=[
    {
        content: "React patterns",
        important: false,
        
      },
      {
        content: "Go To Statement Considered Harmful",
        important: false, 
      },
      {
        content: "Canonical string reduction",
        important: false,
      },
      {
        content: "First class tests",
        important: false,
        
      },
      {
        content: "TDD harms architecture",
        important: false,
        
      },
      {
        content: "Type wars",
        important: false,
      }  
]

const todoInDb = async () => {
    const blogs = await todomodel.find({})
    return blogs.map(blog => blog.toJSON())
  }

const usersInDb = async () => {
  const users=await usermodel.find({})
  return users.map(user => user.toJSON())
}

module.exports={
    initialtodo,
    todoInDb,
    usersInDb
}