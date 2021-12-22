describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Aleks Hiidenhovi',
      username: 'haleks',
      password: 'salainen'
    }
    cy.request('POST', 'http://localhost:3003/api/users', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('Log in to application')
    cy.contains('username')
    cy.contains('password')
    cy.contains('login')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').clear().type('haleks')
      cy.get('#password').clear().type('salainen')
      cy.get('#login-button').click()
      cy.contains('Aleks Hiidenhovi logged in')
      cy.contains('Create new blog')
    })

    it('fails with wrong credentials', function() {
      // Does not contained logged in -text
      cy.get('#username').clear().type('haleks')
      cy.get('#password').clear().type('wrong')
      cy.get('#login-button').click()
      cy.contains('Aleks Hiidenhovi logged in').should('not.exist')

      // Checks for the red error message
      cy.contains('Wrong username or password').should('have.css', 'color', 'rgb(220, 4, 4)')

    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'haleks', password: 'salainen' })
    })

    it('A blog can be created', function() {
      cy.contains('Create new blog').click()
      cy.get('#title').type('Harry Potter')
      cy.get('#author').type('J. K. Rowling')
      cy.get('#url').type('http://www.hp.com')
      cy.get('#create-button').click()

      cy.contains('A new blog "Harry Potter" by J. K. Rowling was created')
        .should('have.css', 'color', 'rgb(0, 143, 24)')
    })

    it('A blog can be liked', function() {
      cy.createBlog({
        title: 'Harry Potter',
        author: 'J. K. Rowling',
        url: 'http://www.hp.com'
      })

      cy.contains('Harry Potter J. K. Rowling').parent().find('button').click()
      cy.checkLikes({ url: 'http://www.hp.com', likes: 0 })
      cy.contains('http://www.hp.com').parent().get('.like-button').click()
      cy.checkLikes({ url: 'http://www.hp.com', likes: 1 })
    })
  })
})