'use strict';

System.register(['aurelia-framework', './application-state', '../config/widgets.yaml!', 'bootstrap/css/bootstrap.css!css'], function (_export, _context) {
  "use strict";

  var inject, ApplicationState, config, App;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [function (_aureliaFramework) {
      inject = _aureliaFramework.inject;
    }, function (_applicationState) {
      ApplicationState = _applicationState.ApplicationState;
    }, function (_configWidgetsYaml) {
      config = _configWidgetsYaml.default;
    }, function (_bootstrapCssBootstrapCssCss) {}],
    execute: function () {
      _export('App', App = function () {
        function App() {
          _classCallCheck(this, App);

          ApplicationState.set('tokens', config.global.tokens);
          this.slots = config.slots;
        }

        App.prototype.drag = function drag(event, ui) {};

        App.prototype.drop = function drop(event, ui) {};

        App.prototype.sort = function sort(event, ui) {};

        return App;
      }());

      _export('App', App);
    }
  };
});
//# sourceMappingURL=app.js.map
