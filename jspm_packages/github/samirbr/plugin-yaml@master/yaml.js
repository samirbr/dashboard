/*
  YAML plugin
*/

var jsyaml = require('js-yaml');

exports.translate = function(load) {
  return 'module.exports = ' + JSON.stringify(jsyaml.load(load.source));
}
