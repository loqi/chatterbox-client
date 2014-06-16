// YOUR CODE HERE:


var app = {
  $messages: null,
  server: 'https://api.parse.com/1/classes/chatterbox',
};

app.init = function(){
  app.$messages = $('#messages');
  app.fetch();
};

app.send = function(message){
  $.ajax({
    // always use this url
    url: app.server,
    type: 'POST',
    data: JSON.stringify(message),
    contentType: 'application/json',
    success: function (data) {
      console.log('chatterbox: Message sent');////////////////////////////////////////////////
    },
    error: function (data) {
      // see: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to send message');////////////////////////////////////////////////
    }
  });
};

app.fetch = function(){
  $.ajax({
    url: app.server,
    type: 'GET',
    success: function (data) {
      console.dir(data);  ////////////////////////////////////////////////
      console.log('chatterbox: fetch completed.'); ////////////////////////////////////////////////
      app._renderMessages(data.results);
    },
    error: function (data){
      console.log('chatterbox: fetch failed.'); ////////////////////////////////////////////////
    }
  });
};

// message object returned by GET
//     createdAt: "2013-10-07T16:22:03.280Z"
//     objectId: "teDOY3Rnpe"
//     roomname: "lobby"
//     text: "hello"
//     updatedAt: "2013-10-07T16:22:03.280Z"
//     username: "gary"
app._renderMessages = function(messages){
  _(messages).each(function(msgObj){
    app.$messages.append($(app._htmlFromMsgObj(msgObj)));
  });
};

// Given a message object, return an HTML string formatted for our app.
app._htmlFromMsgObj = function(msgObj){
  return '<div class="message"><p>'+msgObj.username+' said: '+msgObj.text+'<br>On: '+msgObj.createdAt+'</p></div>';
};

app.init();
