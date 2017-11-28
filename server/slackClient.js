'use strict';
const RtmClient = require('@slack/client').RtmClient;
const CLIENT_EVENTS = require('@slack/client').CLIENT_EVENTS;
const RTM_EVENTS = require('@slack/client').RTM_EVENTS;
let rtm = null;
let newModuleGlobal = null;

function handleOnAuthenticated(rtmStartData){
  console.log(`logged in as ${rtmStartData.self.name} of team ${rtmStartData.team.name}, but not yet connected to a channel`);
}

function addAuthenticatedHandler(rtm, handler){
    rtm.on(CLIENT_EVENTS.RTM.AUTHENTICATED, handler);
}

//function will be call every time when new message comes in
function handleOnMessage(message){
  // console.log(message);
  newModuleGlobal.ask(message.text, (err, res) => {
    if(err){
      console.log(err);
      return;
    }
    if(!res.intent){
      return rtm.sendMessage("Sorry I dont know what you are talking about", message.channel);
    }
    else if(res.intent[0].value == 'time' && res.location){
      return rtm.sendMessage("Sorry I yet do not know the time in ${res.location[0].value}", message.channel);
    }
    else{

      console.log(res);
      return rtm.sendMessage("Sorry I dont know what you are talking about", message.channel);
    }
    rtm.sendMessage('Sorry I did not understand ', message.channel)
  
  } );
}
module.exports.init = function slackClient(token, logLevel, nlpClient){
   rtm = new RtmClient(token, {logLevel: logLevel});
   newModuleGlobal = nlpClient;
   addAuthenticatedHandler(rtm, handleOnAuthenticated);
   rtm.on(RTM_EVENTS.MESSAGE, handleOnMessage);
   return rtm;
}

module.exports.addAuthenticatedHandler = addAuthenticatedHandler;