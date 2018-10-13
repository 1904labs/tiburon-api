function buildRoutes(server, options) {

  server.subscription('/volunteer/{userId}', {
    onSubscribe: async function(socket, path, params) {
      console.log(params);
      options.users[params.userId] = 'online';
      setTimeout(() => {
        server.publish(`/volunteer/${params.userId}`, { id: 6, status: 'initial' });
      }, 2000);
    },
    onUnsubscribe: async function (socket, path, params) {
      options.users[params.userId] = 'offline';
    }
  });

  // Uses nes for route identification
  const routes = [];

  server.log('Volunteer subscription route');

  return routes;
}

module.exports = { buildRoutes };
