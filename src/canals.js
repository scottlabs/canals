var d3 = require('d3');
var Canals = function(opts){
  console.log('here we go');
  //var id = opts.id;
  var body = d3.select("body");
  var div = body.append("div");
  div.html("Hello, world! 2");
  return {
    foo: 'bar'
  };
}();

module.exports = Canals;
