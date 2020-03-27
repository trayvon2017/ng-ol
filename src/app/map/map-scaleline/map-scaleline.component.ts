import { Component, OnInit } from '@angular/core'
import * as ol from 'openlayers'
import { mapToMapExpression } from '@angular/compiler/src/render3/util'
@Component({
  selector: 'app-map-scaleline',
  templateUrl: './map-scaleline.component.html',
  styles: []
})
export class MapScalelineComponent implements OnInit {
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
      controls: ol.control.defaults().extend([new ol.control.ScaleLine()])
    })
  }
}
