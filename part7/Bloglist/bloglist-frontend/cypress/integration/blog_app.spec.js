describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Matti Luukkainen',
      username: 'mluukkai',
      password: 'salainen',
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.contains('Log in to application')
  })
  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()

      cy.contains('Matti Luukkainen logged in')
    })

    it('fails with wrong credentials', function () {
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()

      cy.contains('wrong username or password')
      cy.get('.error').should('have.css', 'color', 'rgb(255, 0, 0)')
    })

    describe('When logged in', function () {
      beforeEach(function () {
        cy.get('#username').type('mluukkai')
        cy.get('#password').type('salainen')
        cy.get('#login-button').click()

        cy.contains('Matti Luukkainen logged in')
      })
      it('A blog can be created', function () {
        cy.get('#open-form-button').click()
        cy.get('#title').type('Riches')
        cy.get('#author').type('Richard')
        cy.get('#url').type('www.richard.com')
        cy.get('#create-button').click()

        cy.contains('Riches Richard')
      })
      describe('After creating a blog', function () {
        beforeEach(function () {
          cy.get('#open-form-button').click()
          cy.get('#title').type('Riches')
          cy.get('#author').type('Richard')
          cy.get('#url').type('www.richard.com')
          cy.get('#create-button').click()
          cy.get('#view-button').click()
        })
        it('User can like a blog', function () {
          cy.get('#like-button').click()
          cy.contains('likes 1')
        })
        it('User can remove own blog', function () {
          cy.get('#remove-button').click()
          cy.get('#togglableContent').should('not.exist')
        })
        it('Blogs ordered according to descending likes', function () {
          cy.get('#like-button').click()

          cy.get('#open-form-button').click()
          cy.get('#title').type('Lowest')
          cy.get('#author').type('Richard')
          cy.get('#url').type('www.lowest.com')
          cy.get('#create-button').click()
          cy.contains('Lowest Richard').parent().find('#view-button').click()

          cy.get('#open-form-button').click()
          cy.get('#title').type('Highest')
          cy.get('#author').type('Richard')
          cy.get('#url').type('www.highest.com')
          cy.get('#create-button').click()
          cy.contains('Highest Richard').parent().find('#view-button').click()
          cy.contains('Highest Richard').parent().find('#like-button').click()
          cy.contains('Highest Richard').parent().find('#like-button').click()

          cy.get('.togglableContent').eq(0).should('contain', '2')
          cy.get('.togglableContent').eq(1).should('contain', '1')
          cy.get('.togglableContent').eq(2).should('contain', '0')
        })
      })
    })
  })
})
