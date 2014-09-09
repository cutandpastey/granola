var clc = require('cli-color');
var util = require('util');

module.exports = function(){

		var args = Array.prototype.slice.call(arguments, 0);
		var color = args.splice(0, 1)[0];

		if(arguments.length === 0){
				console.log(' ');
				return;
		}
		if(color === '\n'){
				console.log(color);
				return;
		}

		var logString = util.format.apply(null, args);
		var coloredLogString = clc[color](logString);
		console.log(coloredLogString);

};