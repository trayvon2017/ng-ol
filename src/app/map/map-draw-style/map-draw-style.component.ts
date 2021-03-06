import { Component, OnInit } from '@angular/core'
import * as ol from 'openlayers'
@Component({
  selector: 'app-map-draw-style',
  templateUrl: './map-draw-style.component.html',
  styles: []
})
export class MapDrawStyleComponent implements OnInit {
  currentType = 'Point'
  typeList = [
    'Point',
    'LineString',
    'Polygon',
    'Circle',
    'Square',
    'Box',
    'None'
  ]
  currenMap: ol.Map
  currentDrawInteraction
  vectorSource: ol.source.Vector
  constructor() {}

  ngOnInit() {}

  ngAfterViewInit(): void {
    this.initMap()
  }
  initMap() {
    this.vectorSource = new ol.source.Vector({
      wrapX: false
    })
    let vectorLayer = new ol.layer.Vector({
      source: this.vectorSource,
      style: new ol.style.Style({
        image: new ol.style.Circle({
          fill: new ol.style.Fill({
            color: '#F00'
          }),
          radius: 5
        }),
        stroke: new ol.style.Stroke({
          color: '#0F0',
          lineCap: 'round',
          width: 5
        }),
        fill: new ol.style.Fill({
          color: '#00F'
        })
      })
    })

    this.currenMap = new ol.Map({
      target: 'map',
      layers: [
        new ol.layer.Tile({
          source: new ol.source.OSM()
        }),
        vectorLayer
      ],
      view: new ol.View({
        // projection: 'EPSG:3857',
        center: [0, 0],
        zoom: 0
      })
    })
    this.onTypeChanged(this.currentType)
  }

  onTypeChanged(type) {
    this.currentDrawInteraction &&
      this.currenMap.removeInteraction(this.currentDrawInteraction)
    let geometryFunction
    if (type != 'None') {
      switch (type) {
        case 'Square':
          type = 'Circle'
          geometryFunction = ol.interaction.Draw.createRegularPolygon(3)
          break
        case 'Box':
          type = 'Circle'
          geometryFunction = ol.interaction.Draw.createBox()
          break
        default:
          break
      }
      this.currentDrawInteraction = new ol.interaction.Draw({
        source: this.vectorSource,
        type,
        geometryFunction
      })
      this.currenMap.addInteraction(this.currentDrawInteraction)
    }
  }
}
