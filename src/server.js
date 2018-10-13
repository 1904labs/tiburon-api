const Hapi = require('hapi');

const api = require('./api');

const server = new Hapi.Server();

async function start() {
  const registerOptions = { once: true };
  const plugins = [{
    options: {
      includes: {
        request: ['headers', 'payload'],
        response: ['headers', 'payload']
      },
      reporters: {
        myConsoleReporter: [
          {
            args: [{ log: '*', request: '*', response: '*' }],
            module: 'good-squeeze',
            name: 'Squeeze'
          },
          {
            module: 'good-console'
          },
          'stdout'
        ]
      }
    },
    plugin: require('good')
  }, {
    options: {
    },
    plugin: api,
    routes: {
      prefix: '/api/v1'
    }
  }];

  const server = new Hapi.Server({
    host: process.env.HOST,
    port: process.env.PORT,
    routes: {
      cors: true
    }
  });

  // Custom error message formatter
  function reformatErrors(request, h) {
    const response = request.response;
    if (!response.isBoom) {
      return h.continue;
    }

    if (response.data) {
      (response.output.payload).details = res;ponse.data;
    }
    throw response;
  }

  server.ext('onPreResponse', reformatErrors);

  await server.register(plugins, registerOptions);

  return server.start();
}

module.exports = { start };
