const bcrypt = require('bcrypt')
const { response } = require('express')
const usersRouter = require('express').Router()
const usermodel = require('../models/user')
var nodemailer = require('nodemailer');

usersRouter.post('/', async (request, response) => {
  const body = request.body
  if(body.password.length<6)
  {
      return response.status(400).json({ error: 'password should be at least 6 characters' })
  }
  if(body.phonenumber.length<10)
  {
    return response.status(400).json({ error: 'phonenumber should be 10 digits' })
  }
  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)

  const user = new usermodel({
    username: body.username,
    name: body.name,
    phonenumber:body.phonenumber,
    email:body.email,
    passwordHash,
  })

  const savedUser = await user.save()

  response.json(savedUser)
})

usersRouter.put('/:id',async(request,response)=>{
  const body=request.body
  const newobj={
    username:body.username,
    name:body.name,
    phonenumber:body.phonenumber,
    email:body.email
  }
  const updatedone=await usermodel.findByIdAndUpdate(request.params.id,newobj,{new:true})
  await updatedone.populate('todolist', {content:1,priority:1}).execPopulate()
  response.json(updatedone)
})



usersRouter.get('/',async(request,response)=>{
  const users=await usermodel.find({}).populate('todolist',{content:1,priority:1})
  response.json(users)
})

module.exports = usersRouter