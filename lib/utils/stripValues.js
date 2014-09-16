var _ = require('underscore');

module.exports = function stripValues(src) {

  if(_.isString(src)) {
    return src
  }

  var dest = _.isArray(src) ? [] : {};
  var keys = _.isArray(src) ? src : Object.keys(src);

  keys.forEach(function(key){//loop through the src object by key
    
    var val = src[key];
    if(_.isString(val) || _.isNumber(val) || _.isUndefined(val) ){ dest[key] = ''  }
     
    else if(_.isArray(val)){
      var tempData = '';
      if(_.isObject(val[0])){ tempData = stripValues(val[0]) };
      dest[key] = tempData ? [tempData] : [];
    }

    else if(_.isObject(val)){
      dest[key] = stripValues(val);
    }

  });

  return dest;
}

