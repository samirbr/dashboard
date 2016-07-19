import {inject} from 'aurelia-framework';
import {Container} from '../container';

@inject(Element)
export class HtmlContent extends Container {

  get url() {
    return this.config.url;
  }
}
