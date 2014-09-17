var spawn = require('child_process').spawn;
var Q = require('q');
var print = require('./print');

module.exports = function(cmd, args, opts){
  var deferred = Q.defer();
  
  var command = spawn(cmd, args, opts);
  command.stdout.on('data', function(data) { print('green', '%s', data) });
  command.stderr.on('data', function(data) { print('red', '%s', data) });
  command.on('close', function(data) { 
    deferred.resolve();
  });
  
  return deferred.promise;
}
