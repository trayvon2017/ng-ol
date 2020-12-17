import { Component, OnInit } from '@angular/core'
import * as ol from 'openlayers'
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
  mapCache = {
    44: {
      rno: 44,
      rpno: 0,
      rname: '广东省',
    },
  }
  constructor() {}

  ngOnInit() {
    this.mapView = new ol.View({
      center: [112, 21],
      zoom: 7,
      projection: 'EPSG:4326',
    })
  }

  onMainMapLoaded(map: ol.Map) {
    this.map = map
    this.addWfslayer()
    this.map.getView().on('change:resolution', (e) => {
      const zoom = Math.floor(this.map.getView().getZoom())
      if (this.currentZoom && zoom < this.currentZoom) {
        this.currentZoom = zoom
        if (this.mapCache[this.rno] && this.mapCache[this.rno]['rpno'] !== 0) {
          this.rno = this.mapCache[this.rno]['rpno']
          this.vectorSource.clear()
        }
      }
    })
  }

  addWfslayer() {
    if (!this.vectorSource) {
      this.vectorSource = new ol.source.Vector({
        format: new ol.format.GeoJSON(),
        // url: `/geoserver/wfs?service=wfs&version=2.0.0&request=GetFeature&typeNames=ksp:t_region&srsname=EPSG:4326&outputFormat=application/json&cql_filter=rno=${this.regiono}`,
        // url: `/geoserver/wfs?service=wfs&version=2.0.0&request=GetFeature&typeNames=ksp:t_region&srsname=EPSG:4326&outputFormat=application/json&cql_filter=rpno=${this.regiono}`,
        url: () => {
          return `/geoserver/wfs?service=wfs&version=2.0.0&request=GetFeature&typeNames=ksp:t_region&srsname=EPSG:4326&outputFormat=application/json&cql_filter=rpno=${this.rno}`
        },
        strategy: ol.loadingstrategy.all,
      })

      var vector = new ol.layer.Vector({
        source: this.vectorSource,
        style: new ol.style.Style({
          stroke: new ol.style.Stroke({
            color: '#5EFFFF',
            width: 2,
          }),
        }),
      })
      this.map.addLayer(vector)
      this.addHoverInteraction(vector)
      this.addSelectInteraction(vector)
    }
    this.vectorSource.on('addfeature', (e) => {
      console.log('addfeature')
    })
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
        console.log(this.map.getView().getZoom())
        this.currentZoom = this.map.getView().getZoom()
        console.log('当前组织:', this.mapCache[this.rno])
      })
    })
  }

  addHoverInteraction(layer) {
    const that = this
    let selectionAction = new ol.interaction.Select({
      condition: ol.events.condition.pointerMove,
      layers: [layer],
      style: new ol.style.Style({
        stroke: new ol.style.Stroke({
          color: '#00F4FF',
          width: 1,
        }),
        fill: new ol.style.Fill({
          color: 'rgba(0,244,255, 0.5)',
        }),
      }),
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
      }
    })
    selectionAction.on('deselect', () => {
      console.log('hover-deselect')
    })
  }

  addSelectInteraction(layer) {
    let selectionAction = new ol.interaction.Select({
      condition: ol.events.condition.doubleClick,
      layers: [layer],
      // style: null,
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
    selectionAction.on('selected', (e) => {
      console.log('select')
      const collection: ol.Collection<ol.Feature> = e.target.getFeatures()
      let selectedFeature, props
      if (collection.getLength()) {
        selectedFeature = collection.item(0)
        props = selectedFeature.getProperties()
        if (props.levelid < 4) {
          const { rno, rpno, rname } = props
          if (!this.mapCache[rno]) {
            this.mapCache[rno] = {
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
    selectionAction.on('deselected', function (e) {
      // console.log(arguments)
      console.log('deselect')
    })
  }

  fit(extent, cb?) {
    this.map.getView().fit(extent, {
      size: this.map.getSize(),
      duration: 1000,
      callback: () => {
        cb && cb()
      },
    })
  }
}
