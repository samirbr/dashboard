'use strict';

System.register(['jquery'], function (_export, _context) {
  "use strict";

  var $, Container;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [function (_jquery) {
      $ = _jquery.default;
    }],
    execute: function () {
      _export('Container', Container = function () {
        function Container(element) {
          _classCallCheck(this, Container);

          this.element = element;
        }

        Container.prototype.activate = function activate(config) {
          this.config = config;
        };

        Container.prototype.bind = function bind() {};

        Container.prototype.attached = function attached() {
          var $container = $(this.element).parent();

          this.width = $container.width();
          this.height = $container.height();
        };

        return Container;
      }());

      _export('Container', Container);
    }
  };
});
//# sourceMappingURL=container.js.map
