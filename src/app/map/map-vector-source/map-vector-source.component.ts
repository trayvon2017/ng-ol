import { Component, OnInit } from '@angular/core'
import * as ol from 'openlayers'
@Component({
  selector: 'app-map-vector-source',
  templateUrl: './map-vector-source.component.html',
  styles: []
})
export class MapVectorSourceComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    this.initMap()
  }
  initMap() {
    let pointFeature = new ol.Feature({
      geometry: new ol.geom.Point([12958998, 4852221]),
      name: '点要素'
    })
    let lineStringFeature = new ol.Feature({
      geometry: new ol.geom.LineString([
        [11590147, 4322577],
        [13594369, 3872784]
      ]),
      name: '线要素'
    })
    let polygonFeature = new ol.Feature({
      geometry: new ol.geom.Polygon([
        [
          [11801814, 3251012],
          [14057391, 2748303],
          [12714628, 1346008],
          [11801814, 3251012]
        ]
      ]),
      name: '点要素'
    })
    let vectorSourcce = new ol.source.Vector()
    vectorSourcce.addFeatures([pointFeature, lineStringFeature, polygonFeature])
    new ol.Map({
      target: 'map',
      layers: [
        new ol.layer.Tile({
          source: new ol.source.OSM()
        }),
        new ol.layer.Vector({
          source: vectorSourcce
        })
      ],
      view: new ol.View({
        center: [0, 0],
        zoom: 0
      })
    })
  }
}
