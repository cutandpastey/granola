var _ = require('underscore');
var Backbone = require('backbone');
var model = require('granola/model');

var BaseCollection = function() {
  Backbone.Collection.apply(this, arguments);
}

BaseCollection.prototype = new Backbone.Collection();

_.extend(BaseCollection.prototype, {
  model: model
})

module.exports = BaseCollection;
