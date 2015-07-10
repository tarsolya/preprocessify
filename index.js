'use strict';

var extend = require('util')._extend;
var transformTools = require('browserify-transform-tools');
var pp = require('preprocess');
var options = { includeExtensions: ['.js'] };

module.exports = transformTools.makeStringTransform('preprocessify', options,
  function (src, transformOptions, done) {
    var cfgd = transformOptions.configData.config;
    var preprocessContext, contextFromJson = {};

    if (transformOptions.config) {
      preprocessContext = transformOptions.config;
    }
    if(cfgd && cfgd.c) {
      contextFromJson = require(cfgd.c);
    }
    done(
      null,
      pp.preprocess(src, extend(preprocessContext, contextFromJson), 'js')
    );
  }
);
