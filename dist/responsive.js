'use strict';

System.register(['aurelia-framework', 'jquery', 'mansory'], function (_export, _context) {
  "use strict";

  var customAttribute, inject, $, _dec, _dec2, _class, Draggable;

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
    }, function (_mansory) {}],
    execute: function () {
      _export('Draggable', Draggable = (_dec = customAttribute('draggable'), _dec2 = inject(Element), _dec(_class = _dec2(_class = function () {
        function Draggable(element) {
          _classCallCheck(this, Draggable);

          this.element = element;
        }

        Draggable.prototype.bind = function bind() {
          $(this.element).masonry();
        };

        Draggable.prototype.unbind = function unbind() {
          $(this.element).masonry('destroy');
        };

        Draggable.prototype.valueChanged = function valueChanged(options) {
          $(this.element).masonry(options);
        };

        return Draggable;
      }()) || _class) || _class));

      _export('Draggable', Draggable);
    }
  };
});
//# sourceMappingURL=responsive.js.map
