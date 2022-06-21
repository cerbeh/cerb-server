const vhost = require('vhost');

const useVhost = (domainName, app) => {
  const appLocation = app.package.main.split('.')[0];
  return vhost(domainName, app[appLocation]);
};

module.exports = useVhost;
