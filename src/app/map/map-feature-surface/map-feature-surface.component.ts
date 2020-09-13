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
    // SRID=4326;POINT(113.358243 23.127887)
    this.getRandomNum()
    let points = []
    // for (let index = 0; index < this.featureNum; index++) {
    //   let point = this.mapUtil.getRandomGeom()
    //   points.push(point)
    // }
    points.push(
      new ol.geom.Point(
        ol.proj.transform([113.358243, 23.127887], 'EPSG:4326', 'EPSG:3857')
      )
    )
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

      style: [
        new ol.style.Style({
          image: new ol.style.Icon({
            src: 'assets/images/Ranger sum.png',
            // imgSize: [26, 34],
            // anchor: [0.5, 1],
          }),
        }),
        new ol.style.Style({
          image: new ol.style.Icon({
            src: 'assets/images/Ranger sum.png',
            // imgSize: [26, 34],
            anchor: [0.5, 1],
          }),
        }),
      ],
    })
    this.map.addLayer(this.vectorLayer)
    // this.points.forEach((e, i) => {
    //   let top = $(
    //     `<div class="ol-popup-surface">
    //     <p>10</p>
    //     </div>`
    //   )
    //   // <p>${Math.ceil(Math.random() * 10000)}</p>

    //   console.log(e.getCoordinates())
    //   const marker = new ol.Overlay({
    //     position: e.getCoordinates(), // 标注位置
    //     // positioning: 'center-center', // 标注相对与锚点的方位
    //     element: top[0],
    //     stopEvent: false,
    //     // offset: [0, -11],
    //   })

    //   this.overlayArr.push(marker)
    //   // this.map.addOverlay(marker)
    // })
  }
  initMap() {
    this.map = new ol.Map({
      target: 'map2',
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
    this.map.on('singleclick', (event) => {
      console.log(event)
      const feature = this.map.forEachFeatureAtPixel(event['pixel'], function (
        feature
      ) {
        return feature
      })
      console.log(feature)
      let c1 = ol.proj.transform(
        [113.358243, 23.127887],
        'EPSG:4326',
        'EPSG:3857'
      )
      let c2 = event['coordinate']
      this.addOverlay(c1)
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

  addOverlay(coodinate) {
    let top = $(
      `<div class="ol-popup-surface">
        <p>10</p>
        </div>`
    )
    // <p>${Math.ceil(Math.random() * 10000)}</p>

    const marker = new ol.Overlay({
      position: coodinate, // 标注位置
      // positioning: 'center-center', // 标注相对与锚点的方位
      element: top[0],
      stopEvent: false,
      // offset: [0, -11],
    })

    // this.overlayArr.push(marker)
    this.map.addOverlay(marker)
  }
}
