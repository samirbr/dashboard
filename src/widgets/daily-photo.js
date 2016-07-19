import {HttpClient} from 'aurelia-fetch-client';
import {inject} from 'aurelia-framework';
import {Container} from '../container';

const APOD_URL = 'https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY';

@inject(Element)
export class DailyPhoto extends Container {
  data = '';

  attached() {
    super.attached();

    let http = new HttpClient();
    http.configure(config => {
      config
        .useStandardConfiguration()
        .withDefaults({
          mode: 'cors',
          headers: {
            'Accept': 'application/json'
          }
        });
    });

    http.fetch(APOD_URL)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        this.url = data.url;
        this.title = data.title;
        this.hdurl = data.hdurl;

        this.toUri(this.url)
          .then((data) => {
            this.data = data;
          });
      });
  }

  toUri(url) {
    let self = this;

    return new Promise(function(resolve, reject) {
      var image = new Image();
      image.setAttribute('crossOrigin', 'Anonymous');
      image.onload = function(event) {
        let canvas = document.createElement('canvas');
        let context = canvas.getContext('2d');
        canvas.width = self.width;
        canvas.height = canvas.width * (this.naturalHeight / this.naturalWidth);

        context.drawImage(this, 0, 0, this.naturalHeight, this.naturalWidth,
        0, 0, canvas.width, canvas.height);

        // Get raw image data
        resolve(canvas.toDataURL('image/png'));
      };

      image.onerror = reject;
      image.src = url;
    });
  }
}
