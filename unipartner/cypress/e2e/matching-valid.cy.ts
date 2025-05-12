describe('Matching', () => {
    it('should visit the Matching page', () => {
      cy.visit('/matching');
    });
  
    it('should display the Matching header', () => {
      cy.get('header h1').contains('Matching').should('be.visible');
    });
  
    it('should display user cards when users are available', () => {
      const users = [
        { name: 'xxyyzz', lastname: "xxyyzz", gender: 'male', photo: 'https://media.istockphoto.com/id/1011792072/photo/smiling-young-mixed-race-businesswoman-looking-away.jpg?s=612x612&w=0&k=20&c=TVcVAcA27Xt9h3WASzOXLCTNmdZU9EMce4t7SU0G0ng=' },
      ];
  
      cy.window().its('appComponentRef').invoke('updateUsers', users);
  
      cy.get('.users').should('be.visible');
      cy.get('.users .swipe-active').should('have.length', users.length);
    });
  
    it('should display an empty template when no users are available', () => {
      cy.window().its('appComponentRef').invoke('updateUsers', []);

      cy.get('.emptyTemplate').should('be.visible');
      cy.get('.checkmark-icon').should('be.visible');
      cy.get('.emptyTemplate p').contains('All Swiped!').should('be.visible');
    });
  
  });
  