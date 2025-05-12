

describe('User Page', () => {
    beforeEach(() => {
      cy.visit('/your-user-page-url'); 
    });
  
    it('should display loading spinner', () => {
      cy.get('[data-cy=loading]').should('be.visible');
      cy.get('[data-cy=loading] img').should('have.attr', 'src', 'https://i.pinimg.com/originals/d9/f2/15/d9f21515b1e38d83e94fdbce88f623b6.gif');
    });
  
    it('should display connection error when connection is false', () => {
      cy.get('[data-cy=connection-error]').should('be.visible');
      cy.get('[data-cy=connection-error] img').should('have.attr', 'src', '../../../../assets/error.gif');
      cy.get('[data-cy=connection-error] p').contains('Connection Problem... Please try again..!');
    });
  
    it('should display user table when there is no loading and connection is true', () => {
      // Assuming you have users data in your application, you might need to mock it or set up a testing environment
      cy.get('[data-cy=user-table]').should('be.visible');
  
      // Example: Check if the table headers are present
      cy.get('[data-cy=user-table] th').contains('Name');
      cy.get('[data-cy=user-table] th').contains('Lastname');
      cy.get('[data-cy=user-table] th').contains('Email');
      cy.get('[data-cy=user-table] th').contains('Reports');
      cy.get('[data-cy=user-table] th').contains('Delete');
  
      // Example: Check if a user row is present
      cy.get('[data-cy=user-table] tbody tr').should('have.length.greaterThan', 0);
    });
  
    it('should open the Reports modal when clicking on the Reports button', () => {
      // Assuming you have user reports data in your application, you might need to mock it or set up a testing environment
      cy.get('[data-cy=user-table] tbody tr:first-child [data-cy=reports-button]').click();
  
      // Check if the Reports modal is visible
      cy.get('[data-cy=reports-modal]').should('be.visible');
  
      // Example: Check if the modal title is present
      cy.get('[data-cy=reports-modal] .modal-title').contains('Reports');
  
      // Example: Check if a report row is present in the modal
      cy.get('[data-cy=reports-modal] tbody tr').should('have.length.greaterThan', 0);
    });
  });
  