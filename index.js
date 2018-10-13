require('dotenv').config();

const server = require('./src/server');

async function start() {
  try {
    await server.start();
    console.log(`Started server on ${ process.env.PORT }`);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

start();
