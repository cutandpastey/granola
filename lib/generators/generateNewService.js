var path = require('path');
var fs = require('fs');
var _ = require('underscore');
var superagent = require('superagent');

var print = require('../utils/print');
var packageInfo = require('../../package.json');
var renderFileTemplate = require('../utils/renderFileTemplate');
var stripValues = require('../utils/stripValues');
var generateNewModel = require('./generateNewModel');

module.exports = function(args, filter){

  var name = args[0];
  var url = args[1];

  var outputPath = path.resolve(process.cwd(), 'services');
  var outputFile = path.resolve(outputPath, name + '.js');

  if(!name){
    print('red', 'You need to give a service a name this should be the first arguments');
    process.exit();
  }

  //if theres no services folder
  if(!fs.existsSync(outputPath)){
    print();
    print('red', 'Lamesource:');
    print('red', '- Derp, Looks like you dont have a services folder.');
    print('red', '- Have you generated a new application?');
    print('red', '- Try %s -g -a { app-name } { folder-path }', packageInfo.name);
    print();
    process.exit();
  }

  if(url){

    superagent
    .get(url)
    .end(function(err, res) {
      if(err){
        console.log('oh no, much error getting to your endpoint :--> %s', err.toString());
        return;
      }

      var payload = filter ? res.body[filter] : res.body;
      if(_.isArray(payload)) payload = payload[0];
      payload = stripValues(payload);
      args[1] = payload;
      generateNewModel(args);
      
      renderFileTemplate(
        path.resolve(__dirname, '../templates/service.js.tmpl'),//src
        outputFile,
        { name: name, url: url }
      );
      process.exit();

    });
  }
  else{
    //render template if theres no url
   renderFileTemplate(
      path.resolve(__dirname, '../templates/service.js.tmpl'),//src
      outputFile,
      { name: name, url: url }
    ); 
    process.exit();
  }

};
