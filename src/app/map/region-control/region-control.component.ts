import { Component, OnInit } from '@angular/core'
import * as ol from 'openlayers'
import * as $ from 'jquery'
@Component({
  selector: 'app-region-control',
  templateUrl: './region-control.component.html',
  styleUrls: ['./region-control.component.scss'],
})
export class RegionControlComponent implements OnInit {
  mapView: ol.View
  map: ol.Map
  rno = 44
  rpno = 0
  currentZoom
  vectorSource: ol.source.Vector
  ol = ol
  regionCacheMap = {
    44: {
      rno: 44,
      rpno: 0,
      rname: '广东省',
    },
  }
  helpTooltip: ol.Overlay
  htRegionName$Ele: any
  htAmount$Ele: any
  colorsList = [
    'RGBA(197, 229, 101, 0.8)',
    'RGBA(233, 233, 44, 0.8)',
    'RGBA(228, 167, 101, 0.8)',
    'RGBA(240, 94, 42, 0.8)',
    'RGBA(228, 26, 26, 0.8)',
  ]
  regionWfsLayer: ol.layer.Vector
  constructor() {}

  ngOnInit() {
    this.mapView = new ol.View({
      // center: ,
      center: ol.proj.transform([112, 21], 'EPSG:4326', 'EPSG:3857'),
      zoom: 7,
      projection: 'EPSG:3857',
    })
  }

  onMainMapLoaded(map: ol.Map) {
    this.map = map
    this.addWfslayer()
    this.mapView.on('change:resolution', this.changeResolution)
  }

  ngOnDestroy(): void {
    this.mapView.un('change:resolution', this.changeResolution)
    this.removeToolTip()
    this.map.removeLayer(this.regionWfsLayer)
  }

  changeResolution = (e) => {
    const zoom = Math.floor(this.mapView.getZoom())
    if (this.currentZoom && zoom < this.currentZoom) {
      this.currentZoom = null
      if (
        this.regionCacheMap[this.rno] &&
        this.regionCacheMap[this.rno]['rpno'] !== 0
      ) {
        this.rno = this.regionCacheMap[this.rno]['rpno']
        this.vectorSource.clear()
      }
    }
  }

  /**
   * 添加区域图层
   */
  addWfslayer() {
    if (!this.vectorSource) {
      this.vectorSource = new ol.source.Vector({
        format: new ol.format.GeoJSON(),
        // format: new ol.format.WKT(),
        loader: () => {
          $.get(
            `/geoserver/wfs?service=wfs&version=2.0.0&request=GetFeature&typeNames=ksp:t_region&srsname=EPSG:4326&outputFormat=application/json&cql_filter=rpno=${this.rno}`,
            (data) => {
              this.vectorSource.addFeatures(
                new ol.format.GeoJSON().readFeatures(data, {
                  dataProjection: 'EPSG:4326',
                  featureProjection: 'EPSG:3857',
                })
              )
            }
          )
          // $.ajax({
          //   url: '/security/grid/manageProtectArea/queryManageProtectAreaList',
          //   type: 'POST',
          //   contentType: 'application/json',
          //   data: JSON.stringify({
          //     messageName: 'queryManageProtectAreaList',
          //     organno: '44',
          //     isposition: 1,
          //     userId: 27547,
          //     page: { pageNo: 1, pageSize: 10 },
          //   }),
          //   success: (data) => {
          //     console.log(data)
          //     const features = []
          //     data.manageProtectAreas.forEach((element) => {
          //       let geom = element.geom
          //       if (geom.indexOf('SRID=4326;') !== -1) {
          //         geom = geom.substring(10)
          //       }
          // const format = new ol.format.WKT()
          // const geometry = format.readGeometry(geom, {
          //   dataProjection: 'EPSG:4326',
          //   featureProjection: 'EPSG:3857',
          // })
          //       const feature = new ol.Feature(geometry)
          //       feature.setProperties({
          //         rname: element.name,
          //       })
          //       features.push(feature)
          //     })
          //     this.vectorSource.addFeatures(features)
          //   },
          // })
        },
        strategy: ol.loadingstrategy.all,
      })

      var vector = new ol.layer.Vector({
        source: this.vectorSource,
        style: (feature: ol.Feature) => {
          // TODO:  feature.getProperties()
          const rno = feature.getProperties().rno
          return new ol.style.Style({
            // stroke: new ol.style.Stroke({
            //   color: '#5EFFFF',
            //   width: 2,
            // }),
            fill: new ol.style.Fill({
              color: this.colorsList[+rno % 5], //暂时的颜色
            }),
          })
        },
      })
      this.regionWfsLayer = vector
      this.map.addLayer(vector)
      this.addHoverInteraction(vector)
      this.addSelectInteraction(vector)
    }

    this.vectorSource.on('change', (e) => {
      console.log('change')
      console.log(e)
      if (e.target instanceof ol.source.Vector) {
      }
      const extent = this.vectorSource.getExtent()
      console.log(extent)
      if (extent[0] === Infinity || extent[0] === -Infinity) {
        return
      }
      this.fit(this.vectorSource.getExtent(), () => {
        this.currentZoom = this.mapView.getZoom()
        // TODO: 此处控制组织变化
        console.log('当前组织:', this.regionCacheMap[this.rno])
      })
    })
  }

