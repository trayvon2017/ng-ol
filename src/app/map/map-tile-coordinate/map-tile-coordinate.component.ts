import { Component, OnInit } from '@angular/core'
import * as ol from 'openlayers'
@Component({
  selector: 'app-map-tile-coordinate',
  templateUrl: './map-tile-coordinate.component.html',
  styles: []
})
export class MapTileCoordinateComponent implements OnInit {
  constructor() {}

  ngOnInit() {
    this.initMap()
  }
  initMap() {
    let osmSource = new ol.source.OSM()
    const map = new ol.Map({
      layers: [
        new ol.layer.Tile({
          source: osmSource
        }),
        new ol.layer.Tile({
          source: new ol.source.TileDebug({
            projection: 'EPSG:3857',
            tileGrid: osmSource.getTileGrid() // 获取osm地图的瓦片坐标系
          })
        })
      ],
      target: 'map',
      view: new ol.View({
        center: ol.proj.transform([104, 30], 'EPSG:4326', 'EPSG:3857'),
        zoom: 10
      })
    })
  }
}
