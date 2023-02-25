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
