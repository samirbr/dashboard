import {inject} from 'aurelia-framework';
import {Container} from '../container';

const FORECAST_IO_URL = 'http://forecast.io/embed/';

@inject(Element)
export class Weather extends Container {

  get url() {
    return `${FORECAST_IO_URL}#lat=${this.config.lat}&lon=${this.config.lng}&name=${this.config.name}`;
  }
}
