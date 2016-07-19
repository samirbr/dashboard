'use strict';

System.register(['aurelia-framework', '../container', 'aurelia-fetch-client', '../application-state'], function (_export, _context) {
  "use strict";

  var inject, TaskQueue, Container, HttpClient, ApplicationState, _dec, _class, QUANDL_PEC_URL, Chart;

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
      TaskQueue = _aureliaFramework.TaskQueue;
    }, function (_container) {
      Container = _container.Container;
    }, function (_aureliaFetchClient) {
      HttpClient = _aureliaFetchClient.HttpClient;
    }, function (_applicationState) {
      ApplicationState = _applicationState.ApplicationState;
    }],
    execute: function () {
      QUANDL_PEC_URL = 'https://www.quandl.com/api/v3/datasets/';

      _export('Chart', Chart = (_dec = inject(Element, TaskQueue), _dec(_class = function (_Container) {
        _inherits(Chart, _Container);

        function Chart(element, taskQueue) {
          _classCallCheck(this, Chart);

          var _this = _possibleConstructorReturn(this, _Container.call(this, element));

          _this.taskQueue = taskQueue;
          _this.token = ApplicationState.tokens.quandl;
          return _this;
        }

        Chart.prototype.draw = function draw(dataset) {
          var axis = ['h', 'v'];
          var types = {
            'Date': 'date',
            'Value': 'number'
          };
          var options = {
            title: dataset.name,
            width: this.width,
            height: this.height
          };
          var table = new google.visualization.DataTable();

          dataset.column_names.forEach(function (name, index) {
            options['${axis[index]}Axis'] = { title: name };
            table.addColumn(types[name], name);
          });

          table.addRows(dataset.data.map(function (row) {
            var date = row[0];
            var value = row[1];

            return [new Date(date.replace(/-/g, '/')), value];
          }));

          var chart = new google.visualization.LineChart(this.chart);
          chart.draw(table, options);
        };

        Chart.prototype.attached = function attached() {
          var _this2 = this;

          var http = new HttpClient();
          http.configure(function (config) {
            config.useStandardConfiguration().withDefaults({
              mode: 'cors',
              headers: {
                'Accept': 'application/json'
              }
            });
          });

          this.taskQueue.queueMicroTask(function () {
            http.fetch('' + QUANDL_PEC_URL + _this2.config.series + '?api_key=' + _this2.token).then(function (response) {
              return response.json();
            }).then(function (data) {
              ApplicationState.loadExternal().then(function () {
                _this2.draw(data.dataset);
              });
            });
          });
        };

        return Chart;
      }(Container)) || _class));

      _export('Chart', Chart);
    }
  };
});
//# sourceMappingURL=chart.js.map
