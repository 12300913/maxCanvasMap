window.requestAnimFrame=(function(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||function(a){window.setTimeout(a,1000/60)}})();var max={};max.Map=function(b,a){this._canvas=document.getElementById(b);this._context=canvas.getContext("2d");this._layers=[];this.extent=a;this.width=canvas.width;this.height=canvas.height;this.resolutions=[156543.0339280406,78271.51696402031,39135.75848201016,19567.87924100508,9783.939620502539,4891.96981025127,2445.984905125635,1222.992452562817,611.4962262814087,305.7481131407043,152.8740565703522,76.43702828517608,38.21851414258804,19.10925707129402,9.554628535647009];this.init();this.wkid=102100;this._pub=new max.event.Publisher();this._sub=new max.event.Subscriber()};max.Map.prototype={init:function(){this.resolution=(this.extent.xmax-this.extent.xmin)/(this._canvas.width);this.originPoint={x:this.extent.xmin,y:this.extent.ymin};this.extent.xmax=this.extent.xmin+this.resolution*this._canvas.width;this.extent.ymax=this.extent.ymin+this.resolution*this._canvas.height;var b=this;this.dragMap();this.scrollMap();this._addAllEvent();var a=function(){b.draw.call(b);requestAnimFrame(a)};a()},addLayer:function(b){for(var a in this._layers){if(this._layers[a]===b){return false}}this._layers.push(b);b.parentMap=this;this.load(b)},getLayers:function(){return this._layers},load:function(a){a.load(map)},update:function(){},mapClientToMap:function(b){var a=b.x*this.resolution+this.originPoint.x;var c=b.y*this.resolution+this.originPoint.y;return{x:a,y:c}},draw:function(){this._context.clearRect(0,0,this._canvas.width,this._canvas.height);for(var b in this._layers){var a=this._layers[b];a.draw()}},dragMap:function(){var d=null;var b=this;var c=false;var a=function(g){d=max.util.windowToMapClient(b._canvas,g.clientX,g.clientY);c=true;var f=function(m){if(c){var l=max.util.windowToMapClient(b._canvas,m.clientX,m.clientY);var h=l.x-d.x;var n=l.y-d.y;d=l;b.originPoint.x-=h*b.resolution;b.originPoint.y-=n*b.resolution;b.extent={xmin:b.originPoint.x,ymin:b.originPoint.y,xmax:b.originPoint.x+b._canvas.width*b.resolution,ymax:b.originPoint.y+b._canvas.height*b.resolution};for(var k in b._layers){var j=b._layers[k];j.ondrag()}}};var e=function(h){d=null;c=false;max.event.removeHandler(b._canvas,"mousemove",f);max.event.removeHandler(document,"mouseup",e)};max.event.addHandler(b._canvas,"mousemove",f);max.event.addHandler(document,"mouseup",e)};max.event.addHandler(this._canvas,"mousedown",a)},scrollMap:function(){var a=this;var b=function(h){var k=max.util.windowToMapClient(a._canvas,h.clientX,h.clientY);var c=a.mapClientToMap(k);if(h.wheelDelta>0){for(var e in a.resolutions){if(a.resolutions[e]<a.resolution){if(a.resolutions[e]===a.resolution){return false}var j=a.resolution;a.resolution=a.resolutions[e];var g=j/a.resolution;var f=a.originPoint.x+(c.x-a.originPoint.x)/g;var d=a.originPoint.y+(c.y-a.originPoint.y)/g;break}}}else{for(var e in a.resolutions){if(a.resolutions[e]<=a.resolution){var j=a.resolution;if(e==0){a.resolution=a.resolutions[0]}else{a.resolution=a.resolutions[e-1]}if(a.resolutions[e]===a.resolution){return false}var g=a.resolution/j;var f=a.originPoint.x+(a.originPoint.x-c.x)*(g-1);var d=a.originPoint.y+(a.originPoint.y-c.y)*(g-1);break}}}a.originPoint.x=f;a.originPoint.y=d;a.extent={xmin:f,ymin:d,xmax:f+a._canvas.width*a.resolution,ymax:d+a._canvas.height*a.resolution};for(var e in a._layers){a._layers[e].load()}};if(typeof this._canvas.onmousewheel!=="undefined"){max.event.addHandler(this._canvas,"mousewheel",b)}else{max.event.addHandler(this._canvas,"wheel",b)}},addEventListener:function(b,a){this._sub.bind(this._pub,b,a)},removeEventListener:function(b,a){this._sub.unbind(this._pub,b,a)},_addAllEvent:function(){var b=this;var c=function(d){var e=max.util.windowToMapClient(b._canvas,d.clientX,d.clientY);d.clientPosition=e;d.mapPosition={x:b.originPoint.x+b.resolution*e.x,y:b.originPoint.y+b.resolution*e.y};return d};var a=function(d){max.event.addHandler(b._canvas,d,function(e){e=c(e);b._pub.trigger("on"+d,e)})};a("click")}};max.Extent=function(a){this.xmin=a.xmin;this.xmax=a.xmax;this.ymin=a.ymin;this.ymax=a.ymax};max.Geometry={};
