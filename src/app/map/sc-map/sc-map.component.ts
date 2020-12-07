import { Component, OnInit } from '@angular/core'
import * as ol from 'openlayers'
@Component({
  selector: 'app-sc-map',
  templateUrl: './sc-map.component.html',
  styleUrls: ['./sc-map.component.scss'],
})
export class ScMapComponent implements OnInit {
  mapView: ol.View

  constructor() {}

  ngOnInit() {}

  ngAfterViewInit(): void {
    this.initMap()
  }

  initMap() {
    this.mapView = new ol.View({
      center: [0, 0],
      zoom: 0,
    })
    let pointFeature = new ol.Feature({
      geometry: new ol.geom.Point([12958998, 4852221]),
      name: '点要素',
    })
    let lineStringFeature = new ol.Feature({
      geometry: new ol.geom.LineString([
        [11590147, 4322577],
        [13594369, 3872784],
      ]),
      name: '线要素',
    })
    let polygonFeature = new ol.Feature({
      geometry: new ol.geom.Polygon([
        [
          [11801814, 3251012],
          [14057391, 2748303],
          [12714628, 1346008],
          [11801814, 3251012],
        ],
      ]),
      name: '点要素',
    })
    let vectorSourcce = new ol.source.Vector()
    vectorSourcce.addFeatures([pointFeature, lineStringFeature, polygonFeature])
    new ol.Map({
      target: 'mainMap',
      layers: [
        new ol.layer.Tile({
          source: new ol.source.OSM(),
        }),
        new ol.layer.Vector({
          source: vectorSourcce,
        }),
      ],
      view: this.mapView,
    })
    new ol.Map({
      target: 'secondMap',
      layers: [
        new ol.layer.Tile({
          source: new ol.source.OSM(),
        }),
        new ol.layer.Vector({
          source: vectorSourcce,
        }),
      ],
      view: this.mapView,
    })
    new ol.Map({
      target: 'threeMap',
      layers: [
        new ol.layer.Tile({
          source: new ol.source.OSM(),
        }),
        new ol.layer.Vector({
          source: vectorSourcce,
        }),
      ],
      view: this.mapView,
    })
  }
}
