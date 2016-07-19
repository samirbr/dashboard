import {inject} from 'aurelia-framework';
import {ApplicationState} from './application-state';
import config from '../config/widgets.yaml!';
import 'bootstrap/css/bootstrap.css!css';

export class App {

  constructor() {
    ApplicationState.set('tokens', config.global.tokens);
    this.slots = config.slots;
  }

  drag(event, ui) {

  }

  drop(event, ui) {

  }

  sort(event, ui) {

  }
}
