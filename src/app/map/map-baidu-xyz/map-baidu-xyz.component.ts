import { Component, OnInit } from '@angular/core'
import * as ol from 'openlayers'
@Component({
  selector: 'app-map-baidu-xyz',
  templateUrl: './map-baidu-xyz.component.html',
  styles: []
})
export class MapBaiduXyzComponent implements OnInit {
  constructor() {}

  ngOnInit() {
    this.initMap()
  }
  initMap() {
    let baiduLayer = new ol.layer.Tile({
      source: new ol.source.XYZ({
        tilePixelRatio: 2,
        tileUrlFunction: function(tileCoord) {
          let z = tileCoord[0]
          let x = tileCoord[1]
          let y = tileCoord[2]
          let half = Math.pow(2, z - 1)

          let tempBdX = x - half / 2
          let tempBdY = half / 2 - y
          let bdX = tempBdX < 0 ? 'M' + -tempBdX : tempBdX
          let bdY = tempBdY < 0 ? 'M' + -tempBdY : tempBdY
          return (
            'http://online2.map.bdimg.com/onlinelabel/?qt=tile&x=' +
            bdX +
            '&y=' +
            bdY +
            '&z=' +
            z +
            '&styles=pl&udt=20160321&scaler=2&p=0'
          )
        }
      })
    })

    new ol.Map({
      target: 'map',
      layers: [baiduLayer],
      view: new ol.View({
        projection: 'EPSG:3857',
        center: ol.proj.fromLonLat([104.06, 30.67]),
        zoom: 10
      })
    })
  }
}
