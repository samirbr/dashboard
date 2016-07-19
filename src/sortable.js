import {customAttribute, inject} from 'aurelia-framework';
import $ from 'jquery';
import 'jquery-ui';

@customAttribute('sortable')
@inject(Element)
export class Sortable {
  constructor(element) {
    this.element = element;
  }

  bind() {
    $(this.element).sortable();
  }

  unbind() {
    $(this.element).sortable('destroy');
  }

  valueChanged(options) {
    $(this.element).sortable(options);
  }
}
