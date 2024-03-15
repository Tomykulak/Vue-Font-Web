describe('template spec', () => {
  it('passes', () => {
    cy.visit("http://localhost:5173");
    it("should login", () =>{
      cy.visit("http://localhost:5173");

      cy.get('#login').should('be.visible');
      cy.get('#login').click();
      cy.get('#email').type('bomba@bomba.cz');
      cy.get('#password').type('bomba');
      cy.get('#login-button').click();

      cy.get('#favoriteFonts').click();
      cy.visit("http://localhost:5173/favoriteFonts");
  })
})
