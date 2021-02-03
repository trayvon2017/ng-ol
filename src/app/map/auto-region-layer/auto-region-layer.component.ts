import { Component, OnInit } from '@angular/core'
import * as ol from 'openlayers'
import * as $ from 'jquery'
@Component({
  selector: 'app-auto-region-layer',
  templateUrl: './auto-region-layer.component.html',
  styleUrls: ['./auto-region-layer.component.scss'],
})
export class AutoRegionLayerComponent implements OnInit {
  mapView: ol.View
  map: ol.Map
  constructor() {}

  ngOnInit() {
    console.log('init')
    this.mapView = new ol.View({
      // center: ,
      center: ol.proj.transform([112, 21], 'EPSG:4326', 'EPSG:3857'),
      zoom: 7,
      projection: 'EPSG:3857',
      maxZoom: 17,
    })
    this.mapView.on('change:resolution', (e) => {
      console.log('zoom:', this.mapView.getZoom())
    })
  }

  onMainMapLoaded(map: ol.Map) {
    this.map = map
    // this.addWmsImageLayer()
    this.addWmsTileLayer()
  }
  regionLayerMap = {
    '2': null,
    '3': null,
    '4': null,
  }
  getRegionLayerByLevelId(levelId, visible) {
    return new ol.layer.Tile({
      visible,
      source: new ol.source.TileWMS({
        crossOrigin: 'anonymous',
        params: {
          LAYERS: 'ksp:t_region',
          TILED: false,
          SRS: 'EPSG:4326',
          WIDTH: '768',
          HEIGHT: '523',
          REQUEST: 'GetMap',
          format: 'image/png',
          cql_filter: `levelid=${levelId}`,
          // 'LAYERS': '1.1.1',
          // 'FORMAT': 'image/jpeg'
        },
        url: '/geoserver/ksp/wms',
      }),
    })
  }
  addWmsTileLayer() {
    for (const key in this.regionLayerMap) {
      this.regionLayerMap[key] = this.getRegionLayerByLevelId(key, key === '2')
      this.map.addLayer(this.regionLayerMap[key])
    }
    this.map.getView().on('change:resolution', this.resolutionChanged)
  }
  addWmsImageLayer() {
    var layer = new ol.layer.Image({
      // extent: [-13884991, 2870341, -7455066, 6338219],
      source: new ol.source.ImageWMS({
        url: '/geoserver/ksp/wms',
        params: {
          LAYERS: 'ksp:t_region',
          // VERSION: '1.1.1',
          // SRS: 'EPSG:4326',
          // exceptions: 'application/vnd.ogc.se_inimage',
          cql_filter: 'levelid=2',
          // cql_filter: encodeURIComponent('levelid=2'),
          // "levelid=2 and rname not like '%林场%'"
        },
        ratio: 1,
        serverType: 'geoserver',
        projection: 'EPSG:4326',
      }),
    })
    this.map.addLayer(layer)
  }
  levelid = 2
  setRegionLayerMapVisible(levelId) {
    this.levelid = levelId
    for (const key in this.regionLayerMap) {
      if (this.regionLayerMap[key]) {
        this.regionLayerMap[key].setVisible(+key === levelId)
      }
    }
  }
  resolutionChanged = () => {
    const zoom = this.map.getView().getZoom()
    if (zoom <= 10 && this.levelid !== 2) {
      this.setRegionLayerMapVisible(2)
    } else if (zoom > 10 && zoom <= 14 && this.levelid !== 3) {
      this.setRegionLayerMapVisible(3)
    } else if (zoom > 14 && this.levelid !== 4) {
      this.setRegionLayerMapVisible(4)
    } else {
    }
  }
}
