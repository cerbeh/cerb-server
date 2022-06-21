const path = require('path');
const express = require('express');
const requireAll = require('require-all');
const _ = require('lodash');

const getAppDirectory = () => path.join(__dirname, '../../apps');

const getApps = dirname => requireAll({
  dirname,
  recursive: true
});


const createRoutes = () => {
  const router = express.Router();

  const appDirectory = getAppDirectory();
  const appsCollection = getApps(appDirectory);

  for (const appName in appsCollection) {
    const routes = _.get(appsCollection, `${appName}.routes`)
    router.use(`/${appName}`, routes);
  }
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

};

module.exports = { init };
