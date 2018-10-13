const Routes = require('./routes');

async function register(server, options) {

  const routes = Routes.buildRoutes(server, options);

  server.route(routes);

  server.log(['info'], 'Registered routes');
}

module.exports = {
  name: 'api',
  register,
  version: '1.0.0'
};
