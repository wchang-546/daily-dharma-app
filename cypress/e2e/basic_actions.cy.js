describe('basic site actions', () => {
    beforeEach(() => {
        cy.visit('localhost:3000')
    })
    
    it('Navbar buttons test', () => {
        cy.contains('Journal').click()

        cy.contains('Mood Tracking').click()
        
        cy.contains('Meditate').click()
    
    })

})