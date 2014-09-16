var path = require('path');
var fs = require('fs');
var spawn = require('child_process').spawn;

var Q = require('q');
var execSync = require('exec-sync');
var _ = require('underscore');

var print = require('../utils/print');
var renderTemplate = require('../utils/renderFileTemplate');

module.exports = function(args){

    var name = args[0] || ' ';
    var filepath = args[1] || './';

		filepath = path.resolve(process.cwd(), filepath, name);

		// Progress info
		print();
		print('green', 'Creating %s in %s directory', (name !== ' ' ? name : 'a new application'), filepath);
		print();

		//check if dir exists and fail if it does
		if(fs.existsSync(filepath)){
				print('red', 'Sorry %j already exists ... derp', filepath)
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

		fs.mkdirSync(filepath + '/services/core');
		print('green', 'Made application directory %s', filepath + '/services/core');

		fs.mkdirSync(filepath + '/views');
		print('green', 'Made application directory %s', filepath + '/views');

		fs.mkdirSync(filepath + '/lib');
		print('green', 'Made application directory %s', filepath + '/lib');

		fs.mkdirSync(filepath + '/config');
		print('green', 'Made application directory %s', filepath + '/config');

		fs.mkdirSync(filepath + '/views/pages');
		print('green', 'Made application directory %s', filepath + '/views/pages');

		fs.mkdirSync(filepath + '/views/elements');
		print('green', 'Made application directory %s', filepath + '/views/elements');

		fs.mkdirSync(filepath + '/public');
		print('green', 'Made application directory %s', filepath + '/public');

		fs.mkdirSync(filepath + '/public/js');
		print('green', 'Made application directory %s', filepath + '/public/js');

		fs.mkdirSync(filepath + '/public/build');
		print('green', 'Made application directory %s', filepath + '/public/build');

		print();
		print('green', 'Made all application directories');
		print();

		//write package.json
		renderTemplate(
			path.resolve(__dirname, '../templates/package.json.tmpl'),
			(filepath + '/package.json'),
			{ author: execSync('whoami'), name: name }
		);

		//make application entry point
		renderTemplate(
			path.resolve(__dirname, '../templates/index.js.tmpl'),
			(filepath + '/index.js')
		);

		//make browser entry point
		renderTemplate(
			path.resolve(__dirname, '../templates/app.js.tmpl'),
			(filepath + '/public/js/app.js')
		);

		//make services/core/get
		renderTemplate(
			path.resolve(__dirname, '../templates/services-core/get.js.tmpl'),
			(filepath + '/services/core/get.js')
		);

		//make services/core/get
		renderTemplate(
			path.resolve(__dirname, '../templates/services-core/put.js.tmpl'),
			(filepath + '/services/core/put.js')
		);

		//make services/core/get
		renderTemplate(
			path.resolve(__dirname, '../templates/services-core/post.js.tmpl'),
			(filepath + '/services/core/post.js')
		);

		//make services/core/get
		renderTemplate(
			path.resolve(__dirname, '../templates/services-core/delete.js.tmpl'),
			(filepath + '/services/core/delete.js')
		);

		renderTemplate(
			path.resolve(__dirname, '../templates/routes.json.tmpl'),
			(filepath + '/config/routes.json')
		);

		renderTemplate(
			path.resolve(__dirname, '../templates/routes-client.js.tmpl'),
			(filepath + '/config/routes-client.js')
		);

		renderTemplate(
			path.resolve(__dirname, '../templates/express-routing.js.tmpl'),
			(filepath + '/lib/expressRouting.js')
		);

		renderTemplate(
			path.resolve(__dirname, '../templates/response-factory.js.tmpl'),
			(filepath + '/lib/responseFactory.js')
		);

		//should this be done for all not templateable resources?
		fs.createReadStream(path.resolve(__dirname, '../templates/page-template.js.tmpl'))
			.pipe(fs.createWriteStream(
				(filepath + '/lib/page-template.tmpl.js')
			));

		print('green', 'About to install deps ... this might take a while. Go get coffee.');

		//install npm deps
		var install = spawn('npm', ['install'], { cwd: filepath, env: process.env });
		install.stdout.on('data', function(data){ print('cyan', '%s', data) });
		install.stderr.on('data', function(data){
				print('red', 'Lamesource:');
				print('red', '- Oh no, much error!! looks like: %s', data);
		});

		install.on('close', function(code){

				print('green', 'Awesomesource:');
				print('green', '- Cool, it looks like the install went okay');

        //TODO --> figure out why this hangs

				//make new controller for Index Route
				var makeController = spawn('granola', ['-g', '-p', 'Index', '/'], { cwd: filepath, env: process.env });

				makeController.stdout.on('data', function(data){ print('cyan', '%s', data) });
				makeController.stderr.on('data', function(data){
						print('red', 'Lamesource:');
						print('red', '- Oh no, much error!! looks like: %s', data);
				});

				makeController.on('close', function(code){

						print('green', 'Awesomesource:');
						print('green', '- Cool, it looks like the Index controller got generated okay');
            process.exit();
				});

		});

};


function generateIndexController(){

}


















