import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';


@Component({
  selector: 'app-zoom-range',
  templateUrl: './zoom-range.component.html',
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

    z-index:100;
  }
  `
  ]
})
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
  }
  zoomIn() {
    this.mapa.zoomOut();
    this.zoomLevel = this.mapa.getZoom();
  };
  zoomOut() {
    this.mapa.zoomIn();
    this.zoomLevel = this.mapa.getZoom();
  };
}
