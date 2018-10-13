const Online = require('./online');
const Token = require('./token');
const Volunteer = require('./volunteer');

function buildRoutes(server, options) {
  const routes = [
    ...Online.buildRoutes(server, options),
    ...Token.buildRoutes(server, options),
    ...Volunteer.buildRoutes(server, options)
  ];

  return routes;
};

module.exports = { buildRoutes };
