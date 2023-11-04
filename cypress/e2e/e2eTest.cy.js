describe('UI / Site routing tests', () => {
  //Before each test, we visit the site. 
  beforeEach(() => {
      cy.visit('localhost:3000')
  })
  //Tests that the Journal navbar and page is functional.
  it('Journal Test', () => {
      cy.contains('Journal').click()
      cy.url().should('include', '/journal')
  })
  //Tests that the Mood Tracking navbar and page is functional.
  it('Mood Tracking Test', () => {
      cy.contains('Mood Tracking').click()
      cy.url().should('include', '/mood')
  })
  //Tests that the Meditate navbar and page interactivity is functional.
  it('Meditate Test', () => {
      cy.contains('Meditate').click()
      cy.url().should('include', '/meditate')
      cy.get('button').click({ multiple: true})
  })
})

describe('Login authentication test', () => {
 it('Logs in with user credentials', () => {
    cy.login()
    cy.get('button').should('contain', "Logout")
    cy.get('div').should('contain', 'You are logged in!')
  })

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
  it('Logout and clear cookies', () => {
    cy.login()
    cy.get('button').should('contain', 'Logout').click()
    cy.getCookie('user_id').should('not.exist')
  })
})

describe('API tests', () => {
  it("Gets a list of journal prompts", () => {
    cy.request("GET", "127.0.0.1:5555/prompts").then((resp) => {
      expect(resp.status).to.eq(200)
      expect(resp.body).length.to.be.greaterThan(1)
    })
  })

  it('Gets a list of the users journal prompts.', () => {
    cy.request("GET", "127.0.0.1:5555/journal_entries").then((resp) => {
      expect(resp.status).to.eq(200)
      expect(resp.body).length.to.be.greaterThan(1)
    })
  })
  it('Gets a list of the users mood entries.', () => {
    cy.request("GET", "127.0.0.1:5555/calendar_entries").then((resp) => {
      expect(resp.status).to.eq(200)
      expect(resp.body).length.to.be.greaterThan(1)
    })
  })

})

 