'use strict';

System.register(['util'], function (_export, _context) {
  "use strict";

  var script, ApplicationState;

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
      _export('ApplicationState', ApplicationState = function () {
        function ApplicationState() {
          _classCallCheck(this, ApplicationState);
        }

        ApplicationState.set = function set(key, value) {
          this[key] = value;
        };

        return ApplicationState;
      }());

      _export('ApplicationState', ApplicationState);
    }
  };
});
//# sourceMappingURL=application-state.js.map
