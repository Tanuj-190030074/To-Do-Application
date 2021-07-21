describe('To Do app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user={
      username: 'tanuj', name:'tanuj',phonenumber:"4355334535",email: 'tanuj@gmail.com',password:'tanuj123'
    }
    cy.request('POST', 'http://localhost:3001/api/users',user)
    cy.visit('http://localhost:3000')
  })

    it('Login form is shown', function() {
      cy.contains('login')
    })
    describe('Login',()=>{
      it('user can login', function () {
        cy.get('#username').type('tanuj')
        cy.get('#password').type('tanuj123')
        cy.get('#loginbutton').click()
        cy.contains('tanuj logged in')
      })
  
     it('login fails with wrong password', function() {
        cy.get('#username').type('tanuj')
        cy.get('#password').type('wrong')
        cy.get('#loginbutton').click()
        cy.contains('wrong username or password')
       cy.get('html').should('not.contain', 'tanuj logged in')
  
      })
    })

    describe('when logged in', function() {
      beforeEach(function() {
        cy.get('#username').type('tanuj')
        cy.get('#password').type('tanuj123')
        cy.get('#loginbutton').click()
      })
      it('a new blog can be created', function() {
        cy.get('#content').type('test todo content')
        cy.get('#addbutton').click()
        cy.contains('a new todo test todo content added')
        cy.contains('test todo content')
      })
     
    })
    /*

    describe('deleting a blog',()=>{
      beforeEach(()=>{
        cy.login({username:'tanuj',password:'tanuj123'})
        cy.createBlog({title:"test1",author:"test1author",url:"test1url"})
        cy.createBlog({title:"test2",author:"test2author",url:"test2url"})
        cy.createBlog({title:"test3",author:"test3author",url:"test3url"})
        const user={
          username: 'tanuj2', password:'tanuj123'
        }
        cy.request('POST', 'http://localhost:3001/api/users',user)
      })
      it('the user who created a blog can delete it',()=>{
          cy.contains('test1').contains('view').click()
          cy.contains('remove').click()
          cy.get('html').should('not.contain','test1')
      })
      it('the other user cannot delete the blog of other ones',()=>{
        cy.contains('logout').click()
        cy.get('#username').type('tanuj2')
        cy.get('#password').type('tanuj123')
        cy.contains('login').click()
        cy.contains('test1').contains('view').click().get('#removebutton').should('not.exist')
    })
    })

    describe('blogs arranged according to likes',() =>{
      beforeEach(()=>{
        cy.login({username:'tanuj',password:'tanuj123'})
        cy.createBlog({title:"test1",author:"test1author",url:"test1url"})
        cy.createBlog({title:"test2",author:"test2author",url:"test2url"})
        cy.createBlog({title:"test3",author:"test3author",url:"test3url"})
      })
      it('checking blogs arranged according to likes',()=>{
          cy.contains('test1').contains('view').click().get('#likebutton').click()
          cy.wait(200)
          cy.get('#likebutton').click()
          cy.wait(200)
          cy.get('#likebutton').click()
          cy.wait(200)
          cy.contains('test3').contains('view').click()
          cy.wait(200)
          cy.root().find('.invisibleatfirst').last().find('.likebutton').click()
          cy.root().find('.invisibleatfirst').first().find('.bloglikes').contains('3')
          cy.wait(200)
      })
    })*/
  })

