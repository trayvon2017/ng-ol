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
        /* arcgis */
        new ol.layer.Tile({
          // extent: [-400.0, -28.835980314756398, 223.76142591237294, 400.0],
          source: new ol.source.TileArcGISRest({
            // url: 'https://ahocevar.com/geoserver/wms',
            // params: {
            //   LAYERS: 'topp:states',
            // },
            url:
              'http://192.168.2.3:6080/arcgis/rest/services/gdbackground2/MapServer',
            // params: {
            //   LAYERS: 'guangdong',
            //   TILED: true,
            //   // SRS: 'EPSG:4326',
            //   VERSION: '1.1.1',
            // },
            tileGrid: new ol.tilegrid.TileGrid({
              tileSize: [256, 256],
              origin: [-400.0, 400.0],
              resolutions: [
                0.15228550437313793,
                0.07614275218656896,
                0.03807137609328448,
                0.01903568804664224,
                0.00951784402332112,
                0.00475892201166056,
              ],
            }),
            projection: 'EPSG:4326',
            // serverType: 'geoserver',
            // transition: 5000,
          }),
          zIndex: 20,
        }),
      ],
      /* wms */
      //   new ol.layer.Tile({
      //     // extent: [-400.0, -28.835980314756398, 223.76142591237294, 400.0],
      //     source: new ol.source.TileWMS({
      //       // url: 'https://ahocevar.com/geoserver/wms',
      //       // params: {
      //       //   LAYERS: 'topp:states',
      //       // },
      //       url: 'http://192.168.2.4:9080/geowebcache/service/wms',
      //       params: {
      //         LAYERS: 'guangdong',
      //         TILED: true,
      //         // SRS: 'EPSG:4326',
      //         VERSION: '1.1.1',
      //       },
      //       tileGrid: new ol.tilegrid.TileGrid({
      //         tileSize: [256, 256],
      //         origin: [-400.0, 400.0],
      //         resolutions: [
      //           0.15228550437313793,
      //           0.07614275218656896,
      //           0.03807137609328448,
      //           0.01903568804664224,
      //           0.00951784402332112,
      //           0.00475892201166056,
      //         ],
      //       }),
      //       projection: 'EPSG:4326',
      //       serverType: 'geoserver',
      //       transition: 5000,
      //     }),
      //     zIndex: 20,
      //   }),
      // ],
      view: new ol.View({
        // projection: 'EPSG:4326',
        center: [112, 23],
        zoom: 4,
      }),
    })
  }
}
