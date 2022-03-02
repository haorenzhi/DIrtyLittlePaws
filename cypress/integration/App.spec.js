/* globals cy */


  describe ('Test App', () => {

    it ('launches', () => {
      cy.visit ('/');
    });
  
    it ('opens with Fall CS courses', () => {
      cy.visit ('/');
      cy.get('[data-cy=course]').should('contain', 'Ruiqi Pan');
    });
  });