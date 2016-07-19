'use strict';

System.register(['aurelia-framework', '../container', '../application-state', 'leaflet/dist/leaflet.css!css', 'leaflet'], function (_export, _context) {
  "use strict";

  var inject, Container, ApplicationState, L, _createClass, _dec, _class, MAPBOX_URL, CityMap;

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
    }, function (_applicationState) {
      ApplicationState = _applicationState.ApplicationState;
    }, function (_leafletDistLeafletCssCss) {}, function (_leaflet) {
      L = _leaflet.default;
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

      MAPBOX_URL = 'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png';

      _export('CityMap', CityMap = (_dec = inject(Element), _dec(_class = function (_Container) {
        _inherits(CityMap, _Container);

        function CityMap(element) {
          _classCallCheck(this, CityMap);

          var _this = _possibleConstructorReturn(this, _Container.call(this, element));

          _this.token = ApplicationState.tokens.mapbox;
          return _this;
        }

        CityMap.prototype.attached = function attached() {
          _Container.prototype.attached.call(this);

          var map = L.map(this.map).setView([this.config.lat, this.config.lng], this.config.zoom);

          L.tileLayer(this.url, {
            maxZoom: 18,
            attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' + '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' + 'Imagery © <a href="http://mapbox.com">Mapbox</a>',
            id: 'mapbox.streets'
          }).addTo(map);
        };

        _createClass(CityMap, [{
          key: 'url',
          get: function get() {
            return MAPBOX_URL + '?access_token=' + this.token;
          }
        }]);

        return CityMap;
      }(Container)) || _class));

      _export('CityMap', CityMap);
    }
  };
});
//# sourceMappingURL=city-map.js.map
