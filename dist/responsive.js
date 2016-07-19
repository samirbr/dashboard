'use strict';

System.register(['aurelia-framework', 'masonry-layout'], function (_export, _context) {
  "use strict";

  var customAttribute, inject, Masonry, _dec, _dec2, _class, Responsive;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [function (_aureliaFramework) {
      customAttribute = _aureliaFramework.customAttribute;
      inject = _aureliaFramework.inject;
    }, function (_masonryLayout) {
      Masonry = _masonryLayout.default;
    }],
    execute: function () {
      _export('Responsive', Responsive = (_dec = customAttribute('responsive'), _dec2 = inject(Element), _dec(_class = _dec2(_class = function () {
        function Responsive(element) {
          _classCallCheck(this, Responsive);

          this.element = element;
        }

        Responsive.prototype.valueChanged = function valueChanged(options) {};

        return Responsive;
      }()) || _class) || _class));

      _export('Responsive', Responsive);
    }
  };
});
//# sourceMappingURL=responsive.js.map
