describe('Login Admin scenario', () => {
    it('should visit the login page', () => {
      cy.visit('/admin/login');
    });
  
    // it('should display login form', () => {
    //   cy.get('[data-cy=login-form]').should('be.visible');
    //   cy.get('[data-cy=login-form] h2').contains('Hello Admin');
    // });
  
    // it('should show error messages for invalid inputs', () => {
    //   cy.get('input[name="email"]').type('invalidemail');
    //   cy.get('input[name="pwd"]').type('pwd'); 
  
    //   cy.get('input[type="submit"]').click();
  
    
    //   cy.contains('Invalid email address.');
    //   cy.contains('Password must be at least 8 characters long.');
    //   cy.get('input[name="email"]').type('');
    // cy.get('input[name="pwd"]').type('');
    // });
  
    it('should submit login form with valid inputs', () => {
      const validEmail = 'yosr1@gmail.com';
      const validPassword = 'yosrMeddah1';
  
      cy.get('input[name="email"]').type(validEmail);
      cy.get('input[name="pwd"]').type(validPassword);
  
      cy.get('input[type="submit"]').click();
  
      cy.url().should('include', '/dashboard'); 
    });
  });
  