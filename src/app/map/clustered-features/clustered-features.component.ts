import { Component, OnInit } from '@angular/core'
import * as ol from 'openlayers'
@Component({
  selector: 'app-clustered-features',
  templateUrl: './clustered-features.component.html',
  styles: []
})
export class ClusteredFeaturesComponent implements OnInit {
  clusterSource: ol.source.Cluster

  constructor() {}

  ngOnInit() {
    this.initClusterSource()
    this.initMap()
  }
  initMap() {
    const that = this
    const map = new ol.Map({
      target: 'map',
      layers: [
        new ol.layer.Tile({
          source: new ol.source.OSM()
        }),
        new ol.layer.Vector({
          source: this.clusterSource,
          style: function(feature) {
            return that.styleFunction(feature)
          }
        })
      ],
      view: new ol.View({
        center: [0, 0],
        zoom: 0
      })
    })
    map.on('click', function(evt: ol.MapBrowserEvent) {
      console.log(evt)
      let pixel = evt.pixel
      let featureArray = []
      map.forEachFeatureAtPixel(pixel, (feature: ol.Feature) => {
        let clusterFlag = false
        if (feature) {
          //捕捉到要素
          if (feature.getProperties().features) {
            //聚合情况下
            if (feature.getProperties().features.length == 1) {
              //只有一个要素
              feature = feature.getProperties().features[0] //获取该要素
              // 聚合->单个要素
            } else {
              // 聚合->多个要素
              clusterFlag = true
            }
          } else {
            //非聚合情况下
          }
          if (clusterFlag) {
            featureArray = featureArray.concat(feature.getProperties().features)
          } else {
            featureArray.push(feature)
          }
        }
        if (featureArray.length > 1) {
          if (map.getView().getZoom() < 20) {
            // 多个深入
            const f = new ol.Feature()
            f.setProperties({
              features: featureArray
            })
            that.selectStyleFunction(f, map)
          } else {
            // => 多个 弹出选择
            alert('弹窗')
          }
        } else if (featureArray.length === 1) {
          let singleFeature = featureArray[0]
          // => 单个
          alert('详情')
        }
      })
    })
  }

  selectStyleFunction(f, map: ol.Map) {
    console.log(f)
    let view = map.getView()
    const features = f.get('features')
    const multiPoint = new ol.geom.MultiPoint([])
    features.forEach((feature: ol.Feature) => {
      multiPoint.appendPoint(<ol.geom.Point>feature.getGeometry())
    })
    view.fit(multiPoint, {
      padding: [50, 50, 50, 50],
      duration: 250
    })
  }
  initClusterSource() {
    let featureNum = 2000
    let features = []
    let e = 4500000
    for (let i = 0; i < 2000; i++) {
      features.push(
        new ol.Feature(
          new ol.geom.Point([
            2 * e * Math.random() - e,
            2 * e * Math.random() - e
          ])
        )
      )
    }
    let source = new ol.source.Vector({
      features
    })
    this.clusterSource = new ol.source.Cluster({
      source,
      distance: 10
    })
  }
  styleCache = {}
  styleFunction(feature) {
    let size = feature.get('features').length
    let style = this.styleCache[size]
    if (!style) {
      style = new ol.style.Style({
        image: new ol.style.Circle({
          radius: this.getNumberCount(size) * 10,
          stroke: new ol.style.Stroke({
            color: [255, 20, 20, 0.5],
            width: 2
          }),
          fill: new ol.style.Fill({
            color: [20, 20, 20, 0.2]
          })
        }),
        text: new ol.style.Text({
          text: size.toString(),
          fill: new ol.style.Fill({
            color: '#fff'
          })
        })
      })
      this.styleCache[size] = style
    }
    return style
  }

  /**
   * 判断一个自然数的位数
   * @param num
   */
  getNumberCount(num) {
    let count = 1
    num /= 10
    while (num >= 1) {
      count++
      num /= 10
    }
    return count
    // return ('' + num).length
  }
}
