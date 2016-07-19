import {inject} from 'aurelia-framework';
import {Container} from '../container';

const DAILY_QUOTE_URL = 'http://widget.calendarlabs.com/v1/quot.php';

@inject(Element)
export class DailyQuote extends Container {

  get url() {
    let options = {
      cid: 101,
      c: 'random',
      uid: 382043810,
      l: 'en',
      cbg: 'FFFFFF',
      cb: 0,
      cbc: '000000',
      cf: 'helvetica',
      cfg: '000000',
      qfs: 'i',
      qta: 'center',
      tfg: '000000',
      tfs: 'i',
      afc: '000000',
      afs: 'i'
    };

    let query = Object.keys(options)
      .map((key) => {
        return `${key}=${options[key]}`;
      })
      .join('&');

    return `${DAILY_QUOTE_URL}?${query}`;
  }
}
