import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';


@Component({
  selector: 'app-marcadores',
  templateUrl: './marcadores.component.html',
  styles: [`
  .mapa-container{
    width:100%;
    height:100%;
  }

  .row{
    background-color: white;
    position:fixed;
    bottom: 50px;
    left:50px;
    padding:10px;
    border-radius:5px;
    width:400px;
    z-index:100;
  }
  `
  ]
})
export class MarcadoresComponent implements AfterViewInit {
  @ViewChild('mapa') divMapa!: ElementRef;
  mapa!: mapboxgl.Map;
  zoomLevel: number = 15;
  center: [number, number] = [-64.18487550491221, -31.391669631352066];


  ngAfterViewInit(): void {
    this.mapa = new mapboxgl.Map({
      container: this.divMapa.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.center, // starting position [lng, lat]
      zoom: 17, // starting zoom
    });

    // const markerHtml: HTMLElement = document.createElement('div');
    // markerHtml.innerHTML = 'Hola Mundo'

    // const marker = new mapboxgl.Marker({
    //   element: markerHtml
    // })
    //   .setLngLat(this.center)
    //   .addTo(this.mapa);

    const marker = new mapboxgl.Marker()
      .setLngLat(this.center)
      .addTo(this.mapa);


  }
}
