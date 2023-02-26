# MapasApp

## Mapbox

Esta aplicacion usa la API de `https://www.mapbox.com/`.

Install the npm package:

```
npm install --save mapbox-gl
```

Include the CSS file in the <head> of your HTML file:

```
<link href='https://api.mapbox.com/mapbox-gl-js/v2.13.0/mapbox-gl.css' rel='stylesheet' />
```

Include the following code in your JavaScript file:

```
import mapboxgl from 'mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"

mapboxgl.accessToken = 'pk.eyJ1IjoiZXJpY2RlbmlzLTE5ODgiLCJ';<-- token de la pag
const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/streets-v12', // style URL
    center: [-74.5, 40], // starting position [lng, lat]
    zoom: 9, // starting zoom
});


```

## Diferencias con GoogleMap

La posicion del GoogleMap se fija con un array de latitud y longitud. Mientras que en Mapbos se fija con longitud y latitud.

## AccesToken

```
// app/component.ts

import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  ngOnInit(): void {

    (mapboxgl as any).accessToken = environment.mapboxToken;


  }
  title = 'mapasApp';
}

```

El accessToken se coloca en el app.component.ts para que se cargue y este disponible de manera global.

## Cargar Mapa

```
//component

import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-full-screen',
  templateUrl: './full-screen.component.html',
  styles: [`
  #mapa{
    width:100%;
    height:100%;
  }
  `
  ]
})
export class FullScreenComponent implements OnInit {
  ngOnInit(): void {

    const map = new mapboxgl.Map({
      container: 'mapa', // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: [-64.18487550491221, -31.391669631352066], // starting position [lng, lat]
      zoom: 17, // starting zoom

    });
    // map.setLight({
    //   "anchor": "viewport",
    //   "color": "blue",
    //   "intensity": 0.5
    // });

  }

}
```

Una vez cargado el accessToken de manera global se puede llamar al mapa con el `new mapboxgl.Map({})`.
Las configuraciones opcionales se puede agregar al `map`.

## AfterViewInit

En vez de usar un id en los div, para renderizar el mapa, es mejor usar referencias asi angular crea dinamicamente los div y nosotros solo manejamos su referencia. De esta manera podremos manejar varios mapas a la vez y no tener problemas de collision de id.

```
export class ZoomRangeComponent implements AfterViewInit {

  mapa!: mapboxgl.Map;
  @ViewChild('mapa') divMapa!: ElementRef;

  ngAfterViewInit(): void {
    this.mapa = new mapboxgl.Map({
      container: this.divMapa.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: [-64.18487550491221, -31.391669631352066], // starting position [lng, lat]
      zoom: 17, // starting zoom
    });
  }
  zoomIn() {
    this.mapa.zoomOut();
  };
  zoomOut() {
    this.mapa.zoomIn();
  };
}

```

---

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.1.4.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
