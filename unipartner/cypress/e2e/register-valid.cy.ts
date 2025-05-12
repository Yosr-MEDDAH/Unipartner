describe('Register valid scenario', () => {
    it('should visit the register page', () => {
      cy.visit('/register');
    });
  
    it('should successfully complete step 1 of the signup form', () => {
      cy.get('input[name=name]').type('Asma');
      cy.get('input[name=lastname]').type('BenAhmed');
      cy.get('input[name=email]').type('asma@gmail.com');
      cy.get('input[name=pwd]').type('asmaA7123');
      cy.get('input[name=photo]').type('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRcSSgBmnBcCa7g5aZjn9sIQf7mZd-EuknoA&usqp=CAU');
  
      cy.get('input[type=button]').click();
      });
  
    it('should successfully complete step 2 of the signup form', () => {      
      cy.get('.gender-button.female').click(); 

 cy.get('.skills-button').contains('Spring Boot').click(); 
 cy.get('.skills-button').contains('Angular').click(); 
 cy.get('.skills-button').contains('MongoDB').click(); 


 cy.get('.interests-button').contains('Cats').click(); 
 cy.get('.interests-button').contains('Dogs').click(); 


 cy.get('.red-flags-button').contains('Drinking').click(); 
 cy.get('.red-flags-button').contains('Morning Person').click(); 


 cy.get('input[type=submit]').click()

  
    });
  
  });
  