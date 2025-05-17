const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here

      on('after:spec', (spec, results) => {
        if (results && results.tests) {
          results.tests.forEach(test => {
            test.attempts.forEach(attempt => {
              if (attempt.state === 'passed') {
                // Cypress automatically takes screenshots on failure, but not on pass.
                // To take a screenshot on pass, use a custom command in your test files:
                // cy.screenshot() at the end of your test.
                // Alternatively, you can use the 'test:after:run' event:
              }
            });
          });
        }
      });

      on('test:after:run', (test, runnable) => {
        if (test.state === 'passed') {
          const screenshotFileName = `${runnable.parent.title} -- ${test.title} (passed).png`;
          // Take screenshot using Cypress command in the test itself:
          // cy.screenshot(screenshotFileName);
          // Or, for automatic screenshots, use a plugin or custom logic.
        }
      });
    },
  },
});
