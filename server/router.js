const fs = require('fs');
const path = require('path');
const express = require('express');
const createVirtualHost = require('./vhost');

const getAppDirectory = () => path.join(__dirname, '../apps');

const createRoutes = () => {
  const router = express.Router();
  const appDirectory = getAppDirectory();
  fs
    .readdirSync(appDirectory)
    .map(appName => {
      const routePath = path.join('../apps', appName, 'routes.js');
      router.use(`/${appName}`, require(routePath));
      return;
    });

  return router;
};

const init = server => {

  server.get('*', function (req, res, next) {
    const domain = req.headers.host;
    const path = req.originalUrl;
    console.log(`Request was made to: ${domain}${path}`);
    return next();
  });

  const appRoutes = createRoutes();
  server.use('/api', appRoutes);

  const vhost = createVirtualHost('colour-clicker.*.*', `${process.cwd()}/ui/WDI-Project-One`);

  server.use(vhost);

  server.use('*', (req, res, next) => {
    console.log('no route found. Stupid.');
    next()
  })

};

module.exports = { init };
