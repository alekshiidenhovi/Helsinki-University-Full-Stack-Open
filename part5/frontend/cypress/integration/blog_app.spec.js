/* eslint-disable quotes */
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

    const title = 'Harry Potter'
    const author = 'J. K. Rowling'
    const url = 'http://www.hp.com'
    const blog = { title, author, url }

    it('A blog can be created', function() {
      cy.contains('Create new blog').click()
      cy.get('#title').type(title)
      cy.get('#author').type(author)
      cy.get('#url').type(url)
      cy.get('#create-button').click()

      cy.contains(`A new blog "${title}" by ${author} was created`)
        .should('have.css', 'color', 'rgb(0, 143, 24)')
    })

    it('A blog can be liked', function() {
      cy.createBlog(blog)

      cy.contains(`${title} ${author}`).parent().find('button').click()
      cy.checkLikes({ url, likes: 0 })
      cy.contains(url).parent().get('.like-button').click()
      cy.checkLikes({ url, likes: 1 })
    })

    it('A blog can be removed', function() {
      cy.createBlog(blog)

      cy.contains(`${title} ${author}`).parent().find('button').click()
      cy.get('.remove-button').click()
      cy.contains(`${title} ${author}`).should('not.exist')
    })

    it.only('Blogs are sorted correctly', function() {
      const secondBlog = {
        title: 'Shawshank Redemption',
        author: 'Stephen King',
        url: 'http://www.shawshank.com'
      }

      cy.createBlog(blog)
      cy.createBlog(secondBlog)

      // Open up extra infos for blogs
      cy.contains(`${title} ${author}`).parent().find('button').click()
      cy.contains(`${secondBlog.title} ${secondBlog.author}`).parent().find('button').click()

      // Add a like for Potter
      cy.contains(url).parent().find('.like-button').click()
      cy.checkLikes({ url, likes: 1 })

      // Check the order
      cy.checkTitle({ title })

      // Add two likes for Shawshank
      cy.contains(secondBlog.url).parent().find('.like-button').click()
      cy.checkLikes({ url: secondBlog.url, likes: 1 })
      cy.contains(secondBlog.url).parent().find('.like-button').click()
      cy.checkLikes({ url: secondBlog.url, likes: 2 })

      // Check the order
      cy.checkTitle({ title: secondBlog.title })
    })
  })
})