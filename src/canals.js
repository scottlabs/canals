var d3 = require('d3');
function parse (a)
{
      var b={};
          for (var i in a = a.match(/(\w+\((\-?\d+\.?\d*e?\-?\d*,?)+\))+/g))
                {
                          var c = a[i].match(/[\w\.\-]+/g);
                                  b[c.shift()] = c;
                                      }
                                          return b;
}

var dragCircle = d3.behavior.drag()
.origin(function() { 
  var t = d3.select(this);
  return {x: t.attr("x") + d3.transform(t.attr("transform")).translate[0],
    y: t.attr("y") + d3.transform(t.attr("transform")).translate[1]};
})
.on('dragstart', function() {
  d3.event.sourceEvent.stopPropagation();
})
.on('drag', function(d, i) {
  d3.select(this).attr("transform", function(d,i){
    return "translate(" + [ d3.event.x,d3.event.y ] + ")"
  })
});


var svg = d3.select("body").append("svg")
          .attr("width", '100%')
          .attr("height", '100%');

var padding = 25;
var control_size = 50;

var width = svg.node().getBoundingClientRect().right;

var zoomListener = d3.behavior.zoom()
.scaleExtent([0.5, 16])
.on("zoom", zoomFunc);

var map = svg.append("g")
          .call(zoomListener)
          .append("g");

          map.append("rect")
          .attr("class", "overlay")
          .attr("width", '100%')
          .attr("height", '100%');

map.append("rect")
.attr("width", 25)
.attr("height", 25)
.attr("transform", function(d) { return "translate(125, 125)"; })
.call(dragCircle);

map.append("rect")
.attr("width", 25)
.attr("height", 25)
.attr("transform", function(d) { return "translate(50)"; })
.call(dragCircle);

function zoomFunc() {
  map.attr("transform", "translate(" + d3.event.translate + "),scale(" + d3.event.scale + ")");
}



function zoom(dir) {
  d3.transition().duration(250).tween("zoom", function() {
    if ( map.attr('transform') ) {
      var transform = parse(map.attr('transform'));
      transform.scale = parseFloat(transform.scale.pop());
    } else {
      var transform = {
        translate: [0, 0],
        scale: 1
      }
    }
    if ( dir === 0) {
      var target_scale = transform.scale / 2;
    } else {
      var target_scale = transform.scale * 2;
    }

    if ( target_scale < 0.25 || target_scale > 16 ) {
      return;
    }
    var sc = d3.interpolate(transform.scale, target_scale);
    return function(t) {
      zoomListener.scale(sc(t));
      map.attr("transform", "translate("+transform.translate[0]+","+transform.translate[1]+"),scale("+sc(t)+")");
    };
  });
}

var Canals = function(opts = {}){
  return {
    zoom: zoom
  }
};


var controls = svg.append('g').attr('class', 'zoom').attr('transform', 'translate('+(width-padding-control_size)+','+padding+')');

var zoomIn = controls.append('g');
zoomIn.append('rect')
          .attr('width', control_size)
          .attr('height', control_size)
          .attr('fill','#CCC').on('click', function() {
            zoom(1);
          });

zoomIn.append('text')
        .text('+')
        .attr('x',control_size/2-10)
        .attr('y',control_size/2+10)
        .attr('font-size', '20px')

var zoomOut = controls.append('g');
zoomOut.append('rect')
          .attr('width', control_size)
          .attr('height', control_size)
          .attr('y',control_size+2)
          .attr('fill','#CCC').on('click', function() {
            zoom(0);
          });
zoomOut.append('text')
        .text('-')
        .attr('x',control_size/2-5)
        .attr('y',control_size+2+control_size/2+10)
        .attr('font-size', '20px');


module.exports = Canals;
