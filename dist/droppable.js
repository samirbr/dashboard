'use strict';

System.register(['aurelia-framework', 'jquery', 'jquery-ui'], function (_export, _context) {
  "use strict";

  var customAttribute, inject, $, _dec, _dec2, _class, Droppable;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [function (_aureliaFramework) {
      customAttribute = _aureliaFramework.customAttribute;
      inject = _aureliaFramework.inject;
    }, function (_jquery) {
      $ = _jquery.default;
    }, function (_jqueryUi) {}],
    execute: function () {
      _export('Droppable', Droppable = (_dec = customAttribute('droppable'), _dec2 = inject(Element), _dec(_class = _dec2(_class = function () {
        function Droppable(element) {
          _classCallCheck(this, Droppable);

          this.element = element;
        }

        Droppable.prototype.bind = function bind() {
          $(this.element).droppable();
        };

        Droppable.prototype.unbind = function unbind() {
          $(this.element).droppable('destroy');
        };

        Droppable.prototype.valueChanged = function valueChanged(options) {
          $(this.element).droppable(options);
        };

        return Droppable;
      }()) || _class) || _class));

      _export('Droppable', Droppable);
    }
  };
});
//# sourceMappingURL=droppable.js.map
