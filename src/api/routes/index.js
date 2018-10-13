const Online = require('./online');
const Token = require('./token');

function buildRoutes(server, options) {
  const routes = [
    Online.buildRoutes(server, options),
    Token.buildRoutes(server, options)
  ];

  return routes;
};

module.exports = { buildRoutes };
