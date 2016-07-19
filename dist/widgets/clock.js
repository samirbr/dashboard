'use strict';

System.register(['aurelia-framework', 'aurelia-fetch-client', '../container', '../application-state'], function (_export, _context) {
  "use strict";

  var inject, HttpClient, Container, ApplicationState, _createClass, _dec, _class, WORLD_TIME_SERVER_URL, GOOGLE_GEOCODE_URL, Clock;

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
    }, function (_aureliaFetchClient) {
      HttpClient = _aureliaFetchClient.HttpClient;
    }, function (_container) {
      Container = _container.Container;
    }, function (_applicationState) {
      ApplicationState = _applicationState.ApplicationState;
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

      WORLD_TIME_SERVER_URL = 'http://widgets.worldtimeserver.com/Clock.aspx';
      GOOGLE_GEOCODE_URL = 'https://maps.googleapis.com/maps/api/geocode/json';

      _export('Clock', Clock = (_dec = inject(Element), _dec(_class = function (_Container) {
        _inherits(Clock, _Container);

        function Clock(element) {
          _classCallCheck(this, Clock);

          var _this = _possibleConstructorReturn(this, _Container.call(this, element));

          _this.token = ApplicationState.tokens.google;
          return _this;
        }

        Clock.prototype.getUrl = function getUrl(city) {
          city = encodeURIComponent(city);
          return WORLD_TIME_SERVER_URL + '?theme=Analog&wtsid=US-CA&hex=' + this.config.color + '&city=' + city + '&size=small';
        };

        Clock.prototype.bind = function bind() {
          var _this2 = this;

          if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
              var _position$coords = position.coords;
              var latitude = _position$coords.latitude;
              var longitude = _position$coords.longitude;


              var latlng = { lat: latitude, lng: longitude };
              var url = GOOGLE_GEOCODE_URL + '?latlng=' + latitude + ',' + longitude + '&key=' + _this2.token;
              var http = new HttpClient();

              http.fetch(url).then(function (response) {
                return response.json();
              }).then(function (data) {
                if (data.status === 'OK') {
                  data.results[0].address_components.forEach(function (component) {
                    if (component.types.every(function (type) {
                      return ['political', 'locality'].indexOf(type) !== -1;
                    })) {
                      _this2.config.local = component.long_name;
                    }
                  });
                }
              });
            });
          }
        };

        _createClass(Clock, [{
          key: 'local',
          get: function get() {
            return this.getUrl(this.config.local);
          }
        }, {
          key: 'other',
          get: function get() {
            return this.getUrl(this.config.city);
          }
        }]);

        return Clock;
      }(Container)) || _class));

      _export('Clock', Clock);
    }
  };
});
//# sourceMappingURL=clock.js.map
