import { Component, OnInit } from '@angular/core'
import * as ol from 'openlayers'
import { MapUtilService } from 'src/app/service/map-util.service'
import $ from 'jquery'
@Component({
  selector: 'app-map-feature-select',
  templateUrl: './map-feature-select.component.html',
  styles: [],
})
export class MapFeatureSelectComponent implements OnInit {
  map: ol.Map
  featureNum: number = 1
  vectorLayer: ol.layer.Vector
  features = []
  points = []
  overlayArr = []
  constructor(private mapUtil: MapUtilService) {}
  eventTypeList = [
    {
      type: 'another',
      normalIcon: 'assets/images/event/another red.png',
      selectedIcon: 'assets/images/event/another blue.png',
    },
    {
      type: 'axe',
      normalIcon: 'assets/images/event/axe red.png',
      selectedIcon: 'assets/images/event/axe blue.png',
    },
    {
      type: 'fire',
      normalIcon: 'assets/images/event/fire red.png',
      selectedIcon: 'assets/images/event/fire blue.png',
    },
    {
      type: 'forest',
      normalIcon: 'assets/images/event/forest red.png',
      selectedIcon: 'assets/images/event/forest blue.png',
    },
    {
      type: 'hotspot',
      normalIcon: 'assets/images/event/hotspot red.png',
      selectedIcon: 'assets/images/event/hotspot blue.png',
    },
    {
      type: 'lightning',
      normalIcon: 'assets/images/event/lightning red.png',
      selectedIcon: 'assets/images/event/lightning blue.png',
    },
    {
      type: 'warning',
      normalIcon: 'assets/images/event/warning red.png',
      selectedIcon: 'assets/images/event/warning blue.png',
    },
    {
      type: 'worm',
      normalIcon: 'assets/images/event/worm red.png',
      selectedIcon: 'assets/images/event/worm blue.png',
    },
  ]
  ngOnInit() {
    this.initMap()
    this.points = this.getPoints()
    this.drawFeature()
  }

  getRandomNum() {
    this.featureNum = Math.floor(1 + Math.random())
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
    this.points.forEach((point, i) => {
      const data = this.eventTypeList[i % this.eventTypeList.length]
      var feature = new ol.Feature({
        geometry: point,
        // style: new ol.style.Icon({
        //   src: 'assets/images/fire.png',
        //   imgSize: [26, 34],
        //   anchor: [0.5, 1],
        // }),
        data,
      })

      // feature.setStyle(function (feature, r) {
      //   let data = feature.get('data')
      //   // console.log(data)
      //   return new ol.style.Style({
      //     image: new ol.style.Icon({
      //       src: data.normalIcon,
      //       // imgSize: [26, 34],
      //       anchor: [0.5, 1],
      //     }),
      //   })
      // })

      this.features.push(feature)
    })
    this.vectorLayer = new ol.layer.Vector({
      source: new ol.source.Vector({
        features: this.features,
      }),
      // style: new ol.style.Style({
      //   image: new ol.style.Icon({
      //     src: 'assets/images/fire.png',
      //     imgSize: [26, 34],
      //     anchor: [0.5, 1],
      //   }),
      // }),
      style: function (feature, r) {
        let data = feature.get('data')
        // console.log(data)
        return new ol.style.Style({
          image: new ol.style.Icon({
            src: data.normalIcon,
            // imgSize: [26, 34],
            anchor: [0.5, 1],
          }),
        })
      },
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
      // this.map.addOverlay(marker)
      // this.overlayArr.push(marker)
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

      // this.overlayArr.push(marker2)
      // this.map.addOverlay(marker2)

      this.addSelectInteraction()
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

  addSelectInteraction() {
    const that = this
    let selectionAction = new ol.interaction.Select({
      condition: ol.events.condition.pointerMove,
      style: function (feature, r) {
        let data = feature.get('data')
        console.log(data)
        // let top = $(`<div class="ol-popup-ripple">
        //   <p>${data.type}!</p>
        //   </div>`)

        // const marker2 = new ol.Overlay({
        //   position: (<ol.geom.Point>feature.getGeometry()).getCoordinates(), // 标注位置
        //   positioning: 'center-center', // 标注相对与锚点的方位
        //   element: top[0],
        //   stopEvent: false,
        //   offset: [0, -34],
        // })

        // that.overlayArr.push(marker2)
        // that.map.addOverlay(marker2)
        return new ol.style.Style({
          image: new ol.style.Icon({
            src: data.selectedIcon,
            // imgSize: [26, 34],
            anchor: [0.5, 1],
          }),
        })
      },
    })
    this.map.addInteraction(selectionAction)
    selectionAction.on('select', function (e) {
      console.log(arguments)
      console.log('select')
    })
    selectionAction.on('deselect', function (e) {
      console.log(arguments)
      console.log('deselect')
    })
  }
}
