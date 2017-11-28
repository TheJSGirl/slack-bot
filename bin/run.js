'use strict';

const service = require('../server/service');
const http = require('http');
const slackClient  = require('../server/slackClient');

const server = http.createServer(service);

const slackToken = 'xoxb-277651390864-7eE5Juyy5LMoliaj6WRhndAy';
const slackLogLevel = 'debug';

const rtm = slackClient.init(slackToken, slackLogLevel);
rtm.start();

server.listen(3000);

server.on('listening', function () {
  console.log(`microservices is listening on ${server.address().port} in ${service.get('env')}mode.`);
})