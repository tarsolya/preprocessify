'use strict';

var transformTools = require('browserify-transform-tools');
var pp = require('preprocess');
var options = {includeExtensions: [".js"]};

module.exports = transformTools.makeStringTransform("preprocessify", options,
  function (src, transformOptions, done) {
    var preprocessContext;
    if (transformOptions.config) {
      preprocessContext = transformOptions.config;
    }
    done(null, pp.preprocess(src, preprocessContext, 'js'));
  }
);

