import { Component, OnInit } from '@angular/core'
import * as ol from 'openlayers'
@Component({
  selector: 'app-sc-map2',
  templateUrl: './sc-map2.component.html',
  styleUrls: ['./sc-map2.component.scss'],
})
export class ScMap2Component implements OnInit {
  mapView: ol.View

  constructor() {}

  ngOnInit() {
    this.mapView = new ol.View({
      center: [112, 21],
      zoom: 7,
      projection: 'EPSG:4326',
    })
  }

  onMainMapLoaded(map: ol.Map) {
    console.log(map)
    let pointFeature = new ol.Feature({
      geometry: new ol.geom.Point([112, 21]),
      name: '点要素',
    })
    let vectorSourcce = new ol.source.Vector()
    vectorSourcce.addFeatures([pointFeature])
    map.addLayer(
      new ol.layer.Vector({
        source: vectorSourcce,
      })
    )
  }
}
