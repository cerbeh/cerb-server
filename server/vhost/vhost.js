const path = require('path');
const requireAll = require('require-all');

const create = require('./create');
const use = require('./use');

const _ = require('lodash');

const getAppDirectory = () => path.join(__dirname, '../../ui');

const getApps = dirname => requireAll({
  dirname,
  recursive: true,
  excludeDirs: /^(js|css|images|scss|src|node_modules|test|public)$/
});


const init = server => {

  const appDirectory = getAppDirectory();
  const appsCollection = getApps(appDirectory);

  for (const [ dir, { app, ...rest } ] of _.entries(appsCollection)) {
    const vhost = rest.package ? use(`${rest.package.name}.*.*`, rest) : create(`${app.domain}.*.*`, `${process.cwd()}/ui/${dir}`);
    server.use(vhost);
  }



};

module.exports = { init };
