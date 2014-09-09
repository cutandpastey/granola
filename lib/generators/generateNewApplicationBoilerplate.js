var path = require('path');
var fs = require('fs');
var spawn = require('child_process').spawn;

var Q = require('q');
var execSync = require('exec-sync');
var _ = require('underscore');

var print = require('../utils/print');
var renderTemplate = require('../utils/renderFileTemplate');

module.exports = function(filepath, name, production, verbose){

		// Get filepath
		if(!name){ name = ' ' }
		if(!filepath || filepath === true){ filepath = './' }

		filepath = path.resolve(process.cwd(), filepath, name);

		// Progress info
		print();
		print('green', 'Creating %s in %s directory', (name !== ' ' ? name : 'a new application'), filepath);
		print();

		//check if dir exists and fail if it does
		if(fs.existsSync(filepath)){
				print('red', 'Sorry %j already exists ... derp', filepath)
				console.log();
				process.exit();
		}

		//make all directories
		fs.mkdirSync(filepath);
		print('green', 'Made application directory %s', filepath);

		fs.mkdirSync(filepath + '/controllers');
		print('green', 'Made application directory %s', filepath + '/controllers');

		fs.mkdirSync(filepath + '/models');
		print('green', 'Made application directory %s', filepath + '/models');

		fs.mkdirSync(filepath + '/services');
		print('green', 'Made application directory %s', filepath + '/services');

		fs.mkdirSync(filepath + '/views');
		print('green', 'Made application directory %s', filepath + '/views');

		fs.mkdirSync(filepath + '/mediator');
		print('green', 'Made application directory %s', filepath + '/mediator');

		fs.mkdirSync(filepath + '/public');
		print('green', 'Made application directory %s', filepath + '/public');

		fs.mkdirSync(filepath + '/views/pages');
		print('green', 'Made application directory %s', filepath + '/views/pages');

		fs.mkdirSync(filepath + '/views/elements');
		print('green', 'Made application directory %s', filepath + '/views/elements');

		fs.mkdirSync(filepath + '/public/js');
		print('green', 'Made application directory %s', filepath + '/public/js');

		print();
		print('green', 'Made all application directories');
		print();

		//write package.json
		var packageTemplatePath = path.resolve(__dirname, '../templates/package.json.tmpl');
		var packagePath = filepath + '/package.json';
		var username = execSync('whoami');

		renderTemplate(packageTemplatePath, packagePath, { author: username, name: name })

		print('green', 'Written %s ', packagePath);

		//make application entry point
		var indexTemplatePath = path.resolve(__dirname, '../templates/index.js.tmpl');
		var indexPath = filepath + '/index.js';
		renderTemplate(indexTemplatePath, indexPath);
		print('green', 'Written %s ', indexPath);

		//make browser entry point
		var appTemplatePath = path.resolve(__dirname, '../templates/app.js.tmpl');
		var appPath = filepath + '/public/js/app.js';
		renderTemplate(appTemplatePath, appPath);
		print('green', 'Written %s ', appPath);

		//make mediator
		var mediatorTemplatePath = path.resolve(__dirname, '../templates/mediator.js.tmpl');
		var mediatorPath = filepath + '/mediator/index.js';
		renderTemplate(mediatorTemplatePath, mediatorPath);
		print('green', 'Written %s ', mediatorPath);

		print('green', 'About to install deps ... this might take a while. Go get coffee.');

		var install = spawn('npm', ['install'], { cwd: filepath, env: process.env })
		install.stdout.on('data', function(data){ print('cyan', '%s', data) });
		install.stderr.on('data', function(data){ print('red', 'Oh no, much error!! looks like: %s', data) });
		install.on('close', function(code){ print('green', 'Cool, it looks like the install went okay') });

};



















