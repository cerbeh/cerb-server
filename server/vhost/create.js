const express = require('express');
const bodyParser = require('body-parser');
const vhost = require('vhost');

function createVirtualHost(domainName, dirPath) {
  const host = express();
  host.use(bodyParser.json());

  //Where to serve static content
  host.get('/', (req, res) => res.sendFile(`${dirPath}/index.html`));
  host.use(express.static(dirPath));
  return vhost(domainName, host);
}


module.exports = createVirtualHost;
