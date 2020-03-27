import { Component, OnInit } from '@angular/core'
import * as ol from 'openlayers'
@Component({
  selector: 'app-map-osm-xyz',
  templateUrl: './map-osm-xyz.component.html',
  styles: []
})
export class MapOsmXyzComponent implements OnInit {
  constructor() {}

  ngOnInit() {
    this.initMap()
  }
  initMap() {
    // 不同的sourceurl加载不同的地图
    let gaodeUrl =
      'http://webst0{1-4}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=7&x={x}&y={y}&z={z}'
    let daodeUrlNew =
      'http://wprd0{1-4}.is.autonavi.com/appmaptile?x={x}&y={y}&z={z}&lang=zh_cn&size=1&scl=1&style=7'
    let osmUrl = 'http://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png'
    // 雅虎需要制定tileSize
    let yahooUrl =
      'https://{0-3}.base.maps.api.here.com/maptile/2.1/maptile/newest/normal.day/{z}/{x}/{y}/512/png8?lg=ENG&ppi=250&token=TrLJuXVK62IQk0vuXFzaig%3D%3D&requestid=yahoo.prod&app_id=eAdkWGYRoc4RfxVo0Z4B'
    new ol.Map({
      target: 'map',
      layers: [
        new ol.layer.Tile({
          source: new ol.source.XYZ({
            url: daodeUrlNew
          })
        })
      ],
      view: new ol.View({
        projection: 'EPSG:3857',
        center: [0, 0],
        zoom: 0
      })
    })
  }
}
