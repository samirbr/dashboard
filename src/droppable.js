import {customAttribute, inject} from 'aurelia-framework';
import $ from 'jquery';
import 'jquery-ui';

@customAttribute('droppable')
@inject(Element)
export class Droppable {
  constructor(element) {
    this.element = element;
  }

  bind() {
    $(this.element).droppable();
  }

  unbind() {
    $(this.element).droppable('destroy');
  }

  valueChanged(options) {
    $(this.element).droppable(options);
  }
}
