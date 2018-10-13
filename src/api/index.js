async function register(server, options) {
  // server.routes();

  server.log(['info'], 'Registered routes');
}

module.epxorts = {
  name: 'api',
  register,
  version: '1.0.0'
};
