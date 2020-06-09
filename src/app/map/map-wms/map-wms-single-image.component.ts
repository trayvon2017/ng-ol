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
        ratio: 1,
        projection: 'EPSG:4326',
        url: 'http://192.168.2.2:9080/geoserver/ksp/wms',
        params: {
          // REQUEST: 'GetFeatureInfo',
          LAYERS: 'ksp:115',
          ratio: 1,
          SRS: 'EPSG:404000',
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
      }),
    })

    map.addLayer(imgLayer)
  }
}
