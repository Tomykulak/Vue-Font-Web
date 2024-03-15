describe('template spec', () => {
  iit("should login", () =>{
    cy.visit("http://localhost:5173");

    cy.get('#login').should('be.visible');
    cy.get('#login').click();

    cy.get('#register').click();
    cy.get('#email').type('bomba@bomba.cz');
    cy.get('#password').type('bomba');
    cy.get("#register").click();
  })
})
