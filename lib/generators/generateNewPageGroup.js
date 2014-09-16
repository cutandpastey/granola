var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var execSync = require('exec-sync');

var renderFileTemplate = require('../utils/renderFileTemplate');
var generateNewPageController = require('./generateNewPageController');
var generateNewModel = require('./generateNewModel');
var generateNewPage = require('./generateNewPage');


module.exports = function(args){

    var name = args[0];
		var url = args[1];

		if(!url){ throw new Error('A url is required when generating a page') }

		//generate route manifest for node js
		var routeManifestPath = path.resolve(process.cwd(), 'config', 'routes.json')
		var routeManifest = fs.readFileSync(routeManifestPath).toString();
		routeManifest = JSON.parse(routeManifest);

		routeManifest[url] = (name + 'Controller');
		routeManifest = JSON.stringify(routeManifest);

		//write new route config file
		fs.writeFileSync(routeManifestPath, routeManifest, 'utf-8');

		//generate page elements
		generateNewModel([name]);
		generateNewPageController([name]);
		generateNewPage([name]);

		var browserDepsPath = path.resolve(process.cwd(), 'config', 'routes-client');
		var browserDeps = require(browserDepsPath);

		var controllerName = name + 'Controller'

		if(!browserDeps[controllerName]){

				var command = 'rm -f ' + (browserDepsPath += '.js');
				execSync(command);

				browserDeps[controllerName] = ' ';

				var content = [];

				Object.keys(browserDeps).forEach(function (key){
				    content.push(
					      [
							      (key += ''),
						        ': ',
								    'require("../controllers/' + key + '"),'
					      ].join('')
				    );

				});

				renderFileTemplate(
					path.resolve(__dirname, '../templates/routes-client.js.tmpl'),//src
					browserDepsPath,
					{ content: content.join('\n') }
				);

		}
};
