const router = require('express').Router()
const blogmodel=require('../models/todolist')
const usermodel = require('../models/user')

router.post('/reset', async (request, response) => {
  await blogmodel.deleteMany({})
  await usermodel.deleteMany({})

  response.status(204).end()
})

module.exports = router