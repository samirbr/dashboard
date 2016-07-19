import {inject} from 'aurelia-framework';
import {Container} from '../container';
import {script} from '../util';

@inject(Element)
export class Stock extends Container {

  attached() {
    let self = this;

    script('https://d33t3vvu2t2yu5.cloudfront.net/tv.js')
      .then(() => {
        TradingView.gEl = (element) => {
          if (typeof element === 'string') {
            element = document.getElementById(element);
          }

          return element;
        };

        new TradingView.MiniWidget({
          "width": self.width,
          "height": self.height,
          "symbol": self.config.symbol,
          "interval": "D",
          "timezone": "Etc/UTC",
          "theme": "White",
          "style": "1",
          "locale": "en",
          "toolbar_bg": "#f1f3f6",
          "allow_symbol_change": true,
          "hideideas": true,
          "show_popup_button": true,
          "popup_width": "1000",
          "popup_height": "650",
          "no_referral_id": true,
          "container_id": self.stock
        });
      });
  }
}
