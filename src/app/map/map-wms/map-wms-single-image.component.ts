import { Component, OnInit } from '@angular/core'
import * as ol from 'openlayers'
@Component({
  selector: 'app-map-wms',
  template: ` <div id="map"><div></div></div> `,
  styles: [],
})
export class MapWmsSingleImageComponent implements OnInit {
  constructor() {}

  ngOnInit() {}

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    this.initMap()
  }
  initMap() {
    const map = new ol.Map({
      target: 'map',
      layers: [
        new ol.layer.Tile({
          source: new ol.source.OSM(),
        }),
      ],
      view: new ol.View({
        projection: 'EPSG:4326',
        center: [0, 0],
        zoom: 0,
      }),
    })

    var projection = new ol.proj.Projection({
      //地图投影类型
      code: 'EPSG:4326',
      units: 'unknown',
      extent: [-400.0, 19.28623906715518, 132.99926530598282, 400.0],
    })
    const imgLayer = new ol.layer.Image({
      extent: [-400.0, 19.28623906715518, 132.99926530598282, 400.0],
      source: new ol.source.ImageWMS({
        projection: 'EPSG:4326',
        url: 'http://192.168.2.4:9080/geowebcache/service/wms',
        params: {
          // REQUEST: 'GetFeatureInfo',
          LAYERS: 'guangdong',
          ratio: 1,
          SRS: 'EPSG:4326',
          VERSION: '1.1.1',
          // FORMAT: 'application/json',
          // infoFormat: 'text/html',
          // EXCEPTIONS: 'application/vnd.ogc.se_inimage',
          // WIDTH: map.getSize()[0],
          // WIDTH: 256,
          // // HEIGHT: map.getSize()[1],
          // HEIGHT: 256,
          // BBOX: new ol.extent(),
        },
        // ratio: 1,
        serverType: 'geoserver',
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
    })

    map.addLayer(imgLayer)
  }
}
