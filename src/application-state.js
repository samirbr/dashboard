import {script} from 'util';

export class ApplicationState {
  static set(key, value) {
    this[key] = value;
  }

  static loaded = false;

  static loadExternal() {
    return script('https://www.gstatic.com/charts/loader.js')
      .then(() => {
        return new Promise((resolve, reject) => {
          if (!this.loaded) {

            google.charts.load('current', {packages: ['corechart', 'line']});
            google.charts.setOnLoadCallback(() => {
              this.loaded = true;
              resolve();
            });
          } else {
            setTimeout(resolve);
          }
        });
      });
  }
}
