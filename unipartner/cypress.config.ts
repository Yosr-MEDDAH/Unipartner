export default {
  e2e: {
    baseUrl: 'http://localhost:4200',
  },
  component: {
    devServer: {
      framework: 'angular',
      bundler: 'webpack',
    },
    specPattern: '**/*.cy.ts',
  },
  // other Cypress configuration options...
};
