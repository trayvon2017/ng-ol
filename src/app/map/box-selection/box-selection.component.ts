import { Component, OnInit } from '@angular/core'
import * as ol from 'openlayers'
@Component({
  selector: 'app-box-selection',
  templateUrl: './box-selection.component.html',
  styles: []
})
export class BoxSelectionComponent implements OnInit {
  defaultInfo = '没有选中'
  info = this.defaultInfo
  coutriesGeojsonUrl =
    'https://openlayers.org/en/v4.6.5/examples/data/geojson/countries.geojson'
  constructor() {}

  ngOnInit() {
    this.initMap()
  }
  initMap() {
    var vectorSource = new ol.source.Vector({
      url: this.coutriesGeojsonUrl,
      format: new ol.format.GeoJSON()
    })

    var map = new ol.Map({
      target: 'map',
      layers: [
        new ol.layer.Tile({
          source: new ol.source.OSM()
        }),
        new ol.layer.Vector({
          source: vectorSource
        })
      ],
      view: new ol.View({
        center: [0, 0],
        zoom: 0
      })
    })

    var select = new ol.interaction.Select({
      style: new ol.style.Style({
        stroke: new ol.style.Stroke({
          color: '#ff0000',
          width: 1.25
        })
      })
    })
    map.addInteraction(select)
    var selectedFeatures = select.getFeatures()
    var dragBox = new ol.interaction.DragBox({
      condition: ol.events.condition.platformModifierKeyOnly
    })
    map.addInteraction(dragBox)

    dragBox.on('boxend', function(evt) {
      var extent = dragBox.getGeometry().getExtent()
      vectorSource.forEachFeatureIntersectingExtent(extent, function(feature) {
        selectedFeatures.push(feature)
      })
    })
    dragBox.on('boxstart', function() {
      selectedFeatures.clear()
    })
    const that = this
    selectedFeatures.on(['add', 'remove'], function() {
      var names = selectedFeatures.getArray().map(function(feature) {
        return feature.get('name')
      })

      if (names.length) {
        that.info = names.join(',')
      } else {
        that.info = that.info
      }
    })
  }
}
