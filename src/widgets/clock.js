import {inject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';
import {Container} from '../container';
import {ApplicationState} from '../application-state';

const WORLD_TIME_SERVER_URL = 'http://widgets.worldtimeserver.com/Clock.aspx';
const GOOGLE_GEOCODE_URL = 'https://maps.googleapis.com/maps/api/geocode/json';

@inject(Element)
export class Clock extends Container {

  constructor(element) {
    super(element);

    this.token = ApplicationState.tokens.google;
  }

  getUrl(city) {
    city = encodeURIComponent(city);
    return `${WORLD_TIME_SERVER_URL}?theme=Analog&wtsid=US-CA&hex=${this.config.color}&city=${city}&size=small`;
  }

  get local() {
    return this.getUrl(this.config.local);
  }

  get other() {
    return this.getUrl(this.config.city);
  }

  bind() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        let { latitude, longitude } = position.coords;

        let latlng = { lat: latitude, lng: longitude };
        let url = `${GOOGLE_GEOCODE_URL}?latlng=${latitude},${longitude}&key=${this.token}`;
        let http = new HttpClient();

        http.fetch(url)
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            if (data.status === 'OK') {
              data.results[0].address_components.forEach((component) => {
                if (component.types.every((type) => {
                  return ['political', 'locality'].indexOf(type) !== -1;
                })) {
                  this.config.local = component.long_name;
                }
              });
            }
          });
      });
    }
  }
}
