import { Component, OnInit } from '@angular/core'
import * as ol from 'openlayers'
@Component({
  selector: 'app-map-rotate',
  templateUrl: './map-rotate.component.html',
  styleUrls: ['./map-rotate.component.scss']
})
export class MapRotateComponent implements OnInit {
  constructor() {}

  ngOnInit() {}

  ngAfterViewInit(): void {
    this.initMap()
  }
  initMap() {
    new ol.Map({
      target: 'map',
      layers: [
        new ol.layer.Tile({
          source: new ol.source.OSM()
        })
      ],
      view: new ol.View({
        projection: 'EPSG:3857',
        center: [0, 0],
        zoom: 0
      }),
      controls: ol.control.defaults().extend([new ol.control.Rotate()])
    })
  }
}
