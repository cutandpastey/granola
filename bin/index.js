#!/usr/bin/env node

require('node-jsx').install({extension: '.jsx'});

/*
 TODO -->

 move app generation into lib/app and require it here
 - this makes it more testable

 add testing and test stub generation
 - everyone should test stuff dummy

 */


var spawn = require('child_process').spawn;
var program = require('commander');
var print = require('../lib/utils/print');
var packageInfo = require('../package.json');

var generateNewApp = require('../lib/generators/generateNewApplicationBoilerplate');

generatorMap = {
		controller: require('../lib/generators/generateNewController'),
		model     : require('../lib/generators/generateNewModel'),
		service   : require('../lib/generators/generateNewService'),
		element   : require('../lib/generators/generateNewElement'),
		page      : require('../lib/generators/generateNewPage')
};

program
	.version(packageInfo.version)
	.option('-g, --generate    [component-type] [component-name]', 'Generate a new app/component boilerplate')
	.option('-a, --application [app-name] [path]', 'Generate [app-name] in [path] (must use -g flag)')
	.option('-c, --component   [type] [name]', 'Generate a new component of [type] with [name] (must use -g flag)')
	.option('-p, --page        [name] [url]', 'Generate a new page with MVC of [name] and url of [url] (must use -g flag)')
	.option('-w, --watch ',    'Basic proxy for npm run watch')
	.parse(process.argv);

if(program.watch){
		var watcher = spawn('npm', ['run', 'watch']);
		watcher.stdout.on('data', function(data){ console.log(data.toString('utf-8')) });
		watcher.stderr.on('data', function(data){ console.log(data.toString('utf-8')) });
		watcher.on('close', function(code){
				console.log('closed the process with code %s', code);
				process.exit();
		})
}

if(program.generate){

		if(program.application){
				generateNewApp(program.application, program.args[0]);
		}

		else if(program.component){

				var generator = generatorMap[program.component];

				if(!generator){
						print();
						print('red', 'you cant generate a %s, mate!', program.generateComponent);
						print();
						process.exit();
				}
				generator(program.args);

		}

		else if(program.page){
				require('../lib/generators/generateNewPageGroup')(program.page, program.args);
		}


}