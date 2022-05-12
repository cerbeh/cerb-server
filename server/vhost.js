const express = require('express');
const bodyParser = require('body-parser');
const vhost = require('vhost');

module.exports = function createVirtualHost(domainName, dirPath) {
  const host = express();
  //parses request body and populates request.body
  host.use(bodyParser.json());

  //checks request.body for HTTP method overrides
  // host.use(express.methodOverride());

  //Where to serve static content
  host.get('/', (req, res) => {
    console.log('hello world')
    res.sendFile(`${dirPath}/index.html`)
  });
  host.use(express.static(dirPath));

  //Show errors
  // host.use(express.errorHandler({ dumpExceptions: true, showStack: true }));


  return vhost(domainName, host);
};
