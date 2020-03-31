import { Component, OnInit } from '@angular/core'
import * as ol from 'openlayers'
@Component({
  selector: 'app-map-label-text',
  templateUrl: './map-label-text.component.html',
  styles: []
})
export class MapLabelTextComponent implements OnInit {
  constructor() {}

  ngOnInit() {}

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    this.initMap()
  }
  initMap() {
    // feature
    const labelStyle = new ol.style.Style({
      text: new ol.style.Text({
        font: 'bold 20px serif',
        text: '北京',
        fill: new ol.style.Fill({
          color: 'rgba(255,0,0,1)'
        })
      })
    })
    const labelFeature = new ol.Feature({
      geometry: new ol.geom.Point([12956325, 4851028])
    })

    labelFeature.setStyle(labelStyle)
    // feature => layer
    const vectorSource = new ol.source.Vector()
    vectorSource.addFeature(labelFeature)
    const vectorLayer = new ol.layer.Vector({
      source: vectorSource
    })
    // map
    new ol.Map({
      target: 'map',
      layers: [
        new ol.layer.Tile({
          source: new ol.source.OSM()
        }),
        vectorLayer
      ],
      view: new ol.View({
        projection: 'EPSG:3857',
        center: [0, 0],
        zoom: 0
      })
    })
  }
}
