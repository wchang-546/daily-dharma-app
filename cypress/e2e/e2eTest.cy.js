describe('UI / Site routing tests', () => {
  beforeEach(() => {
      cy.visit('localhost:3000')
  })
  it('Journal Function Test', () => {
      //Tests page routing. 
      cy.contains('Journal').click()
      cy.url().should('include', '/journal')
      //Tests API functionality of journal prompts. 
      cy.request("GET", "127.0.0.1:5555/prompts").then((resp) => {
        expect(resp.status).to.eq(200)
        expect(resp.body).length.to.be.greaterThan(1)
      })
      //Tests API functionality of journal entries. 
      cy.request("GET", "127.0.0.1:5555/journal_entries").then((resp) => {
        expect(resp.status).to.eq(200)
        expect(resp.body).length.to.be.greaterThan(1)
      })
  })
  it('Mood Tracking Function Test', () => {
      //Tests page routing. 
      cy.contains('Mood Tracking').click()
      cy.url().should('include', '/mood')
      //Tests API functionality. 
      cy.request("GET", "127.0.0.1:5555/calendar_entries").then((resp) => {
        expect(resp.status).to.eq(200)
        expect(resp.body).length.to.be.greaterThan(1)
      })
  
  })
  //Tests that the Meditate routing and page is functional.
  it('Meditate Function Test', () => {
      cy.contains('Meditate').click()
      cy.url().should('include', '/meditate')
      cy.get('button').click({ multiple: true})
  })
})

describe('Login authentication test', () => {
  //Logs user in and checks for session cookie, logout UI. 
 it('Logs in with user credentials', () => {
    cy.login()
    cy.get('button').should('contain', "Logout")
    cy.get('div').should('contain', 'You are logged in!')
    cy.getCookie('user_id').should('exist')
  })

  //Attempts to log in with nonexistent credentials and checks for unauthenticated code. 
  it('Incorrect login credentials are rejected', () => {
    cy.request({method:'POST', url: '127.0.0.1:5555/login', body:{
      username: 'ppimentel',
      password: 'sdfo342@$'
    }, failOnStatusCode:false}).then((resp) => {
      expect(resp.status).to.eq(401)
    })
  })
})

describe('Logout test', () => {
  //Logs out and checks if cookie was cleared. 
  it('Logout and clear cookies', () => {
    cy.login()
    cy.get('button').should('contain', 'Logout').click()
    cy.getCookie('user_id').should('not.exist')
  })
})

