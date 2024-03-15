describe('template spec', () => {
  it('Does not do much!', () => {
    expect(true).to.equal(true)
  })
  it("should login", () =>{
    cy.visit("http://localhost:5173");

    cy.get('#login').should('be.visible');
    cy.get('#login').click();
    cy.get('#email').type('bomba@bomba.cz');
    cy.get('#password').type('bomba');
    cy.get('#login-button').click();
  })
})
