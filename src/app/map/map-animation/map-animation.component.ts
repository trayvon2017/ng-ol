import { Component, OnInit } from '@angular/core'
import * as ol from 'openlayers'
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
      rotation: this.rotation + Math.PI
    })
  }

  rotateRight() {}

  pan(des) {}
  elastic(des) {}
  bounce(des) {}
  spin(des) {}
  fly(des) {}
  rotateAround(des) {}
  tour() {}
}
