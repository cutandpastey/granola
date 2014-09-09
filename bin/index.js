#!/usr/bin/env node

var program = require('commander');
var print = require('../lib/utils/print');
var packageInfo = require('../package.json');

var generateNewApp = require('../lib/generators/generateNewApplicationBoilerplate');

generatorMap = {
	service: require('../lib/generators/generateNewService')
};

program
	.version(packageInfo.version)
	.option('-a, --application-path   [path]', 'Generate a new application boilerplate in [path]')
	.option('-g, --generate-component [component-type] [component-name]', 'Generate a new component boilerplate')
	.parse(process.argv);

//if we a generating a new application
if(program.applicationPath) generateNewApp(program.applicationPath, program.args[0]);

if(program.generateComponent){

		var generator = generatorMap[program.generateComponent];

		if(!generator){
				print();
				print('red', 'you cant generate a %s, mate!', program.generateComponent);
				print();
				process.exit();
		}
		generator(program.args)
}