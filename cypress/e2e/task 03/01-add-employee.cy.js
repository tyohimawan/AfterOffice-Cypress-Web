describe('Add Employee Flow', () => {
  it('Positive Case - Add Employee and Create Account', () => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    cy.get('input[name="username"]').type('Admin');
    cy.get('input[name="password"]').type('admin123');
    cy.get('button[type="submit"]').click();
    cy.url().should('include', '/dashboard');

    // Add employee
    cy.contains('PIM').click();
    cy.contains('Add Employee').click();
    cy.get('input[name="firstName"]').type('Tio');
    cy.get('input[name="lastName"]').type('QA');
    cy.get('button[type="submit"]').click();
    cy.contains('Successfully Saved');

    // Get the employee id from URL
    cy.url().then(url => {
      const empId = url.split('/').pop();

      // Go to user management
      cy.contains('Admin').click();
      cy.contains('User Management').click();
      cy.contains('Users').click();
      cy.contains('Add').click();

      // Create account for new employee
      cy.get('div.oxd-select-text').eq(0).click(); // User Role
      cy.contains('ESS').click();

      cy.get('input[placeholder="Type for hints..."]').type('Tio QA');
      cy.wait(2000); // wait for auto-suggest
      cy.contains('Tio QA').click();

      cy.get('input[autocomplete="off"]').eq(1).type('tio.qa');
      cy.get('input[type="password"]').eq(0).type('TioQa123!');
      cy.get('input[type="password"]').eq(1).type('TioQa123!');
      cy.contains('Save').click();
      cy.contains('Successfully Saved');
    });
  });

  it('Negative Case - Add Employee Without First Name', () => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    cy.get('input[name="username"]').type('Admin');
    cy.get('input[name="password"]').type('admin123');
    cy.get('button[type="submit"]').click();

    cy.contains('PIM').click();
    cy.contains('Add Employee').click();
    cy.get('input[name="lastName"]').type('NoFirstName');
    cy.get('button[type="submit"]').click();
    cy.contains('Required'); // Assertion for error
  });
});
