var path = require('path');
var fs = require('fs');
var spawn = require('child_process').spawn;
var util = require('util');

var Q = require('q');
var execSync = require('exec-sync');
var _ = require('underscore');

var print = require('../utils/print');
var renderTemplate = require('../utils/renderFileTemplate');
var generateNewPageGroup = require('../generators/generateNewPageGroup');
var spawnQ = require('../utils/spawnQ');

module.exports = function(args){

  var name = args[0] || ' ';
  var filepath = args[1] || './';

  filepath = path.resolve(process.cwd(), filepath, name);

  //check if dir exists and fail if it does
  if(fs.existsSync(filepath)){
    print('red', 'Sorry %j already exists ... derp', filepath)
    process.exit();
  }

  var messages = ['Awesomesource:', 'Looks like the application has been created successfully']
  var directories = [
    '',
    'controllers',
    'models',
    'collections',
    'views',
    'views/pages',
    'views/elements',
    'services',
    'services/core',
    'config',
    'lib',
    'public',
    'public/js',
    'public/build'
  ]

  var templates = [
    { template: 'package.json.tmpl', dest: 'package.json', payload: { author: execSync('whoami'), name: name } },    
    { template: 'routes-client.js.tmpl', dest: 'config/routes-client.js', payload: {} },
  ]

  var files = [
    { src: 'index.js.tmpl', dest: 'index.js' },
    { src: 'app.js.tmpl', dest: 'public/js/app.js' },
    { src: 'services-core/get.js.tmpl', dest: 'services/core/get.js' },
    { src: 'services-core/put.js.tmpl', dest: 'services/core/put.js' },
    { src: 'services-core/post.js.tmpl', dest: 'services/core/post.js' },
    { src: 'services-core/delete.js.tmpl', dest: 'services/core/delete.js' },
    { src: 'routes.json.tmpl', dest: 'config/routes.json' },
    { src: 'express-routing.js.tmpl', dest: 'lib/expressRouting.js' },
    { src: 'response-factory.js.tmpl', dest: 'lib/responseFactory.js' },
    { src: 'page-template.js.tmpl', dest: 'lib/page-template.tmpl.js' },
    { src: 'parse.js', dest: 'lib/parse.js' }
  ]

  try {

    directories.forEach(function(relativePath) {
      //write all directories
      var absolutePath = path.resolve(filepath, relativePath);
      fs.mkdirSync(absolutePath);
      messages.push(util.format('  ✔  written directory --> %s', absolutePath))
    });

    templates.forEach(function(templateData) {
      //render all templates
      renderTemplate(
        path.resolve(__dirname, '../templates', templateData.template),
        path.resolve(filepath, templateData.dest),
        templateData.payload
      )
      messages.push(util.format('  ✔  written template file --> %s', templateData.dest));
    })

    files.forEach(function(fileData) {
      //write all files into place
      var fileContent = fs.readFileSync(path.resolve(__dirname, '../templates', fileData.src));
      fs.writeFileSync(path.resolve(filepath, fileData.dest), fileContent, 'utf-8');
      messages.push(util.format('  ✔  written file --> %s', fileData.dest));
    })

  }

  //catch any file transfer errors
  catch (e){
   onApplicationError(e.toString()); 
  }

  print('green', messages.join('\n'))

  print()
  print('green', 'About to install deps ... this might take a while. Go get coffee.');

  spawnQ('npm', ['install'], { cwd: filepath })
  .then(function() {
    return spawnQ('granola', ['page', 'Index', '/'], { cwd: filepath })
  })
  .done();
  
  function onApplicationError(errString){
    var deleteCommand = 'rm -rf ' + filepath;
    execSync(deleteCommand);
    print('red', 'Oh no ... so much %s', errString);
    process.exit();
  }

};


