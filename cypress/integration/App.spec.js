/* globals cy */


  describe ('Test App', () => {

    it ('launches', () => {
      cy.visit ('/');
    });
  
    it ('show name in profile page without clicking', () => {
      cy.visit ('/');
      cy.get('[data-cy=course]').should('contain', 'Name');
    });

    it('show email address in profile page after clicking', () => {
        cy.visit ('/');
        cy.get('[data-cy=profile]').click();
        cy.get('[data-cy=course]').should('contain' ,'u.northwestern.edu');
      });
    

    
  });