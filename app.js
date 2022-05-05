const server = require('./server');
const config = require('./config');

const app = server.create(config);

server.start(app);
