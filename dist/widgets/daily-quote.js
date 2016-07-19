'use strict';

System.register(['aurelia-framework', '../container'], function (_export, _context) {
  "use strict";

  var inject, Container, _createClass, _dec, _class, DAILY_QUOTE_URL, DailyQuote;

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
    }],
    execute: function () {
      _createClass = function () {
        function defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
          }
        }

        return function (Constructor, protoProps, staticProps) {
          if (protoProps) defineProperties(Constructor.prototype, protoProps);
          if (staticProps) defineProperties(Constructor, staticProps);
          return Constructor;
        };
      }();

      DAILY_QUOTE_URL = 'http://widget.calendarlabs.com/v1/quot.php';

      _export('DailyQuote', DailyQuote = (_dec = inject(Element), _dec(_class = function (_Container) {
        _inherits(DailyQuote, _Container);

        function DailyQuote() {
          _classCallCheck(this, DailyQuote);

          return _possibleConstructorReturn(this, _Container.apply(this, arguments));
        }

        _createClass(DailyQuote, [{
          key: 'url',
          get: function get() {
            var options = {
              cid: 101,
              c: 'random',
              uid: 382043810,
              l: 'en',
              cbg: 'FFFFFF',
              cb: 0,
              cbc: '000000',
              cf: 'helvetica',
              cfg: '000000',
              qfs: 'i',
              qta: 'center',
              tfg: '000000',
              tfs: 'i',
              afc: '000000',
              afs: 'i'
            };

            var query = Object.keys(options).map(function (key) {
              return key + '=' + options[key];
            }).join('&');

            return DAILY_QUOTE_URL + '?' + query;
          }
        }]);

        return DailyQuote;
      }(Container)) || _class));

      _export('DailyQuote', DailyQuote);
    }
  };
});
//# sourceMappingURL=daily-quote.js.map
