'use strict';

System.register(['aurelia-framework', '../container', '../util'], function (_export, _context) {
  "use strict";

  var inject, Container, script, _dec, _class, Stock;

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
    }, function (_util) {
      script = _util.script;
    }],
    execute: function () {
      _export('Stock', Stock = (_dec = inject(Element), _dec(_class = function (_Container) {
        _inherits(Stock, _Container);

        function Stock() {
          _classCallCheck(this, Stock);

          return _possibleConstructorReturn(this, _Container.apply(this, arguments));
        }

        Stock.prototype.attached = function attached() {
          var self = this;

          script('https://d33t3vvu2t2yu5.cloudfront.net/tv.js').then(function () {
            TradingView.gEl = function (element) {
              if (typeof element === 'string') {
                element = document.getElementById(element);
              }

              return element;
            };

            new TradingView.MiniWidget({
              "width": self.width,
              "height": self.height,
              "symbol": self.config.symbol,
              "interval": "D",
              "timezone": "Etc/UTC",
              "theme": "White",
              "style": "1",
              "locale": "en",
              "toolbar_bg": "#f1f3f6",
              "allow_symbol_change": true,
              "hideideas": true,
              "show_popup_button": true,
              "popup_width": "1000",
              "popup_height": "650",
              "no_referral_id": true,
              "container_id": self.stock
            });
          });
        };

        return Stock;
      }(Container)) || _class));

      _export('Stock', Stock);
    }
  };
});
//# sourceMappingURL=stock.js.map
