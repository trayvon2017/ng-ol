import { Component, OnInit } from '@angular/core'
import * as ol from 'openlayers'
@Component({
  selector: 'app-map-resolution',
  templateUrl: './map-resolution.component.html',
  styles: []
})
export class MapResolutionComponent implements OnInit {
  zoom = 0
  resolution = 0
  constructor() {}

  ngOnInit() {
    this.initMap()
  }
  initMap() {
    const that = this
    const map = new ol.Map({
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
    map.getView().on('change:resolution', function() {
      that.zoom = this.getZoom()
      that.resolution = this.getResolution()
    })
  }
}
