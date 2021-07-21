const mongoose = require('mongoose')
const app=require('../app')
const helper = require('./test_helper')
const todomodel=require('../models/todolist')
const usermodel = require('../models/user')
const supertest = require('supertest')
const api=supertest(app)

beforeEach(async () => {
  await todomodel.deleteMany({})
  await usermodel.deleteMany({})
  for(let blog of helper.initialtodo)
  {
      const obj=new todomodel(blog)
      await obj.save()
  }
})

describe('test for getting data from db',() => {

 test('there are n blogs', async () => {
     const response = await api.get('/api/todolist')
     expect(response.body).toHaveLength(helper.initialtodo.length)
 })
 test('the first blog is on react patterns', async () => {
     const response = await api.get('/api/todolist')   
     expect(response.body[0].content).toBe("React patterns",)
 })
})

test('The unique identifier property of the blog posts is by default _id', async () => {
    const blogs = await todomodel.find({})
    expect(blogs[0].id).toBeDefined()
  })


describe('tests for posting data to db',() => {
  let headers

  beforeEach(async () => {
    const newUser = {
      username: 'tanuj',
      name: 'tanuj',
      phonenumber:"3442243443",
      email:"sample3@gmail.com",
      password: 'tanuj123',
    }
  
    await api
      .post('/api/users')
      .send(newUser)

    const result = await api
      .post('/api/login')
      .send(newUser)

    headers = {
      'Authorization': `bearer ${result.body.token}`
    }
  })
  test('verify that the total number of todos in the system is increased by one',async () => {
    const newblog={
    
     content: "React patterns",
        important: false,
    }
    await api.post('/api/todolist').send(newblog).set(headers).expect(201).expect('Content-Type', /application\/json/)
    const endblogs=await helper.todoInDb()
    expect(endblogs).toHaveLength(helper.initialtodo.length+1)
 
    const contents = endblogs.map(x => x.content)
    expect(contents).toContain("React patterns")
 })
})

describe("tests for error handling if any field is missing", () => {
  let headers

  beforeEach(async () => {
    const newUser = {
      username: 'tanuj',
      name: 'tanuj',
      phonenumber:"3442243443",
        email:"sample3@gmail.com",
      password: 'tanuj123',
    }

    await api
      .post('/api/users')
      .send(newUser)

    const result = await api
      .post('/api/login')
      .send(newUser)

    headers = {
      'Authorization': `bearer ${result.body.token}`
    }
  })
 

  test('todo with no content causes error', async () => {

    const sendingblog={
        important: false
    }

    await api
      .post('/api/todolist')
      .send(sendingblog).set(headers)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const blogsInDb = await helper.todoInDb()
    expect(blogsInDb).toHaveLength(helper.initialtodo.length)
  })

  
})

describe('viewing a specific todo', () => {
  test('succeeds with a valid id', async () => {
    const blogsatfirst = await helper.todoInDb()

    const blogatfirst=blogsatfirst[0]

    const resultBlog = await api
      .get(`/api/todolist/${blogatfirst.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)
      
    const processedBlogToView = JSON.parse(JSON.stringify(blogatfirst))

    expect(resultBlog.body).toEqual(processedBlogToView)
  })

  

  test('fails with statuscode 400 id is invalid', async () => {
    const invalidId = '5a3d5da59070081a'

    await api
      .get(`/api/todolist/${invalidId}`)
      .expect(400)
  })
})

describe('deletion of a todo', () => {
  let headers

  beforeEach(async () => {
    const newUser = {
      username: 'tanuj',
      name: 'tanuj',
      phonenumber:"3442243443",
        email:"sample3@gmail.com",
      password: 'tanuj123',
    }

    await api
      .post('/api/users')
      .send(newUser)

    const result = await api
      .post('/api/login')
      .send(newUser)

    headers = {
      'Authorization': `bearer ${result.body.token}`
    }
  })
  
  test('fails with statuscode 404 id is invalid', async () => {
    const invalidId = '5a3d5da59070081a82a'

    await api
      .delete(`/api/todolist/${invalidId}`).set(headers)
      .expect(400)
  })
})



afterAll(()=>{
    mongoose.connection.close()
})