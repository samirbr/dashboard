import {inject} from 'aurelia-framework';
import {Container} from '../container';
import {ApplicationState} from '../application-state';
import 'leaflet/dist/leaflet.css!css';
import L from 'leaflet';

const MAPBOX_URL = 'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png';

@inject(Element)
export class CityMap extends Container {
  constructor(element) {
    super(element);
    this.token = ApplicationState.tokens.mapbox;
  }

  get url() {
    return `${MAPBOX_URL}?access_token=${this.token}`;
  }

  attached() {
    super.attached();
    
    let map = L.map(this.map)
      .setView([this.config.lat, this.config.lng], this.config.zoom);

    L.tileLayer(this.url, {
			maxZoom: 18,
			attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
				'<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
				'Imagery © <a href="http://mapbox.com">Mapbox</a>',
			id: 'mapbox.streets'
		}).addTo(map);
  }
}
