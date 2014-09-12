#!/usr/bin/env node
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
	.option('-c, --component   [type] [name]', 'Generate a new application boilerplate in [path] (must use -g flag)')
	.option('-a, --application [path]', 'generate application')
	.option('-p, --page        [name]', 'Generate a new page boilerplate (must use -g flag)')
	.option('-w, --watch ', 'Basic proxy for npm run watch')
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
				require('../lib/generators/generateNewPageGroup')([program.page]);
		}


}