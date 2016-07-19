'use strict';

System.register(['bootstrap'], function (_export, _context) {
  "use strict";

  return {
    setters: [function (_bootstrap) {}],
    execute: function () {
      function configure(aurelia) {
        aurelia.use.standardConfiguration().developmentLogging();

        aurelia.start().then(function (a) {
          return a.setRoot();
        });
      }

      _export('configure', configure);
    }
  };
});
//# sourceMappingURL=main.js.map
