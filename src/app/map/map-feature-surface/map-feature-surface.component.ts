import { Component, OnInit } from '@angular/core'
import * as ol from 'openlayers'
import { MapUtilService } from 'src/app/service/map-util.service'
import $ from 'jquery'
@Component({
  selector: 'app-map-feature-surface',
  templateUrl: './map-feature-surface.component.html',
  styles: [],
})
export class MapFeatureSurfaceComponent implements OnInit {
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
  }
  getPoints(): any[] {
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
      var feature = new ol.Feature(point)
      this.features.push(feature)
    })
    this.vectorLayer = new ol.layer.Vector({
      source: new ol.source.Vector({
        features: this.features,
      }),

      style: new ol.style.Style({
        image: new ol.style.Icon({
          src: 'assets/images/Ranger sum.png',
          // imgSize: [26, 34],
          // anchor: [0.5, 1],
        }),
      }),
    })
    this.map.addLayer(this.vectorLayer)
    this.points.forEach((e, i) => {
      let top = $(
        `<div class="ol-popup-surface">
          <p>${Math.ceil(Math.random() * 10000)}</p>
        </div>`
      )
      const marker = new ol.Overlay({
        position: e.getCoordinates(), // 标注位置
        positioning: 'center-center', // 标注相对与锚点的方位
        element: top[0],
        stopEvent: false,
        offset: [0, -11],
      })

      this.overlayArr.push(marker)
      this.map.addOverlay(marker)
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
    this.addInteraction()
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

  addInteraction() {
    let interaction = new ol.interaction.Select({
      // 事件类型
      condition: ol.events.condition.singleClick,
      // 点击后的样式
      style: function (e) {
        console.log(e)
        return null
      },
    })
    this.map.addInteraction(interaction)
  }
}
