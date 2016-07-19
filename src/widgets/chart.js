import {inject, TaskQueue} from 'aurelia-framework';
import {Container} from '../container';
import {HttpClient} from 'aurelia-fetch-client';
import {ApplicationState} from '../application-state';

const QUANDL_PEC_URL = 'https://www.quandl.com/api/v3/datasets/';

@inject(Element, TaskQueue)
export class Chart extends Container {
  constructor(element, taskQueue) {
    super(element);

    this.taskQueue = taskQueue;
    this.token = ApplicationState.tokens.quandl;
  }

  draw(dataset) {
    let axis = ['h', 'v'];
    let types = {
      'Date': 'date',
      'Value': 'number'
    };
    let options = {
      title: dataset.name,
      width: this.width,
      height: this.height
    };
    let table = new google.visualization.DataTable();

    dataset.column_names.forEach((name, index) => {
      options['${axis[index]}Axis'] = { title: name };
      table.addColumn(types[name], name);
    });

    table.addRows(dataset.data.map((row) => {
      let [date, value] = row;
      return [new Date(date.replace(/-/g, '/')), value];
    }));

    let chart = new google.visualization.LineChart(this.chart);
    chart.draw(table, options);
  }

  attached() {
    let http = new HttpClient();
    http.configure(config => {
      config
        .useStandardConfiguration()
        .withDefaults({
          mode: 'cors',
          headers: {
            'Accept': 'application/json'
          }
        });
    });

    this.taskQueue.queueMicroTask(() => {
      http.fetch(`${QUANDL_PEC_URL}${this.config.series}?api_key=${this.token}`)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          ApplicationState.loadExternal()
            .then(() => {
              this.draw(data.dataset);
            });
        });
    });
  }
}
