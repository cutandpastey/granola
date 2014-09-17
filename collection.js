var _ = require('underscore');
var Backbone = require('backbone');

var BaseCollection = function() {
  Backbone.Collection.apply(this, arguments);
}

BaseCollection.prototype = new Backbone.Collection();

_.extend(BaseCollection.prototype, {
  
})

module.exports = BaseCollection;
