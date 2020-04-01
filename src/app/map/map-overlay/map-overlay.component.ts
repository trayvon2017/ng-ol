import { Component, OnInit, ViewChild, ElementRef } from '@angular/core'
import * as ol from 'openlayers'
import { MakerComponent } from './maker/maker.component'
@Component({
  selector: 'app-map-overlay',
  templateUrl: './map-overlay.component.html',
  styles: []
})
export class MapOverlayComponent implements OnInit {
  @ViewChild('maker', null) marker: MakerComponent
  overlay: ol.Overlay
  constructor(private elementRef: ElementRef) {}

  ngOnInit() {
    this.initMap()
  }
  initMap() {
    let map = new ol.Map({
      target: 'map',
      layers: [
        new ol.layer.Tile({
          source: new ol.source.OSM()
        })
      ],
      view: new ol.View({
        center: [0, 0],
        zoom: 0
      })
    })
    var pos = ol.proj.fromLonLat([16.3725, 48.208889])
    this.overlay = new ol.Overlay({
      // position: pos,
      // positioning: 'center-center',
      element: this.marker.getNativeElement(),
      stopEvent: true,
      autoPan: true
    })
    map.addOverlay(this.overlay)
    const that = this
    map.on('click', function(evt) {
      var coordinate = evt['coordinate']
      var hdms = ol.coordinate.toStringHDMS(
        ol.proj.transform(coordinate, 'EPSG:3857', 'EPSG:4326')
      )
      that.marker.setContent(hdms)
      that.overlay.setElement(that.marker.getNativeElement())
      that.overlay.setPosition(coordinate)
    })
  }
}
