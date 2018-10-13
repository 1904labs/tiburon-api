const Hapi = require('hapi');

const api = require('./api');

const users = {
  'aramirez': 'offline'
};

async function start() {
  const registerOptions = { once: true };
  const plugins = [{
    options: {
      heartbeat: {
        interval: 15000,
        timeout: 5000
      }
    },
    plugin: require('nes')
  }, {
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
      users,
      twilio: {
        accountSid: process.env.TWILIO_ACCOUNT_SID,
        apiKey: process.env.TWILIO_API_KEY,
        apiSecret: process.env.TWILIO_API_SECRET
      }
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
