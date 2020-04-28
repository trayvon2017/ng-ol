import { Component, OnInit } from '@angular/core'
import * as ol from 'openlayers'
@Component({
  selector: 'app-map-fixed-extent',
  templateUrl: './map-fixed-extent.component.html',
  styles: [],
})
export class MapFixedExtentComponent implements OnInit {
  map: ol.Map
  transform(extent) {
    return ol.proj.transformExtent(extent, 'EPSG:4326', 'EPSG:3857')
  }

  extents = {
    India: this.transform([68.17665, 7.96553, 97.40256, 35.49401]),
    Argentina: this.transform([-73.41544, -55.25, -53.62835, -21.83231]),
    Nigeria: this.transform([2.6917, 4.24059, 14.57718, 13.86592]),
    Sweden: this.transform([11.02737, 55.36174, 23.90338, 69.10625]),
  }

  center = ol.proj.transform([69.17665, 30.25654], 'EPSG:4326', 'EPSG:3857')
  constructor() {}

  ngOnInit() {
    this.map = new ol.Map({
      target: 'map',
      layers: [
        new ol.layer.Tile({
          source: new ol.source.OSM(),
        }),
      ],
      view: new ol.View({
        extent: this.extents.India,
        projection: 'EPSG:3857',
        zoom: 5,
        center: this.center,
      }),
    })
  }
}
