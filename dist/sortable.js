'use strict';

System.register(['aurelia-framework', 'jquery', 'jquery-ui'], function (_export, _context) {
  "use strict";

  var customAttribute, inject, $, _dec, _dec2, _class, Sortable;

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
      _export('Sortable', Sortable = (_dec = customAttribute('sortable'), _dec2 = inject(Element), _dec(_class = _dec2(_class = function () {
        function Sortable(element) {
          _classCallCheck(this, Sortable);

          this.element = element;
        }

        Sortable.prototype.bind = function bind() {
          $(this.element).sortable();
        };

        Sortable.prototype.unbind = function unbind() {
          $(this.element).sortable('destroy');
        };

        Sortable.prototype.valueChanged = function valueChanged(options) {
          $(this.element).sortable(options);
        };

        return Sortable;
      }()) || _class) || _class));

      _export('Sortable', Sortable);
    }
  };
});
//# sourceMappingURL=sortable.js.map
