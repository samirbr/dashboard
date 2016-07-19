'use strict';

System.register(['aurelia-fetch-client', 'aurelia-framework', '../container'], function (_export, _context) {
  "use strict";

  var HttpClient, inject, Container, _dec, _class, APOD_URL, DailyPhoto;

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
    setters: [function (_aureliaFetchClient) {
      HttpClient = _aureliaFetchClient.HttpClient;
    }, function (_aureliaFramework) {
      inject = _aureliaFramework.inject;
    }, function (_container) {
      Container = _container.Container;
    }],
    execute: function () {
      APOD_URL = 'https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY';

      _export('DailyPhoto', DailyPhoto = (_dec = inject(Element), _dec(_class = function (_Container) {
        _inherits(DailyPhoto, _Container);

        function DailyPhoto() {
          var _temp, _this, _ret;

          _classCallCheck(this, DailyPhoto);

          for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          return _ret = (_temp = (_this = _possibleConstructorReturn(this, _Container.call.apply(_Container, [this].concat(args))), _this), _this.data = '', _temp), _possibleConstructorReturn(_this, _ret);
        }

        DailyPhoto.prototype.attached = function attached() {
          var _this2 = this;

          _Container.prototype.attached.call(this);

          var http = new HttpClient();
          http.configure(function (config) {
            config.useStandardConfiguration().withDefaults({
              mode: 'cors',
              headers: {
                'Accept': 'application/json'
              }
            });
          });

          http.fetch(APOD_URL).then(function (response) {
            return response.json();
          }).then(function (data) {
            _this2.url = data.url;
            _this2.title = data.title;
            _this2.hdurl = data.hdurl;

            _this2.toUri(_this2.url).then(function (data) {
              _this2.data = data;
            });
          });
        };

        DailyPhoto.prototype.toUri = function toUri(url) {
          var self = this;

          return new Promise(function (resolve, reject) {
            var image = new Image();
            image.setAttribute('crossOrigin', 'Anonymous');
            image.onload = function (event) {
              var canvas = document.createElement('canvas');
              var context = canvas.getContext('2d');
              canvas.width = self.width;
              canvas.height = canvas.width * (this.naturalHeight / this.naturalWidth);

              context.drawImage(this, 0, 0, this.naturalHeight, this.naturalWidth, 0, 0, canvas.width, canvas.height);

              resolve(canvas.toDataURL('image/png'));
            };

            image.onerror = reject;
            image.src = url;
          });
        };

        return DailyPhoto;
      }(Container)) || _class));

      _export('DailyPhoto', DailyPhoto);
    }
  };
});
//# sourceMappingURL=daily-photo.js.map
