import { Component, OnInit } from '@angular/core'
import * as ol from 'openlayers'
import * as $ from 'jquery'
@Component({
  selector: 'app-map-modify-area',
  templateUrl: './map-modify-area.component.html',
  styleUrls: ['./map-modify-area.component.scss'],
})
export class MapModifyAreaComponent implements OnInit {
  currentMap: ol.Map
  geom: any
  helpTooltipElement: HTMLDivElement
  helpTooltip: ol.Overlay

  constructor() {}

  ngOnInit() {
    // const data = require('./data.json')
    // console.log(data)
  }

  ngAfterViewInit(): void {
    $.get('/assets/data.json', (data, status) => {
      this.geom = data['manageProtectArea']['geom2']
      this.initMap()
      this.addVectorLayer()
      this.addInteraction()
    })
  }
  addInteraction() {}
  addVectorLayer() {
    console.log(this.getMULTIPOLYGON([this.geom]))
    console.time('time1')
    const cos = this.getMULTIPOLYGON([this.geom])
    console.timeEnd('time1')

    console.time('time2')
    const format = new ol.format.WKT()
    let data = this.geom
    if (data.indexOf('SRID=4326;') !== -1) {
      data = data.substring(10)
    }
    console.log(
      'read',
      format.readGeometry(data, {
        dataProjection: 'EPSG:4326',
        featureProjection: 'EPSG:3857',
      })
    )
    console.timeEnd('time2')

    const geometry = new ol.geom.Polygon(cos)

    this.currentMap.getView().fit(geometry.getExtent(), {})
    var feature = new ol.Feature({
      geometry: format.readGeometry(data, {
        dataProjection: 'EPSG:4326',
        featureProjection: 'EPSG:3857',
      }),
      name: 'My Polygon',
    })

    const layer = new ol.layer.Vector({
      source: new ol.source.Vector({
        features: [feature],
      }),
    })
    this.currentMap.addLayer(layer)

    var select = new ol.interaction.Select({
      wrapX: false,
      layers: [layer],
    })

    var modify = new ol.interaction.Modify({
      features: select.getFeatures(),
    })
    this.currentMap.addInteraction(select)
    this.currentMap.addInteraction(modify)
    modify.on('change', (event) => {
      console.log('change')
    })
    modify.on('change:active', (event) => {
      console.log('change:active')
    })
    modify.on('modifyend', (event) => {
      console.log('modifyend')
      console.log(event)
      console.log(typeof event['features'])
      console.log(event['features'] instanceof ol.Collection)
      console.log(event['features'].getArray()[0])
      console.log(event['features'].constructor)
      // let geom = {}
      // Object.assign(geom, event['features'].getArray()[0].getGeometry())
      // console.log(
      //   format.writeGeometry(
      //     (<ol.geom.Geometry>geom).transform('EPSG:3857', 'EPSG:4326')
      //   )
      // )
      console.log(
        format.writeGeometry(event['features'].getArray()[0].getGeometry(), {
          dataProjection: 'EPSG:4326',
          featureProjection: 'EPSG:3857',
        })
      )
    })
    modify.on('modifystart', (event) => {
      console.log('modifystart')
    })
    modify.on('propertychange', (event) => {
      console.log('propertychange')
    })
  }

  initMap() {
    const layer = new ol.layer.Tile()
    const source = new ol.source.XYZ({
      url:
        'http://t{0-6}.tianditu.com/DataServer?T=img_w&X={x}&Y={y}&L={z}&tk=fca1fd7d7233da39b65a5c6c2a8e76a1',
      wrapX: false,
    })
    layer.setSource(source)
    this.currentMap = new ol.Map({
      target: 'map',
      layers: [layer],
      view: new ol.View({
        projection: 'EPSG:3857',
        center: [0, 0],
        zoom: 0,
      }),
    })

    // this.helpTooltipElement = document.createElement('div')
    // this.helpTooltipElement.className = 'map-tooltip hidden'
    this.helpTooltipElement = $(
      `<div class="map-tooltip">单击管护区开始编辑,按下鼠标左键选择地图上当前多边形顶点或边拖拽鼠标,松开鼠标即确定修改位置</div>`
    )[0]
    this.helpTooltip = new ol.Overlay({
      element: this.helpTooltipElement,
      offset: [15, 0],
      positioning: 'center-left',
    })
    this.currentMap.addOverlay(this.helpTooltip)

    this.currentMap.on('pointermove', (event) => {
      if (this.helpTooltip) {
        // console.log(event)
        this.helpTooltip.setPosition(event['coordinate'])
      }
    })
  }

  getMULTIPOLYGON(wktArray: Array<string>) {
    return wktArray.map((data) => {
      if (data.indexOf('SRID=4326;') !== -1) {
        data = data.substring(10)
      }
      let wkt_c = new ol.format.WKT()
      let geometry = wkt_c.readFeatures(data)
      let convertor = new ol.format.GeoJSON()
      let geojson = JSON.parse(convertor.writeFeatures(geometry))
      return this.convertPointsDataToArray(
        geojson.features[0].geometry.coordinates[0][0]
      )
    })
  }

  convertPointsDataToArray(geometry: any) {
    return geometry.map((value) => {
      let point3857 = ol.proj.transform(
        [value[0], value[1]],
        'EPSG:4326',
        'EPSG:3857'
      )
      // return { x: point3857[0], y: point3857[1] }
      return [point3857[0], point3857[1]]
    })
  }
}
