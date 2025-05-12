describe('Login valid scenario', () => {
  it('should visit the login page', () => {
    cy.visit('/login');
  });

  it('should have a form with email and password fields', () => {
    cy.get('form').should('exist');
    cy.get('input[name="email"]').should('exist');
    cy.get('input[name="pwd"]').should('exist');
  });

  it('should log in with valid credentials', () => {
    cy.get('input[name="email"]').type('yosMeddah@yahoo.fr');
    cy.get('input[name="pwd"]').type('Hel_Mes78V*z');
    cy.get('input[type="submit"]').click();
    cy.url().should('include', '/matching');
  });
  // it('should display an error message for invalid credentials', () => {
  //   cy.get('input[name="email"]').type('invalid-email');
  //   cy.get('input[name="pwd"]').type('pass');
  //   cy.get('input[type="submit"]').click();
  //   cy.contains('Invalid email address.').should('be.visible'); 
  //   cy.contains('Email does not match the required pattern.').should('be.visible'); 
  //   cy.contains('Password must be at least 8 characters long.').should('be.visible'); 
  // });
  // it('should navigate to the registration page when clicking on signup link', () => {
  //   cy.contains('Don\'t have an account?').click();
  //   cy.url().should('include', '/register'); 
  // });
});
