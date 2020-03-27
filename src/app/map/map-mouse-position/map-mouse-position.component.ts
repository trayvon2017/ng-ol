import { Component, OnInit } from '@angular/core'
import * as ol from 'openlayers'
@Component({
  selector: 'app-map-mouse-position',
  templateUrl: './map-mouse-position.component.html',
  styleUrls: ['./map-mouse-position.component.scss']
})
export class MapMousePositionComponent implements OnInit {
  constructor() {}

  ngOnInit() {}

  ngAfterViewInit(): void {
    this.initMap()
  }

  initMap() {
    let map = new ol.Map({
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
      })
    })
  }
}
