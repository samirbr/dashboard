'use strict';

System.register(['util'], function (_export, _context) {
  "use strict";

  var script, _class, _temp, ApplicationState;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [function (_util) {
      script = _util.script;
    }],
    execute: function () {
      _export('ApplicationState', ApplicationState = (_temp = _class = function () {
        function ApplicationState() {
          _classCallCheck(this, ApplicationState);
        }

        ApplicationState.set = function set(key, value) {
          this[key] = value;
        };

        ApplicationState.loadExternal = function loadExternal() {
          var _this = this;

          return script('https://www.gstatic.com/charts/loader.js').then(function () {
            return new Promise(function (resolve, reject) {
              if (!_this.loaded) {

                google.charts.load('current', { packages: ['corechart', 'line'] });
                google.charts.setOnLoadCallback(function () {
                  _this.loaded = true;
                  resolve();
                });
              } else {
                setTimeout(resolve);
              }
            });
          });
        };

        return ApplicationState;
      }(), _class.loaded = false, _temp));

      _export('ApplicationState', ApplicationState);
    }
  };
});
//# sourceMappingURL=application-state.js.map
