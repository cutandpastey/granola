var _ = require('underscore');
var Backbone = require('backbone');

var Model = function(){ Backbone.Model.apply(this, arguments) };

Model.prototype = new Backbone.Model({});

_.extend(Model.prototype, { });


module.exports = Model;