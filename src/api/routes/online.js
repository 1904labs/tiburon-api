function buildRoutes(server, options) {

  const controller = new Controller(server, options);

  const routes = {
    method: 'GET',
    path: '/online',
    handler: controller.online.bind(controller)
  }

  server.log('Online route');

  return routes;
}

class Controller {
  constructor(server, options) {
    this.server = server;
    this.options = options;
  }

  async online(request) {
    const onlineUsers = Object.entries(this.options.users)
      .filter(([_, status]) => status !== 'offline')
      .map(([user, status]) => ({user, status}));

    return {
      users: onlineUsers
    };
  }
}

module.exports = { buildRoutes };
