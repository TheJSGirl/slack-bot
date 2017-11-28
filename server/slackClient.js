'use strict';
const RtmClient = require('@slack/client').RtmClient;
const CLIENT_EVENTS = require('@slack/client').CLIENT_EVENTS;
const RTM_EVENTS = require('@slack/client').RTM_EVENTS;
let rtm = null;

function handleOnAuthenticated(rtmStartData){
  console.log(`logged in as ${rtmStartData.self.name} of team ${rtmStartData.team.name}, but not yet connected to a channel`);
}

function addAuthenticatedHandler(rtm, handler){
    rtm.on(CLIENT_EVENTS.RTM.AUTHENTICATED, handler);
}

//function will be call every time when new message comes in
function handleOnMessage(message){
  console.log(message);
  rtm.sendMessage('this is test message', message.channel)
}
module.exports.init = function slackClient(token, logLevel){
   rtm = new RtmClient(token, {logLevel: logLevel});
   addAuthenticatedHandler(rtm, handleOnAuthenticated);
   rtm.on(RTM_EVENTS.MESSAGE, handleOnMessage);
   return rtm;
}

module.exports.addAuthenticatedHandler = addAuthenticatedHandler;