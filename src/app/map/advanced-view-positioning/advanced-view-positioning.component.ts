import { Component, OnInit } from '@angular/core'
import * as ol from 'openlayers'
@Component({
  selector: 'app-advanced-view-positioning',
  templateUrl: './advanced-view-positioning.component.html',
  styleUrls: ['./advanced-view-positioning.component.scss']
})
export class AdvancedViewPositioningComponent implements OnInit {
  geojsonUrl =
    'https://openlayers.org/en/v4.6.5/examples/data/geojson/switzerland.geojson'
  map: ol.Map
  source: ol.source.Vector
  constructor() {}

  ngOnInit() {
    this.initMap()
  }
  initMap() {
    this.source = new ol.source.Vector({
      url: this.geojsonUrl,
      format: new ol.format.GeoJSON()
    })
    this.map = new ol.Map({
      layers: [
        new ol.layer.Tile({
          source: new ol.source.OSM()
        }),
        new ol.layer.Vector({
          source: this.source
        })
      ],
      target: 'map',
      view: new ol.View({
        center: [0, 0],
        zoom: 1
      })
    })
  }

  zoomtoswitzerlandbest() {
    var feature = this.source.getFeatures()[0]
    var polygon = <ol.geom.SimpleGeometry>feature.getGeometry()
    this.map.getView().fit(polygon, {
      padding: [170, 50, 30, 150],
      constrainResolution: false
    })
  }

  zoomtoswitzerlandconstrained() {
    var feature = this.source.getFeatures()[0]
    var polygon = <ol.geom.SimpleGeometry>feature.getGeometry()
    this.map.getView().fit(polygon, {
      padding: [170, 50, 30, 150]
    })
  }

  zoomtoswitzerlandnearest() {
    var feature = this.source.getFeatures()[0]
    var polygon = <ol.geom.SimpleGeometry>feature.getGeometry()
    this.map.getView().fit(polygon, {
      padding: [170, 50, 30, 150],
      nearest: true
    })
  }

  zoomtolausanne() {
    var feature = this.source.getFeatures()[1]
    var point = <ol.geom.SimpleGeometry>feature.getGeometry()
    this.map.getView().fit(point, {
      padding: [170, 50, 30, 150],
      minResolution: 50
    })
  }

  centerlausanne() {
    var feature = this.source.getFeatures()[1]
    var point = <ol.geom.Point>feature.getGeometry()
    var size = this.map.getSize()
    this.map.getView().centerOn(point.getCoordinates(), size, [100, 100])
  }
}
