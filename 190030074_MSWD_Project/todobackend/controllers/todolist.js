const todolistRouter=require('express').Router()
const jwt = require('jsonwebtoken')
const todolistmodel=require('../models/todolist')
const usermodel=require('../models/user')
require('express-async-errors')

todolistRouter.get('/',async(request, response)=>{
    const list=await todolistmodel.find({}).populate('user',{username:1,name:1})
    response.json(list)
})

todolistRouter.get('/:id',async(request,response)=>{
    const x= await todolistmodel.findById(request.params.id).populate('user',{username:1,name:1})
    response.json(x)
})

todolistRouter.post('/',async(request,response)=>{
    const body=request.body
    const token = request.token
  const decodedToken = jwt.verify(token, process.env.SECRET)
  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
    const user=await usermodel.findById(decodedToken.id)
    const todoobj={
        content:body.content,
        important:false,
        completed:false,
        user:user._id
    }
    const todo=new todolistmodel(todoobj)
    const x= await todo.save()
    await x.populate('user', { username: 1, name: 1, id: 1 }).execPopulate()
    user.todolist=user.todolist.concat(x.id)
    await user.save()
    response.status(201).json(x)
})

todolistRouter.delete('/:id',async(request,response)=>{
    const token = request.token
     const decodedToken = jwt.verify(token, process.env.SECRET)
     const todoobj=await todolistmodel.findById(request.params.id)
     const user=await usermodel.findById(decodedToken.id)
     if(todoobj.user.toString()===user.id.toString())
     { 
    await todolistmodel.findByIdAndRemove(request.params.id)
    response.status(204).end()
     }
     else{
         response.status(401).json({error:"Unauthorized"})
     }
})

todolistRouter.put('/:id',async(request,response)=>{
    const token = request.token
    const body=request.body
     const decodedToken = jwt.verify(token, process.env.SECRET)
     const todoobj=await todolistmodel.findById(request.params.id)
     const user=await usermodel.findById(decodedToken.id)
     if(todoobj.user.toString()===user.id.toString())
     {
        const newobj={
            content:body.content,
            important:body.important,
            completed:body.completed,
            user:user.id
        }
        const x=await todolistmodel.findByIdAndUpdate(request.params.id,newobj,{new:true})
        await x.populate('user', { username: 1, name: 1, id: 1 }).execPopulate()
        response.json(x)
     }
     else{
         response.status(401).json({error:"Unauthorized"})
     }
})

module.exports=todolistRouter