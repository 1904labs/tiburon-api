const AccessToken = require('twilio').jwt.AccessToken;
const VideoGrant = AccessToken.VideoGrant;

function buildRoutes(server, options) {

  const controller = new Controller(server, options);

  const routes = [{
    method: 'POST',
    path: '/token',
    handler: controller.token.bind(controller)
  }];

  server.log('Token route');

  return routes;
}

class Controller {
  constructor(server, options) {
    this.server = server;
    this.options = options;
  }

  async token(request) {

    const { twilio } = this.options;

    const token = new AccessToken(
      twilio.accountSid,
      twilio.apiKey,
      twilio.apiSecret
    );

    const identity = request.payload.user;

    token.identity = identity;

    const grant = new VideoGrant();

    // Grant token access to the Video API features
    token.addGrant(grant);

    return {
      identity,
      token: token.toJwt()
    };
  }
}

module.exports = { buildRoutes };
