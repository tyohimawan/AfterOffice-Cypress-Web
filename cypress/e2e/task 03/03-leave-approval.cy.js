describe('Leave Request and Approval Flow', () => {
  it('Positive Case - Employee Request and Admin Approves', () => {
    // Login as Employee
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    cy.get('input[name="username"]').type('tio.qa');
    cy.get('input[name="password"]').type('TioQa123!');
    cy.get('button[type="submit"]').click();
    cy.url().should('include', '/dashboard');

    cy.contains('Leave').click();
    cy.contains('Apply').click();

    cy.get('div.oxd-select-text').click();
    cy.contains('Annual Leave').click();

    const today = new Date().toISOString().slice(0, 10);
    cy.get('input[placeholder="yyyy-mm-dd"]').eq(0).clear().type(today);
    cy.get('input[placeholder="yyyy-mm-dd"]').eq(1).clear().type(today);
    cy.contains('Apply').click();
    cy.contains('Successfully Applied');

    // Login as Admin
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    cy.get('input[name="username"]').type('Admin');
    cy.get('input[name="password"]').type('admin123');
    cy.get('button[type="submit"]').click();

    cy.contains('Leave').click();
    cy.contains('Leave List').click();
    cy.wait(2000);
    cy.get('input[type="checkbox"]').eq(1).check();
    cy.contains('Approve').click();
    cy.contains('Successfully Updated');

    // Back to employee
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    cy.get('input[name="username"]').type('tio.qa');
    cy.get('input[name="password"]').type('TioQa123!');
    cy.get('button[type="submit"]').click();
    cy.contains('My Leave').click();
    cy.contains('Approved');
  });

  it('Negative Case - Request Leave Without Date', () => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    cy.get('input[name="username"]').type('tio.qa');
    cy.get('input[name="password"]').type('TioQa123!');
    cy.get('button[type="submit"]').click();

    cy.contains('Leave').click();
    cy.contains('Apply').click();

    cy.get('div.oxd-select-text').click();
    cy.contains('Annual Leave').click();

    cy.contains('Apply').click();
    cy.contains('Required');
  });
});
