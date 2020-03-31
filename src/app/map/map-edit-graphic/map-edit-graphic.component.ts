import { Component, OnInit } from '@angular/core'
import * as ol from 'openlayers'
@Component({
  selector: 'app-map-edit-graphic',
  templateUrl: './map-edit-graphic.component.html',
  styles: []
})
export class MapEditGraphicComponent implements OnInit {
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
  vectorSource: ol.source.Vector
  vectorLayer: ol.layer.Vector
  map: ol.Map
  currentDrawInteraction: ol.interaction.Draw
  snapInteraction: ol.interaction.Snap

  constructor() {}

  ngOnInit() {}

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    this.initMap()
  }
  initMap() {
    this.vectorSource = new ol.source.Vector()
    this.vectorLayer = new ol.layer.Vector({ source: this.vectorSource })
    this.map = new ol.Map({
      target: 'map',
      layers: [
        new ol.layer.Tile({
          source: new ol.source.OSM()
        }),
        this.vectorLayer
      ],
      view: new ol.View({
        center: [0, 0],
        zoom: 0
      })
    })
    this.map.addInteraction(
      new ol.interaction.Modify({
        source: this.vectorSource,
        deleteCondition: function(event) {
          console.log(event)
          return false
        }
      })
    )
    this.onTypeChanged(this.currentType)
  }

  onTypeChanged(type) {
    this.currentDrawInteraction &&
      this.map.removeInteraction(this.currentDrawInteraction)
    this.snapInteraction && this.map.removeInteraction(this.snapInteraction)

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
      this.snapInteraction = new ol.interaction.Snap({
        source: this.vectorSource
      })
      this.map.addInteraction(this.currentDrawInteraction)
      this.map.addInteraction(this.snapInteraction)
    }
  }
}
