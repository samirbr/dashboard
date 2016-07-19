import {customAttribute, inject} from 'aurelia-framework';
import Masonry from 'masonry-layout';

@customAttribute('responsive')
@inject(Element)
export class Responsive {
  constructor(element) {
    this.element = element;
  }

  valueChanged(options) {
    // const masonry = new Masonry(this.element, options);
    // masonry.once('layoutComplete', () => {});
    // masonry.layout();
  }
}
