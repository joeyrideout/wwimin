var hm = require("html-minifier");
var nm = require("node-minify");
var fs = require('fs');
var uncss = require('uncss');

function minifyAndCleanHtml() {
  fs.readFile('index_source.html', 'utf8', function (err,data) {
    if (err) {
      return console.log(err);
    }

    var output = hm.minify(data, {
      removeComments: false,
      removeCommentsFromCDATA: true,
      collapseBooleanAttributes: true,
      collapseWhitespace: true,
      // conservativeCollapse: true,
      removeEmptyAttributes: true
    });

    options = {
      stylesheets  : ['wwimin.blob.css']
    };
    uncss(output, options, function (error, output) {
        fs.writeFile('wwimin.clean.blob.css', output, function (err,data) {
          if (err) {
            return console.log(err);
          }
          new nm.minify({
            type: 'yui-css',
            fileIn: ['wwimin.clean.blob.css'],
            fileOut: 'wwimin.min.css',
            callback: function(err, min){
              if (err) {
                return console.log(err);
              }
            }
          });
        });
    });

    fs.writeFile('index.html', output, function (err,data) {
      if (err) {
        return console.log(err);
      }
    });
  })
}

new nm.minify({
  type: 'yui-css',
  fileIn: ['static/bootstrap.min.css', 'custom.css'],
  fileOut: 'wwimin.blob.css',
  callback: function(err, min){
    if (err) {
      return console.log(err);
    }
    minifyAndCleanHtml();
  }
});

