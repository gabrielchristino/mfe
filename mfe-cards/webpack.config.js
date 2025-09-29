const { shareAll, withModuleFederationPlugin } = require('@angular-architects/module-federation/webpack');

module.exports = withModuleFederationPlugin({

  name: 'mfe-cards',

  exposes: {
    './CardListComponent': './src/app/card-list/card-list.component.ts',
    './CustomerDataComponent': './src/app/customer-data/customer-data.component.ts',
  },

  shared: {
    ...shareAll({ singleton: true, strictVersion: true, requiredVersion: 'auto' }),
  },

});
