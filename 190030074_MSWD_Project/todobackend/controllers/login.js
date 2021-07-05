const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const usermodel = require('../models/user')

loginRouter.post('/',async(request, response)=>{
    const body=request.body
    const user=await usermodel.findOne({username:body.username})
    const passwordcorrect= user===null? false:await bcrypt.compare(body.password,user.passwordHash)
    if(!(user && passwordcorrect))
    {
        return response.status(401).json({
            error: 'invalid username or password'
          })
    }
    const createusertoken={
        username: user.username,
        id: user._id,
    }
    const token=jwt.sign(createusertoken,process.env.SECRET,{ expiresIn: 60*60 })
    
  response.status(200).send({ token, username: user.username, name: user.name })

})

module.exports =loginRouter