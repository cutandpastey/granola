var fs = require('fs');
var print = require('../utils/print');

module.exports = function(args){

		var name = args[0];
		var url = args[0] || ' ';

		if(!name){
				print('red', 'You need to give a service a name this should be the first arguments');
				process.exit();
		}




}