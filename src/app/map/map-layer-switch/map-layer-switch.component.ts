import { Component, OnInit } from '@angular/core'
import * as ol from 'openlayers'
@Component({
  selector: 'app-map-layer-switch',
  templateUrl: './map-layer-switch.component.html',
  styles: []
})
export class MapLayerSwitchComponent implements OnInit {
  currentMap: ol.Map
  currentLayer = '0'
  layerList = [
    {
      label: 'osm',
      value: '0'
    },
    {
      label: 'bingmap',
      value: '1'
    },
    {
      label: 'stamen',
      value: '2'
    }
  ]
  currentLayers: ol.Collection<ol.layer.Base>
  constructor() {}
  ngOnInit() {}

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    this.initMap()
  }
  initMap() {
    this.currentMap = new ol.Map({
      target: 'map',
      layers: [
        new ol.layer.Tile({
          source: new ol.source.OSM()
        }),
        new ol.layer.Tile({
          source: new ol.source.BingMaps({
            key:
              'Ag2qxMbjdmLuCjTOXyPfUPej0kA2gaOG70bMSv-B-j5C3_K2jpCSQvY66mYiRr6r',
            imagerySet: 'Aerial'
          }),
          visible: false
        }),
        new ol.layer.Tile({
          source: new ol.source.Stamen({
            layer: 'watercolor'
          }),
          visible: false
        })
      ],
      view: new ol.View({
        projection: 'EPSG:3857',
        center: [0, 0],
        zoom: 0
      })
    })
    this.currentLayers = this.currentMap.getLayers()
  }

  onLayerChanged(layer) {
    this.currentLayers.forEach((element, index) => {
      element.setVisible(+layer === index)
    })
  }
}
