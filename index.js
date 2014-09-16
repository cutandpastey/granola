var path = require('path');
var isNode = require('./lib/utils/isNode');

var expressRouter = require(path.resolve(process.cwd(), 'config/routes.json'));

module.exports = {

		controller: require('./controller'),
		mediator  : require('./mediator'),
		isNode    : isNode,

		router: function(app){
				if(isNode()){
						console.log('-------------------------------');
						console.log(routes);
						console.log('-------------------------------');
				}
		}
}
