var _ = require('underscore');

var generateNewController = require('./generateNewController');
var generateNewModel = require('./generateNewModel');
var generateNewPage = require('./generateNewPage');


module.exports = function (attrs){
		generateNewModel(attrs);
		generateNewPageController(attrs);
		generateNewPage(attrs);
};