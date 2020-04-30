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
          // extent: [-400.0, 19.28623906715518, 132.99926530598282, 400.0],
          source: new ol.source.TileWMS({
            // url: 'https://ahocevar.com/geoserver/wms',
            // params: {
            //   LAYERS: 'topp:states',
            // },
            url: 'http://192.168.2.4:9080/geowebcache/service/wms',
            params: {
              LAYERS: 'guangdong',
              TILED: true,
              // SRS: 'EPSG:4326',
              VERSION: '1.1.1',
            },
            tileGrid: new ol.tilegrid.TileGrid({
              tileSize: [256, 256],
              origin: [-400.0, 400.0],
              resolutions: [
                0.01903568804664224,
                0.00951784402332112,
                0.00475892201166056,
                0.00237946100583028,
                0.00118973050291514,
                5.9486525145757e-4,
                2.97432625728785e-4,
                1.5228550437313792e-4,
                7.614275218656896e-5,
                3.807137609328448e-5,
                1.903568804664224e-5,
                9.51784402332112e-6,
              ],
            }),
            projection: 'EPSG:4326',
            serverType: 'geoserver',
            transition: 5000,
          }),
          zIndex: 20,
        }),
      ],
      view: new ol.View({
        projection: 'EPSG:3857',
        center: [112, 23],
        zoom: 4,
      }),
    })
  }
}
