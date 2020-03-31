import { Component, OnInit } from '@angular/core'
import * as ol from 'openlayers'
@Component({
  selector: 'app-map-demo1',
  templateUrl: './map-demo1.component.html',
  styleUrls: ['./map-demo1.component.scss']
})
export class MapDemo1Component implements OnInit {
  constructor() {}

  ngOnInit() {
    let map = new ol.Map({
      target: 'map',
      layers: [
        new ol.layer.Tile({
          source: new ol.source.OSM()
        })
      ],
      controls: ol.control.defaults({
        attributionOptions: {
          collapsible: false
        }
      }),
      view: new ol.View({
        projection: 'EPSG:3857',
        center: [0, 0],
        zoom: 0
      })
    })
    console.log(map.getControls().getArray())

    setTimeout(() => {
      map.getView().animate({
        zoom: 13
      })
    }, 2000)
  }
}
