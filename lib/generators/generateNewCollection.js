var path = require('path');
var fs = require('fs');
var _ = require('underscore');
var print = require('../utils/print');
var packageInfo = require('../../package.json');
var renderFileTemplate = require('../utils/renderFileTemplate');


module.exports = function(args){

    var name = args[0];
		//var url = args[1] || ' ';//not sure this is needed
		var outputPath = path.resolve(process.cwd(), 'collections');
		var outputFile = path.resolve(outputPath, name + 'Collection.js');

		if(!name){
				print('red', 'Lamesource:');
				print('red', '- You need to give a collection a name');
				print('red', '- This should be the first argument');
				process.exit();
		}

		//if theres no services folder
		if(!fs.existsSync(outputPath)){
				print();
				print('red', 'Lamesource:');
				print('red', '- Derp, Looks like you dont have a collections folder.');
				print('red', '- Have you generated a new application?');
				print('red', '- Try %s -g -a { app-name } { folder-path }', packageInfo.name);
				print();
				process.exit();
		}

		//render template
		renderFileTemplate(
			path.resolve(__dirname, '../templates/collection.js.tmpl'),//src
			outputFile,
			{ name: name }
		);

};