  /**
   * 添加hover交互
   * @param layer
   */
  addHoverInteraction(layer) {
    const that = this
    let selectionAction = new ol.interaction.Select({
      condition: ol.events.condition.pointerMove,
      layers: [layer],
      style: (feature: ol.Feature) => {
        // TODO:  feature.getProperties()
        const rno = feature.getProperties().rno
        return new ol.style.Style({
          stroke: new ol.style.Stroke({
            color: '#5EFFFF',
            width: 2,
          }),
          fill: new ol.style.Fill({
            color: this.colorsList[+rno % 5], // 暂时的配色
          }),
        })
      },
    })
    this.map.addInteraction(selectionAction)
    selectionAction.on('select', (e) => {
      console.log('hover-select')
      const collection: ol.Collection<ol.Feature> = e.target.getFeatures()
      let selectedFeature, props
      if (collection.getLength()) {
        selectedFeature = collection.item(0)
        props = selectedFeature.getProperties()
        console.log(props)
        this.setMapToolTip(props)
      } else {
        this.removeToolTip()
      }
    })
  }

  /**
   * 给区域图层添加双击交互
   * @param layer
   */
  addSelectInteraction(layer) {
    let selectionAction = new ol.interaction.Select({
      condition: ol.events.condition.doubleClick,
      layers: [layer],
      // TODO: ???
      style: new ol.style.Style({
        stroke: new ol.style.Stroke({
          color: 'rgba(0,0,0,0)',
          width: 0,
        }),
        fill: new ol.style.Fill({
          color: 'rgba(0,0,0,0)',
        }),
      }),
    })
    this.map.addInteraction(selectionAction)
    selectionAction.on('select', (e) => {
      console.log('doubleClick select')
      const collection: ol.Collection<ol.Feature> = e.target.getFeatures()
      let selectedFeature, props
      if (collection.getLength()) {
        selectedFeature = collection.item(0)
        props = selectedFeature.getProperties()
        if (props.levelid < 4) {
          const { rno, rpno, rname } = props
          if (!this.regionCacheMap[rno]) {
            this.regionCacheMap[rno] = {
              rno,
              rpno,
              rname,
            }
          }
          this.rno = rno
          this.vectorSource.clear()
        }
      }
    })
  }

  /**
   * @param extent extent | geometry
   * @param cb
   */
  fit(extent, cb?) {
    this.mapView.fit(extent, {
      size: this.map.getSize(),
      duration: 1000,
      callback: () => {
        cb && cb()
      },
    })
  }

  /**
   *
   * @param props feature上的props
   */
  setMapToolTip(props) {
    if (!this.helpTooltip) {
      const element = $(`
      <div class="m-hover-tooltip-wrapper">
        <h1 class="tooltip-title" id="regionName"></h1>
        <p class="tooltip-content">总面积: <span id="amount"></span></p>
      </div>`)[0]
      this.htRegionName$Ele = $(element).find('#regionName')
      this.htAmount$Ele = $(element).find('#amount')
      this.helpTooltip = new ol.Overlay({
        element,
        offset: [15, 0],
        positioning: 'center-left',
      })
      this.map.addOverlay(this.helpTooltip)
      this.map.on('pointermove', this.mapTooltip)
    }
    this.htRegionName$Ele.html(props.rname)
    this.htAmount$Ele.html(props.rno)
  }

  /**
   * 处理tooltip-overlay的位置
   * @param event
   */
  mapTooltip = (event) => {
    if (this.helpTooltip) {
      this.helpTooltip.setPosition(event['coordinate'])
    }
  }

  /**
   * 移除tooltip-overlay
   */
  removeToolTip() {
    if (this.helpTooltip) {
      this.helpTooltip.setPosition(undefined)
      this.map.removeOverlay(this.helpTooltip)
      this.helpTooltip = null
      this.map.on('pointermove', this.mapTooltip)
    }
  }
}
