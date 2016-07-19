import {inject} from 'aurelia-framework';
import {Container} from '../container';
import 'katex/katex/katex.min.css!css';
import katex from 'katex';

@inject(Element)
export class Equation extends Container {
  bind() {
    katex.render(this.config.formula, this.equation);
  }
}
