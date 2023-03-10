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

## EventLister

```
export class ZoomRangeComponent implements AfterViewInit {

  @ViewChild('mapa') divMapa!: ElementRef;
  mapa!: mapboxgl.Map;
  zoomLevel: number = 10;

  ngAfterViewInit(): void {
    this.mapa = new mapboxgl.Map({
      container: this.divMapa.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: [-64.18487550491221, -31.391669631352066], // starting position [lng, lat]
      zoom: 17, // starting zoom
    });

    this.mapa.on('zoom', (ev) => {
      this.zoomLevel = this.mapa.getZoom();
    })



  }
  zoomIn() {
    this.mapa.zoomOut();
  };
  zoomOut() {
    this.mapa.zoomIn();
  };
}
```

Con el metodo `on` podemos escuchar los eventos de `this.mapa`, en este caso el `zoom` y con una funcion flecha podemos obtener el nivel dinamico del zoom hasta que para la animacion.

## Referencia Local

```
    <input
      type="range"
      class="form-range"
      data-bs-theme="dark"
      [value]="zoomLevel"
      min="1"
      max="18"
      #zoomInput
      (input)="zoomCambio(zoomInput.value)"
    />
```

Se puede mandar valor por referencia local a travez del metodo `.value` de la referencia

## Obtener centro del mapa

```
  ngAfterViewInit(): void {

    ......

    // Movimiento del center del mapa
    this.mapa.on('move', (event) => {
      const target = event.target;
      const { lng, lat } = target.getCenter();
      this.center = [lng, lat];
    })

    ......
    }
```

## Regla de oro

Cuando se use un EventListener(on, delay, etc), siempre se tiene que destruir, para no tener eventos corriendo en segudno plano y se acumulen.

```
  ngOnDestroy(): void {
    this.mapa.off('zoom', () => { });
    this.mapa.off('zoomend', () => { });
    this.mapa.off('move', () => { });
  }
```

Los eventos `on` se destruyen con el metodo `off`.

## Marcadores Personalizados

Para agregar marcadores simplemente hay qu crearse un elemnto html que contenga algun elemento que pueda servir como marcador como imagenes, palabras,etc.

```
    const markerHtml: HTMLElement = document.createElement('div');
    markerHtml.innerHTML = 'Hola Mundo'

    const marker = new mapboxgl.Marker({
      element: markerHtml
    })
      .setLngLat(this.center)
      .addTo(this.mapa);
```

## A??adir marcadores de manera dinamica

```
  agregarMarcador() {
    const color = "#xxxxxx".replace(/x/g, y => (Math.random() * 16 | 0).toString(16));
    const nuevoMarcador = new mapboxgl.Marker({
      draggable: true,
      color: color,
    })
      .setLngLat(this.center)
      .addTo(this.mapa);
  };
```

Este metodo genera marcadors con colores aleatorios y los agrega en las coordenadas que se especifiquen en `setLngLat()`.
Se generan en el mapa por el `addTo()` el cual requiere la referencia del mapa.

## ngStyle

```
  <li
    class="list-group-item"
    (click)="irMarcador()"
    *ngFor="let marcador of marcadores; index as i"
    [ngStyle]="{
      'background-color': marcador.color
    }"
  >
    Marker {{ i + 1 }}
  </li>
```

Al Elemento se puede enviar un objeto con las propiedades CSS.

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
