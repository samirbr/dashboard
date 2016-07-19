import {script} from 'util';

export class ApplicationState {
  static set(key, value) {
    this[key] = value;
  }
}
