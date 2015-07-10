preprocessify
=============

A browserify transform creator that applies [preprocess](https://github.com/jsoverson/preprocess) to js files before bundling them.

Example use in a gulp file...
```
var preprocessify = require('preprocessify');

gulp.task('browserify', function() {
    return browserify('./app/scripts/main.js')
        .external(libs)
        .transform(preprocessify.configure({"FOO": "bar"})) // This will replace "/* @echo FOO */" with "bar"
        .transform(partialify)
        .bundle({debug: true})
        .pipe(source('main.js'))
        .pipe(gulp.dest(config.dist + '/scripts/'));
});
```

You can also specify preprocessify as a transform in your package.json.
In package.json...
```
{
  "browserify": {
    "transform": [
      "preprocessify"
    ]
  }
}
```

Configuration can also be specified in package.json. If no context is configured, preprocess will use the environment as the context.
```
{
  "preprocessify": {
    "FOO": "bar"
  }
}
```

You can use this in combination with [konfig](https://github.com/vngrs/konfig) to define environment specific variables like this...
In ./config/app.json...
```
{
    "development": {
        "bar": "development bar value"
    },
    "test": {
        "bar": "test bar value"
    },
    "production": {
        "bar": "production bar value"
    }
}
```

In gulp file...
```
var config = require('konfig')();
var preprocessify = require('preprocessify');

gulp.task('browserify', function() {
    return browserify('./app/scripts/main.js')
        .external(libs)
        .transform(preprocessify.configure(config.app)) // When the environment variable NODE_ENV=test, "/* @echo bar */" gets replaced with "test bar value"
        .transform(partialify)
        .bundle({debug: true})
        .pipe(source('main.js'))
        .pipe(gulp.dest(config.dist + '/scripts/'));
});
```

See also: [preprocess](https://github.com/jsoverson/preprocess) and [gulp-preprocess](https://github.com/jas/gulp-preprocess)
