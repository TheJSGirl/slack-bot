'use strict';

const service = require('../server/service');
const http = require('http');
const slackClient  = require('../server/slackClient');

const server = http.createServer(service);

const slackToken = 'xoxb-278486762437-oMvn2BY93kOMWBQSoZmkh38v';
const slackLogLevel = 'verbose';

const witToken = 'OXXXJ7CGYI7PS7O5A6HAGBIN4VXWNI4Q';
const witClient = require('../server/witClient')(witToken);

const rtm = slackClient.init(slackToken, slackLogLevel, witClient);
rtm.start();

//subscribe 
slackClient.addAuthenticatedHandler(rtm, () => {
    server.listen(3000);
})

server.on('listening', function () {
  console.log(`microservices is listening on ${server.address().port} in ${service.get('env')}mode.`);
})