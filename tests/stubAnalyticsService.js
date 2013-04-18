var stubAnalyticsService = function () {

  var _messages = [];
  
  var reset = function () {
    _messages = [];
  };
  
  
  var count = function () {
    return _messages.length;
  };
  
  
  var post = function (data) {
    _messages.push(data);
  };
  
  
  var messages = function () {
    return _messages;
  };
  
  return {
    post: post,
    reset: reset,
    count: count,
    messages: messages
  };
  
}();