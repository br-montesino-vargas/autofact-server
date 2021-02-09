const Server = require('./classes/config/server');
require('dotenv').config();

const server = new Server();

server.execute();