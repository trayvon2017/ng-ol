import { Component, OnInit } from '@angular/core'
import * as ol from 'openlayers'
import { elastic, bounce } from './easing'
@Component({
  selector: 'app-map-animation',
  templateUrl: './map-animation.component.html',
  styles: []
})
export class MapAnimationComponent implements OnInit {
  london = ol.proj.fromLonLat([-0.12755, 51.507222])
  moscow = ol.proj.fromLonLat([37.6178, 55.7517])
  istanbul = ol.proj.fromLonLat([28.9744, 41.0128])
  rome = ol.proj.fromLonLat([12.5, 41.9])
  bern = ol.proj.fromLonLat([7.4458, 46.95])
  view: ol.View
  rotation: number
  constructor() {}

  ngOnInit() {}

  ngAfterViewInit(): void {
    this.initMap()
  }

  initMap() {
    this.view = new ol.Map({
      target: 'map',
      layers: [
        new ol.layer.Tile({
          source: new ol.source.OSM()
        })
      ],
      view: new ol.View({
        zoom: 4,
        center: [0, 0]
      }),
      loadTilesWhileAnimating: true
    }).getView()
  }

  rotateLeft() {
    this.rotation = this.view.getRotation()
    this.view.animate({
      rotation: this.rotation + Math.PI / 2
    })
  }

  rotateRight() {
    this.rotation = this.view.getRotation()
    this.view.animate({
      rotation: this.rotation - Math.PI / 2
    })
  }

  pan(des) {
    this.view.animate({
      center: des,
      duration: 2000
    })
  }
  elastic(des) {
    this.view.animate({
      center: des,
      duration: 2000,
      easing: elastic
    })
  }
  bounce(des) {
    this.view.animate({
      center: des,
      duration: 2000,
      easing: bounce
    })
  }
  spin(des) {
    this.rotation = this.view.getRotation()
    let center = this.view.getCenter()
    this.view.animate(
      {
        center: [
          center[0] + (des[0] - center[0]) / 2,
          center[1] + (des[1] - center[1]) / 2
        ],
        rotation: this.rotation + Math.PI,
        duration: 1000,
        easing: ol.easing.easeIn
      },
      {
        center: des,
        rotation: this.rotation + Math.PI * 2,
        duration: 1000,
        easing: ol.easing.easeOut
      }
    )
  }
  fly(des, done?) {
    let zoom = this.view.getZoom()
    let step = 2
    let called = false
    let duration = 2000

    function callback(complete) {
      --step
      if (called) return
      if (step === 0 || !complete) {
        called = true
        done && done(complete)
      }
    }
    this.view.animate(
      {
        center: des,
        duration
      },
      callback
    )
    this.view.animate(
      {
        zoom: zoom - 1,
        duration: duration / 2
      },
      {
        zoom: zoom,
        duration: duration / 2
      },
      callback
    )
  }
  rotateAround(des) {
    this.rotation = this.view.getRotation()
    this.view.animate(
      {
        rotation: this.rotation + Math.PI,
        anchor: des,
        easing: ol.easing.easeIn
      },
      {
        rotation: this.rotation + Math.PI * 2,
        anchor: des,
        easing: ol.easing.easeOut
      }
    )
  }
  onTour = false
  tour() {
    this.onTour = true
    const desArr = [this.rome, this.moscow, this.istanbul, this.rome, this.bern]
    // 随机去的地方
    // 随机旅行天数
    let days = Math.floor(Math.random() * 7) + 1
    const that = this
    let index = Math.floor(Math.random() * 5)
    function done(complete) {
      if (--days !== 0) {
        index = Math.floor(Math.random() * 5)
        setTimeout(() => {
          that.fly(desArr[index], done)
        }, 500)
      }
    }
    this.fly(desArr[index], done)
  }
}
