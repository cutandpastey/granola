#!/usr/bin/env node

var program = require('commander');

var generateNewApp = require('../lib/generators/generateNewApplicationBoilerplate');

var packageInfo = require('../package.json');

program
	.version(packageInfo.version)

	.option('-a, --application-path [path]', 'Generate a new application boilerplate in [path]')

	.parse(process.argv);



//if we a generating a new application
if(program.applicationPath) generateNewApp(program.applicationPath, program.args[0]);
