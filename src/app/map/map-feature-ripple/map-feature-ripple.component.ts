import { Component, OnInit } from '@angular/core'
import * as ol from 'openlayers'
import { MapUtilService } from 'src/app/service/map-util.service'
import $ from 'jquery'
@Component({
  selector: 'app-map-feature-ripple',
  templateUrl: './map-feature-ripple.component.html',
  styleUrls: ['./map-feature-ripple.component.scss'],
})
export class MapFeatureRippleComponent implements OnInit {
  map: ol.Map
  featureNum: number = 1
  vectorLayer: ol.layer.Vector
  features = []
  points = []
  overlayArr = []
  constructor(private mapUtil: MapUtilService) {}

  ngOnInit() {
    this.initMap()
    this.points = this.getPoints()
    this.drawFeature()
  }

  getRandomNum() {
    this.featureNum = Math.floor(1 + Math.random() * 10)
    console.warn(this.featureNum)
  }
  /**
   * 请求数据
   */
  getPoints() {
    this.getRandomNum()
    let points = []
    for (let index = 0; index < this.featureNum; index++) {
      let point = this.mapUtil.getRandomGeom()
      points.push(point)
    }
    return points
  }
  drawFeature() {
    this.features = []
    this.points.forEach((point) => {
      var feature = new ol.Feature({
        geometry: point,
      })
      this.features.push(feature)
    })
    this.vectorLayer = new ol.layer.Vector({
      source: new ol.source.Vector({
        features: this.features,
      }),
      style: new ol.style.Style({
        image: new ol.style.Icon({
          src: 'assets/images/fire.png',
          imgSize: [26, 34],
          anchor: [0.5, 1],
        }),
      }),
    })
    this.map.addLayer(this.vectorLayer)
    this.points.forEach((e, i) => {
      let newDiv = document.createElement('div')
      newDiv.className = 'ripple'
      let pulse1 = document.createElement('div')
      pulse1.className = 'pulse1'
      newDiv.appendChild(pulse1)
      let pulse2 = document.createElement('div')
      pulse2.className = 'pulse2'
      newDiv.appendChild(pulse2)
      let pulse3 = document.createElement('div')
      pulse3.className = 'pulse3'
      newDiv.appendChild(pulse3)
      const marker = new ol.Overlay({
        position: e.getCoordinates(), // 标注位置
        positioning: 'center-center', // 标注相对与锚点的方位
        element: newDiv,
        stopEvent: false,
      })
      this.map.addOverlay(marker)
      this.overlayArr.push(marker)
      let top = $(`<div class="ol-popup-ripple">
      <p>${e.getCoordinates()}!</p>
      </div>`)

      const marker2 = new ol.Overlay({
        position: e.getCoordinates(), // 标注位置
        positioning: 'center-center', // 标注相对与锚点的方位
        element: top[0],
        stopEvent: false,
        offset: [0, -34],
      })

      this.overlayArr.push(marker2)
      this.map.addOverlay(marker2)
      setTimeout(() => {
        this.map.render()
      }, 1000)
    })
  }

  initMap() {
    this.map = new ol.Map({
      target: 'map',
      layers: [
        new ol.layer.Tile({
          source: new ol.source.OSM(),
        }),
      ],
      view: new ol.View({
        projection: 'EPSG:3857',
        center: [0, 0],
        zoom: 0,
      }),
    })
  }

  update() {
    this.map.removeLayer(this.vectorLayer)
    console.warn('overlay的个数', this.map.getOverlays().getArray().length)
    this.overlayArr.forEach((e) => {
      this.map.removeOverlay(e)
    })
    console.warn('overlay的个数', this.map.getOverlays().getArray().length)
    this.points = this.getPoints()
    this.drawFeature()
  }
}
