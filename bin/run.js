'use strict';

const service = require('../server/service');
const http = require('http');
const slackClient  = require('../server/slackClient');

const server = http.createServer(service);

const slackToken = 'xoxb-277651390864-7PSJLS5FWxiZhilz3fkmovC3';
const slackLogLevel = 'verbose';

const rtm = slackClient.init(slackToken, slackLogLevel);
rtm.start();

//subscribe 
slackClient.addAuthenticatedHandler(rtm, () => {
    server.listen(3000);
})

server.on('listening', function () {
  console.log(`microservices is listening on ${server.address().port} in ${service.get('env')}mode.`);
})