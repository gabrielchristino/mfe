const { shareAll, withModuleFederationPlugin } = require('@angular-architects/module-federation/webpack');

module.exports = withModuleFederationPlugin({

  name: 'mfe1',

  remotes: {
    "mfe-cards": "http://localhost:4202/remoteEntry.js",
  },

  exposes: {
    './routes': './src/app/card-customer/card-customer.routes.ts',
  },

  shared: {
    ...shareAll({ singleton: true, strictVersion: true, requiredVersion: 'auto' }),
  },

});
