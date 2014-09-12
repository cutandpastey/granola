var Q = require('q');
var React = require('react');
var mediator = require('granola/mediator');
var isNode = require('granola/lib/utils/isNode');


var BaseController = function BaseController(){ this.initialize.apply(this, arguments) };

BaseController.prototype = {

		mediator: mediator,
		view    : React.createClass({render: function(){ return React.DOM.br() }}),

		initialize: function(){ },

		render: function(){

				this.payload = (this.payload || { model: this.model || {} });

				var computedView = this.view(this.payload);

				Q()

					.then(function(){

							if(isNode()){ this.mediator.publish('application:render', React.renderComponentToString(computedView)) }
							else {

									React.renderComponent(
										computedView,
										document.querySelector('body')
									);

							}

					}.bind(this))

					.catch(function(e){

							console.log('-------------------------------');
							console.log('error rendering react');
							console.log(e);
							console.log(e.stack);
							console.log(this);
							console.log('-------------------------------');

							this.mediator.publish('application:error', e);

					}.bind(this))

					.done();

		},
		clear : function(){}

};

module.exports = BaseController;