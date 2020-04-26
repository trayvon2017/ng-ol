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
  featureNum: number = 2
  constructor(private mapUtil: MapUtilService) {}
  features = []
  points = []
  overlayArr = []
  ngOnInit() {
    this.initMap()
    this.initGeature()
    setTimeout(() => {
      this.map.removeOverlay(this.overlayArr.shift())
    }, 5000)
  }
  initGeature() {
    for (let index = 0; index < this.featureNum; index++) {
      let point = this.mapUtil.getRandomGeom()
      this.points.push(point)
      var feature = new ol.Feature(point)
      this.features.push(feature)
    }
    this.map.addLayer(
      new ol.layer.Vector({
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
    )

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
      let top = $(`<div class="ol-popup">
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
}
