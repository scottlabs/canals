export class State {
  constructor(svg, opts) {
    if ( ! opts.corner ) { opts.corner = 6; }
    this.start = [];
    this.obj = svg.append('rect')
    .attr('rx', opts.corner)
    .attr('ry', opts.corner)
    .attr('x', opts.x)
    .attr('y', opts.y)
    .datum(this)
    .attr('width', opts.width)
    .attr('height', opts.height)
    .attr('fill', '#DDD')
    .attr('stroke', '#999')
    .attr('stroke-width', '2')
    .attr('cursor', 'move');
    this.id = opts.id;

      var drag = d3.behavior.drag()
      .on("drag", function(d,i) {
        d.x += d3.event.dx;
        d.y += d3.event.dy;
        d3.select(this).attr("transform", function(d,i){
          return "translate(" + [ d.x,d.y ] + ")"
        })
      });

      this.obj.call(drag);
      /*
    this.obj.on('mouseover', function() {
      this.obj.attr('stroke', '#000');
    }.bind(this)).on('mouseout', function() {
      this.obj.attr('stroke', '#999');
    }.bind(this)).on('mousedown', function(e) {

      d3.event.stopPropagation();
      console.log('ready');


    }.bind(this));
    */
  }

  mapDown(start) {
    this.start[0] = start[0] - parseInt(this.obj.attr('x'));
    this.start[1] = start[1] - parseInt(this.obj.attr('y'));
  }

  mapUp() {
    this.start = [];
  }

  mapMove(pos) {
    var x = pos[0] - this.start[0];
    var y = pos[1] - this.start[1];
    this.obj.attr('x', x).attr('y', y);
  }
}
