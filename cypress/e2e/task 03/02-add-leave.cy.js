describe('Add Leave Entitlement', () => {
  it('Positive Case - Add Leave for Tio QA', () => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    cy.get('input[name="username"]').type('Admin');
    cy.get('input[name="password"]').type('admin123');
    cy.get('button[type="submit"]').click();

    cy.contains('Leave').click();
    cy.contains('Entitlements').click();
    cy.contains('Add Entitlements').click();

    cy.get('input[placeholder="Type for hints..."]').type('Tio QA');
    cy.wait(2000);
    cy.contains('Tio QA').click();

    cy.get('div.oxd-select-text').eq(1).click(); // Leave type
    cy.contains('Annual Leave').click();

    cy.get('input[type="number"]').type('5');
    cy.contains('Save').click();

    cy.contains('Successfully Saved');
  });

  it('Negative Case - Add Leave With Empty Days', () => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    cy.get('input[name="username"]').type('Admin');
    cy.get('input[name="password"]').type('admin123');
    cy.get('button[type="submit"]').click();

    cy.contains('Leave').click();
    cy.contains('Entitlements').click();
    cy.contains('Add Entitlements').click();

    cy.get('input[placeholder="Type for hints..."]').type('Tio QA');
    cy.wait(2000);
    cy.contains('Tio QA').click();

    cy.get('div.oxd-select-text').eq(1).click();
    cy.contains('Annual Leave').click();

    cy.contains('Save').click();
    cy.contains('Required');
  });
});
