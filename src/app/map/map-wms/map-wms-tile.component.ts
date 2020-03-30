import { Component, OnInit } from '@angular/core'
import * as ol from 'openlayers'
@Component({
  selector: 'app-map-wms-tile',
  template: `
    <div id="map"><div></div></div>
  `,
  styles: []
})
export class MapWmsTileComponent implements OnInit {
  constructor() {}

  ngOnInit() {
    this.initMap()
  }
  initMap() {
    new ol.Map({
      target: 'map',
      layers: [
        new ol.layer.Tile({
          source: new ol.source.OSM()
        }),
        new ol.layer.Tile({
          source: new ol.source.TileWMS({
            url: 'https://ahocevar.com/geoserver/wms',
            params: {
              LAYERS: 'topp:states'
            },
            serverType: 'geoserver',
            transition: 5000
          })
        })
      ],
      view: new ol.View({
        projection: 'EPSG:3857',
        center: [-10997148, 4569099],
        zoom: 4
      })
    })
  }
}
