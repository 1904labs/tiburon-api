const Boom = require('boom');
const twilio = require('twilio');
const uuid = require('uuid/v4');

function buildRoutes(server, options) {

  const controller = new Controller(server, options);

  const routes = [{
    method: 'POST',
    path: '/call/{volunteerId}',
    handler: controller.makeCall.bind(controller)
  }];

  server.log('Call route');

  return routes;
}

class Controller {
  constructor(server, options) {
    this.server = server;
    this.options = options;
  }

  async makeCall(request) {
    try {
      const { volunteerId } = request.params;
      const { userName } = request.payload;

      if (this.options.users[volunteerId] !== 'online') {
        throw Boom.badRequest(`Volunteer ${ volunteerId } is not online`);
      }

      const {
        accountSid,
        accountToken
      } = this.options.twilio;

      const client = twilio(accountSid, accountToken);

      const uniqueName = uuid();

      const room = await client.video.rooms.create({ uniqueName });

      console.log(room);

      this.server.publish(`/volunteer/${ volunteerId }`, {
        type: 'call_incoming',
        userName,
        roomName: uniqueName
      });

      return {
        roomName: uniqueName
      };
    } catch (e) {
      console.error(e);
      throw Boom.boomify(e);
    }
  }
}

module.exports = { buildRoutes };
