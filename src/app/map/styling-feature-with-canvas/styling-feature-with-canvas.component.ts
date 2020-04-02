import { Component, OnInit } from '@angular/core'
import * as ol from 'openlayers'
import { Content } from '@angular/compiler/src/render3/r3_ast'
@Component({
  selector: 'app-styling-feature-with-canvas',
  templateUrl: './styling-feature-with-canvas.component.html',
  styles: []
})
export class StylingFeatureWithCanvasComponent implements OnInit {
  coutriesGeojsonUrl =
    'https://openlayers.org/en/v4.6.5/examples/data/geojson/countries.geojson'
  constructor() {}

  ngOnInit() {
    this.initMap()
  }
  initMap() {
    var canvas = document.createElement('canvas')
    var context = canvas.getContext('2d')

    var pixelRatio = ol.has.DEVICE_PIXEL_RATIO

    function gradient(feature: ol.Feature, resolution) {
      var extent = feature.getGeometry().getExtent()
      var grad = context.createLinearGradient(
        0,
        0,
        (ol.extent.getWidth(extent) / resolution) * pixelRatio,
        0
      )
      grad.addColorStop(0, 'red')
      grad.addColorStop(1 / 6, 'orange')
      grad.addColorStop(2 / 6, 'yellow')
      grad.addColorStop(3 / 6, 'green')
      grad.addColorStop(4 / 6, 'aqua')
      grad.addColorStop(5 / 6, 'blue')
      grad.addColorStop(1, 'purple')
      return grad
    }

    var pattern = (function() {
      canvas.width = 11 * pixelRatio
      canvas.height = 11 * pixelRatio

      context.fillStyle = 'white'
      context.fillRect(0, 0, canvas.width, canvas.height)
      // 外圈
      context.fillStyle = 'rgba(102,0,102,0.5)'
      context.beginPath()
      context.arc(
        5 * pixelRatio,
        5 * pixelRatio,
        4 * pixelRatio,
        0,
        2 * Math.PI
      )
      context.fill()
      // 内圈
      context.fillStyle = 'rgb(55,0,170)'
      context.beginPath()
      context.arc(
        5 * pixelRatio,
        5 * pixelRatio,
        2 * pixelRatio,
        0,
        2 * Math.PI
      )
      context.fill()
      return context.createPattern(canvas, 'repeat')
    })()

    var fill = new ol.style.Fill()
    var style = new ol.style.Style({
      fill,
      stroke: new ol.style.Stroke({
        color: '#333',
        width: 2
      })
    })

    var getStackedStyle = function(feature, resolution) {
      var id = feature.getId()
      fill.setColor(id > 'J' ? gradient(feature, resolution) : pattern)
      return style
    }

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
          source: vectorSource,
          style: getStackedStyle
        })
      ],
      view: new ol.View({
        center: ol.proj.fromLonLat([7, 52]),
        zoom: 3
      })
    })
  }
}
