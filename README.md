# Test 1
This project is built in Aurelia, a next-generation Javascript framework, and uses ECMA Script 6 features as decorators.
The project is coded using ECMA Script 6 and transpiled with Babel to ECMA Script 5. The widget configurations are loaded from a YAML file.

## Widgets

### Photo of the Day
This component consumes images from NASA APOC servers. NASA APOC service provides a cross-origin REST service for NASA images of the day.
The images themselves are not cross-origin enabled. I made use of a cross-origin proxy crossorigin.me to retrieve the images and resize them to a smaller size using Javascript Canvas API.
Possible improvements include server-side image resizing and caching.

### Clock
This component uses a third-party embedded widget. I used Google Geolocation service to find the local address City and State for the local time.
An alternative clock could be built using a Javascript Canvas API.

### Chart
It makes use of the Google Charts API and Quandl REST API. An alternative could use D3.js.

### Quote of the day
A third party embedded widget.

### Equation
It makes use of KaTex lib.

### HTML content
It makes use of iframe element.

### Stock
It makes use Trading View API. An alternative could use D3.js or Google Charts with Quandl REST API.

### City Map
It makes use of Leaflet and Mapbox.

### Weather
A third party (forecast.io) embedded widget.

## How to run

* Have Node >=4, NPM >=3 installed.
* Have JSPM and Gulp installed.

```
sudo npm install -g jspm@0.16.15 gulp@3.8.11
```

* In a terminal clone and install dependencies.

```
clone git@bitbucket.org:samirvsmachine/merlin-test1.git
cd merlin-test1
npm install
jspm install
```

* Run

```
gulp watch
```

* Navigate to localhost:9000.
