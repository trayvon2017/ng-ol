import { Component, OnInit } from '@angular/core'
import * as ol from 'openlayers'
@Component({
  selector: 'app-map-wms-tile',
  template: ` <div id="map"><div></div></div> `,
  styles: [],
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
          source: new ol.source.OSM(),
        }),
        new ol.layer.Tile({
          source: new ol.source.TileWMS({
            // url: 'https://ahocevar.com/geoserver/wms',
            // params: {
            //   LAYERS: 'topp:states',
            // },
            url: 'http://192.168.2.4:9080/geowebcache/service/wms',
            params: {
              LAYERS: 'guangdong',
              // TILED: false,
            },
            serverType: 'geoserver',
            transition: 5000,
          }),
        }),
      ],
      view: new ol.View({
        projection: 'EPSG:4326',
        center: [0, 0],
        zoom: 4,
      }),
    })
  }
}
