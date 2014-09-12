var fs = require('fs');
var _ = require('underscore');
var print = require('../utils/print');

module.exports = function(src, dest, payload, options){

		if(!payload) payload = {};
		if(!options) options = 'utf-8';

		//if a service of the same name exists
		if(fs.existsSync(dest)){
				print();
				print('red', 'Lamesource:');
				print('red', '- Derp %s already exists.', dest);
				print();
				process.exit();
		}

		//make application entry point
		var template = fs.readFileSync(src);
		template = template.toString('utf-8');
		var content = _.template(template)(payload);
		fs.writeFileSync(dest, content, options);

		print('green', 'Awesomesource:');
		print('green', '- Looks like %s has been written okay', dest);

};