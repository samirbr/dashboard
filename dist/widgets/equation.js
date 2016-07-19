'use strict';

System.register(['aurelia-framework', '../container', 'katex/katex/katex.min.css!css', 'katex'], function (_export, _context) {
  "use strict";

  var inject, Container, katex, _dec, _class, Equation;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }

  return {
    setters: [function (_aureliaFramework) {
      inject = _aureliaFramework.inject;
    }, function (_container) {
      Container = _container.Container;
    }, function (_katexKatexKatexMinCssCss) {}, function (_katex) {
      katex = _katex.default;
    }],
    execute: function () {
      _export('Equation', Equation = (_dec = inject(Element), _dec(_class = function (_Container) {
        _inherits(Equation, _Container);

        function Equation() {
          _classCallCheck(this, Equation);

          return _possibleConstructorReturn(this, _Container.apply(this, arguments));
        }

        Equation.prototype.bind = function bind() {
          katex.render(this.config.formula, this.equation);
        };

        return Equation;
      }(Container)) || _class));

      _export('Equation', Equation);
    }
  };
});
//# sourceMappingURL=equation.js.map
