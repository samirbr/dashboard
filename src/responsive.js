import {customAttribute, inject} from 'aurelia-framework';
import $ from 'jquery';
import 'mansory';

@customAttribute('draggable')
@inject(Element)
export class Draggable {
  constructor(element) {
    this.element = element;
  }

  bind() {
    $(this.element).masonry();
  }

  unbind() {
    $(this.element).masonry('destroy');
  }

  valueChanged(options) {
    $(this.element).masonry(options);
  }
}
