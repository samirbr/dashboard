import $ from 'jquery';

export class Container {
  constructor(element) {
    this.element = element;
  }

  activate(config) {
    this.config = config;
  }

  bind() {

  }

  attached() {
    let $container = $(this.element)
    .parent();

    this.width = $container.width();
    this.height = $container.height();
  }
}
