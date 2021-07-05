const bcrypt = require('bcrypt')
const helper = require('./test_helper')
const mongoose = require('mongoose')
const app=require('../app')
const supertest = require('supertest')
const api=supertest(app)
const User = require('../models/user')

describe('when there is initially one user in db', () => {
  beforeEach(async() => {
    await User.deleteMany({})
    const passwordHash = await bcrypt.hash('root', 10)
    const user = new User({ username: 'root',name:'root',phonenumber:"5478458758",email:"sample2@gmail.com", passwordHash:passwordHash })
    await user.save()
  })
  
    test('creation succeeds with a fresh username', async () => {
      const usersAtStart = await helper.usersInDb()
  
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
        .expect(200)
        .expect('Content-Type', /application\/json/)
  
      const usersAtEnd = await helper.usersInDb()
      expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)
  
      const usernames = usersAtEnd.map(u => u.username)
      expect(usernames).toContain(newUser.username)
    })

    test('creation fails with proper statuscode and message if username already taken', async () => {
        const usersAtStart = await helper.usersInDb()
    
        const newUser = {
          username: 'root',
          name: 'Superuser',
          phonenumber:"3442243443",
          email:"sample5@example.com",
          password: 'salainen',
        }
    
        const result = await api
          .post('/api/users')
          .send(newUser)
          .expect(400)
          .expect('Content-Type', /application\/json/)
    
        expect(result.body.error).toContain('`username` to be unique')
    
        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length)
      })

      test('creation fails with proper statuscode and message if username less than 3 characters', async () => {
        const usersAtStart = await helper.usersInDb()
    
        const newUser = {
          username: 'ro',
          name: 'Superuser',
          phonenumber:"3442243443",
          email:"sample5@example.com",
          password: 'salainen',
        }
    
        const result = await api
          .post('/api/users')
          .send(newUser)
          .expect(400)
          .expect('Content-Type', /application\/json/)
        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length)
      })

      test('creation fails with proper statuscode and message if password less than 3 characters', async () => {
        const usersAtStart = await helper.usersInDb()
    
        const newUser = {
          username: 'root',
          name: 'Superuser',
          phonenumber:"3442243443",
          email:"sample5@example.com",
          password: 'sa',
        }
    
        const result = await api
          .post('/api/users')
          .send(newUser)
          .expect(400)
          .expect('Content-Type', /application\/json/)
          expect(result.body.error).toContain("password should be at least 6 characters")
        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length)
      })
  })

afterAll(async()=>{
    mongoose.connection.close()
})