var fs = require('fs');
var _ = require('underscore');

module.exports = function(src, dest, payload, options){

		if(!payload) payload = {};
		if(!options) options = 'utf-8';

		//make application entry point
		var template = fs.readFileSync(src);
		template = template += ' '; //todo --> why is this a buffer?
		var content = _.template(template)(payload);
		fs.writeFileSync(dest, content, options);

};