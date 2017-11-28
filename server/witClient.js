'use strict';
const request = require('superagent');

function handleWitResponse(res){
  // console.log(res);
  return res.entities;
}
module.exports = function witClient(token){
  const ask = function ask(message, cb){

    request.get('https://api.wit.ai/message')
      .set('Authorization', 'Bearer' + token) 
      .query({v:'28/11/2017'})
      .query({q:message})
      .end((err, res) => {
        if(err){
          return cb(err);
        }
        const witResponse = handleWitResponse(res.body);

        return cb(null, witResponse);
      })
    // console.log('ask:'+ message);
    // console.log('token:'+ token);
  }

  return {
    ask: ask
  }
}