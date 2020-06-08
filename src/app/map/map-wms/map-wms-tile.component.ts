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
        /* pingyuan */
        new ol.layer.Tile({
          // extent: [-400.0, -28.835980314756398, 223.76142591237294, 400.0],
          source: new ol.source.TileWMS({
            url: 'https://192.168.2.2:5447/geowebcache/service/wms',
            params: {
              LAYERS: 'pingyuan',
              TILED: true,
              VERSION: '1.1.1',
            },
            tileGrid: new ol.tilegrid.TileGrid({
              tileSize: [256, 256],
              origin: [-2.0037508342787e7, 2.0037508342787e7],
              resolutions: [
                156543.033928,
                78271.5169639999,
                39135.7584820001,
                19567.8792409999,
                9783.93962049996,
                4891.96981024998,
                2445.98490512499,
                1222.99245256249,
                611.49622628138,
                305.748113140558,
                152.874056570411,
                76.4370282850732,
                38.2185141425366,
                19.1092570712683,
                9.55462853563415,
                4.77731426794937,
                2.38865713397468,
                1.19432856685505,
                0.597164283559817,
                0.298582141647617,
              ],
            }),
            projection: 'EPSG:3857',
            serverType: 'geoserver',
            transition: 0,
          }),
          zIndex: 20,
        }),
      ],
      //   new ol.layer.Tile({
      //     // extent: [-400.0, -28.835980314756398, 223.76142591237294, 400.0],
      //     source: new ol.source.TileWMS({
      //       // url: 'https://ahocevar.com/geoserver/wms',
      //       // params: {
      //       //   LAYERS: 'topp:states',
      //       // },
      //       url: 'https://192.168.2.2:5447/geowebcache/service/wms',
      //       params: {
      //         LAYERS: 'guangdong',
      //         TILED: true,
      //         VERSION: '1.1.1',
      //       },
      //       tileGrid: new ol.tilegrid.TileGrid({
      //         tileSize: [256, 256],
      //         origin: [-400.0, 400.0],
      //         resolutions: [
      //           0.00951784402332112,
      //           0.007138383017490841,
      //           0.00475892201166056,
      //           0.00237946100583028,
      //           0.00118973050291514,
      //           5.9486525145757e-4,
      //         ],
      //       }),
      //       projection: 'EPSG:4326',
      //       serverType: 'geoserver',
      //       transition: 0,
      //     }),
      //     zIndex: 20,
      //   }),
      // ],
      view: new ol.View({
        projection: 'EPSG:3857',
        center: [112, 23],
        zoom: 4,
      }),
    })
  }
}
