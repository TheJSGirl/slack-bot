'use strict';

const RtmClient = require('@slack/client').RtmClient;
// let token =  'xoxb-277651390864-7eE5Juyy5LMoliaj6WRhndAy';

module.exports.init = function slackClient(token, logLevel){
  
  const rtm = new RtmClient(token, {logLevel: 'debug'});
  return rtm;
}