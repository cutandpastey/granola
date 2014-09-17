#!/usr/bin/env node

require('node-jsx').install({extension: '.jsx'});

/*
 TODO -->

 move app generation into lib/app and require it here
 - this makes it more testable

 add testing and test stub generation
 - everyone should test stuff dummy

 */
var spawn       = require('child_process').spawn;
var program     = require('commander');
var _           = require('underscore');

var stripValues = require('../lib/utils/stripValues');
var print       = require('../lib/utils/print');

var packageInfo = require('../package.json');

generatorMap = {
  app       : require('../lib/generators/generateNewApplicationBoilerplate'),
  controller: require('../lib/generators/generateNewController'),
  model     : require('../lib/generators/generateNewModel'),
  service   : require('../lib/generators/generateNewService'),
  element   : require('../lib/generators/generateNewElement'),
  view      : require('../lib/generators/generateNewPage'),
  page      : require('../lib/generators/generateNewPageGroup')
};


/*
 Setup commander options
 */
program
  .version(packageInfo.version)
  .option('-f --filter [term]', 'Filter service generation respose by [term] ie res.body[term]');

/*
 Custom help text
 */
program.on('--help', function(){ 
  
  console.log('  Generators:');
  console.log();
  console.log('    granola generate app        { Name } { filepath }');
  console.log('    granola generate model      { Name }');
  console.log('    granola generate view       { Name }');
  console.log('    granola generate controller { Name }');
  console.log('    granola generate service    { Name } { url }');
  console.log('    granola generate element    { Name }');
  console.log();

});

program.parse(process.argv);


//program variables
var exexcutable = process.argv.splice(0, 1);
var granolaPath = process.argv.splice(0, 1);
var type       = process.argv.splice(0, 1)[0];

if(_.isArray(type)) type = type[0];
generatorMap[type](process.argv, program.filter);



/*
Process any stdin that is piped into the program
 */

/*
var stdin = '';
process.stdin.setEncoding('utf-8')
process.stdin.on('readable', function () {
  var data = process.stdin.read();
  if(data && data.toString) stdin += data.toString();
});

process.stdin.on('end', function(){
  stdin = JSON.parse(stdin);
  var modelData = _.isArray(stdin[program.term]) ? stdin[program.term][0] : stdin[program.term];
  modelData = stripValues(modelData);
//  console.log(modelData);
});
*/

