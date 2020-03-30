import { Component, OnInit } from '@angular/core'
import * as ol from 'openlayers'
@Component({
  selector: 'app-map-draw-style',
  templateUrl: './map-draw-style.component.html',
  styles: []
})
export class MapDrawStyleComponent implements OnInit {
  // <option value="Point">Point</option>
  //       <option value="LineString">LineString</option>
  //       <option value="Polygon">Polygon</option>
  //       <option value="Circle">Circle</option>
  //       <option value="Square">Square</option>
  //       <option value="Box">Box</option>
  //       <option value="None">None</option>
  currentType = 'Point'
  typeList = [
    'Point',
    'LineString',
    'Polygon',
    'Circle',
    // 'Square',
    // 'Box',
    'None'
  ]
  currenMap: ol.Map
  currentDrawInteraction
  vectorSource: ol.source.Vector
  constructor() {}

  ngOnInit() {
    this.initMap()
  }
  initMap() {
    this.vectorSource = new ol.source.Vector({
      wrapX: false
    })
    let vectorLayer = new ol.layer.Vector({
      source: this.vectorSource
      // style: new ol.style.Style({
      //   image: new ol.style.Circle({
      //     fill: new ol.style.Fill({
      //       color: '#F00'
      //     }),
      //     radius: 5
      //   }),
      //   stroke: new ol.style.Stroke({
      //     color: '#0F0',
      //     lineCap: 'round',
      //     width: 5
      //   }),
      //   fill: new ol.style.Fill({
      //     color: '#00F'
      //   })
      // })
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
    this.onTypeChanged(this.currenMap)
  }

  onTypeChanged(type) {
    this.currentDrawInteraction &&
      this.currenMap.removeInteraction(this.currentDrawInteraction)
    let geometryFunction
    if (type) {
      switch (type) {
        case 'square':
          geometryFunction = ol.interaction.Draw.createRegularPolygon(4)
          break
        case 'Box':
          geometryFunction = ol.interaction.Draw.createBox()
          break
        default:
          break
      }
    }
    this.currentDrawInteraction = new ol.interaction.Draw({
      source: this.vectorSource,
      type
      // geometryFunction
    })
    this.currenMap.addInteraction(this.currentDrawInteraction)
  }
}
