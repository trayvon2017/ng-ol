import { Component, OnInit } from '@angular/core'
import * as ol from 'openlayers'
import * as $ from 'jquery'
@Component({
  selector: 'app-cluster-users',
  templateUrl: './cluster-users.component.html',
  styleUrls: ['./cluster-users.component.scss'],
})
export class ClusterUsersComponent implements OnInit {
  mapView: ol.View
  map: ol.Map
  constructor() {}

  ngOnInit() {
    console.log('init')
    this.mapView = new ol.View({
      // center: ,
      center: ol.proj.transform([112, 21], 'EPSG:4326', 'EPSG:3857'),
      zoom: 7,
      projection: 'EPSG:3857',
      maxZoom: 17,
    })
    this.mapView.on('change:resolution', (e) => {
      console.log('zoom:', this.mapView.getZoom())
    })
  }

  onMainMapLoaded(map: ol.Map) {
    this.map = map
    this.getUsers()
  }

  getUsers() {
    $.get('/assets/user2.json', (data) => {
      console.log(data)
      // const features = []
      // data.body.forEach((item) => {
      //   item.items.forEach((user) => {
      //     features.push(
      //       new ol.Feature(
      //         new ol.geom.Point(
      //           ol.proj.transform(user.lastLocation, 'EPSG:4326', 'EPSG:3857')
      //         )
      //       )
      //     )
      //   })
      // })
      debugger
      // data.features.forEach((element, index) => {
      //   console.log(index + ':', element.geometry.coordinates)
      // })
      let features = new ol.format.GeoJSON().readFeatures(data, {
        dataProjection: 'EPSG:4326',
        featureProjection: 'EPSG:3857',
      })
      features.forEach((element, index) => {
        console.log(index + ':', element.getGeometry())
      })
      features = [features[0]]
      if (features.length) {
        let source = new ol.source.Vector({
          features,
        })
        console.log(features)
        this.map.addLayer(
          new ol.layer.Vector({
            // source,
            source: new ol.source.Cluster({
              source,
              distance: 50,
            }),
            style: this.clusterUserStyleFunction,
          })
        )
        const sI = new ol.interaction.Select({
          condition: function (evt) {
            return evt.type == 'singleclick'
          },
          style: this.selectStyleFunction,
        })
        this.map.addInteraction(sI)
        sI.on('select', (e) => {
          if (e['selected'].length) {
            const selected = e['selected'][0]
            console.log(selected instanceof ol.Feature)
            const features = selected.get('features')
            const multiPoint = new ol.geom.MultiPoint([])
            features.forEach((feature: ol.Feature) => {
              multiPoint.appendPoint(<ol.geom.Point>feature.getGeometry())
            })
            this.mapView.fit(multiPoint, {
              padding: [50, 50, 50, 50],
              duration: 250,
            })
          }
        })
      }
    })
  }

  selectStyleFunction = (feature) => {
    var styles
    const features = feature.get('features')
    if (features && features.length > 1) {
      styles = [
        new ol.style.Style({
          image: new ol.style.Circle({
            radius: 5,
            fill: new ol.style.Fill({
              color: 'rgba(255, 255, 255, 0.01)',
            }),
          }),
        }),
      ]
    } else {
      styles = [
        new ol.style.Style({
          image: new ol.style.Icon({
            src: 'assets/images/ranger.png',
            size: [26, 26],
          }),
        }),
      ]
    }

    // var originalFeatures = feature.get('features')
    // var originalFeature
    // for (var i = originalFeatures.length - 1; i >= 0; --i) {
    //   originalFeature = originalFeatures[i]
    //   styles.push(
    //     new ol.style.Style({
    //       image: new ol.style.Icon({
    //         src: 'assets/images/ranger.png',
    //         size: [26, 26],
    //       }),
    //     })
    //   )
    // }
    return styles
  }

  styleCache = {}
  clusterUserStyleFunction = (feature) => {
    let size = feature.get('features').length
    let style = this.styleCache[size]
    if (!style) {
      if (size === 1) {
        style = new ol.style.Style({
          image: new ol.style.Icon({
            src: 'assets/images/ranger.png',
            size: [26, 26],
          }),
        })
      } else {
        style = new ol.style.Style({
          image: new ol.style.Icon({
            src: 'assets/images/GreenPin.png',
          }),
          text: new ol.style.Text({
            text: size.toString(),
            fill: new ol.style.Fill({
              color: '#fff',
            }),
          }),
        })
      }
      this.styleCache[size] = style
    }
    return style
  }

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
