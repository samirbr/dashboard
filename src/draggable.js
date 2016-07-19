import {customAttribute, inject} from 'aurelia-framework';
import $ from 'jquery';
import 'jquery-ui';

@customAttribute('draggable')
@inject(Element)
export class Draggable {
  constructor(element) {
    this.element = element;
  }

  unbind() {
    $(this.element).draggable('destroy');
  }

  valueChanged(options) {
    $(this.element).draggable(options);
  }
}
