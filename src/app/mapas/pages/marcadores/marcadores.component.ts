import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

interface MarcadorColor {
  color: string;
  marker?: mapboxgl.Marker;
  centro?: [number, number]
}

@Component({
  selector: 'app-marcadores',
  templateUrl: './marcadores.component.html',
  styles: [`
  .mapa-container{
    width:100%;
    height:100%;
  }

  .list-group{
    position:fixed;
    top:20px;
    right:20px;
    z-index:100;
  }

  li{
    cursor:pointer;
  }
  `
  ]
})
export class MarcadoresComponent implements AfterViewInit {
  @ViewChild('mapa') divMapa!: ElementRef;
  mapa!: mapboxgl.Map;
  zoomLevel: number = 15;
  center: [number, number] = [-64.18487550491221, -31.391669631352066];

  // arreglo de marcadores
  marcadores: MarcadorColor[] = [];

  ngAfterViewInit(): void {
    this.mapa = new mapboxgl.Map({
      container: this.divMapa.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.center, // starting position [lng, lat]
      zoom: 17, // starting zoom
    });

    this.leerLocalStorage();


  }

  agregarMarcador() {
    const color = "#xxxxxx".replace(/x/g, y => (Math.random() * 16 | 0).toString(16));
    const nuevoMarcador = new mapboxgl.Marker({
      draggable: true,
      color: color,
    })
      .setLngLat(this.center)
      .addTo(this.mapa);

    this.marcadores.push({
      color,
      marker: nuevoMarcador
    });

    this.guardarMarcadoresLocalStorage();

    nuevoMarcador.on('dragend', () => {
      this.guardarMarcadoresLocalStorage();
    })

  };


  irMarcador(marcador: mapboxgl.Marker) {
    // const { lng, lat } = marcador.getLngLat();
    this.mapa.flyTo({
      center: marcador.getLngLat()
    });
  };
  //guardar en el localStorage

  guardarMarcadoresLocalStorage() {
    const lngLatArr: MarcadorColor[] = [];

    this.marcadores.forEach(m => {
      const color = m.color;
      const { lng, lat } = m.marker!.getLngLat();

      lngLatArr.push({
        color: color,
        centro: [lng, lat]
      })
    })
    localStorage.setItem('marcadores', JSON.stringify(lngLatArr));
  }

  leerLocalStorage() {

    if (!localStorage.getItem('marcadores')) {
      return;
    };
    const lngLatArr: MarcadorColor[] = JSON.parse(localStorage.getItem('marcadores')!);

    lngLatArr.forEach(m => {
      const newMarker = new mapboxgl.Marker({
        color: m.color,
        draggable: true
      })
        .setLngLat(m.centro!)
        .addTo(this.mapa);

      this.marcadores.push({
        marker: newMarker,
        color: m.color
      })

      newMarker.on('dragend', () => {
        this.guardarMarcadoresLocalStorage();
      })
    })






  }


  borrarMarcador(i: number) {
    this.marcadores[i].marker!.remove();
    this.marcadores.splice(i, 1);
    this.guardarMarcadoresLocalStorage();
  }

}

    // const markerHtml: HTMLElement = document.createElement('div');
    // markerHtml.innerHTML = 'Hola Mundo'

    // const marker = new mapboxgl.Marker({
    //   element: markerHtml
    // })
    //   .setLngLat(this.center)
    //   .addTo(this.mapa);

    // const marker = new mapboxgl.Marker()
    //   .setLngLat(this.center)
    //   .addTo(this.mapa);
