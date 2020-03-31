import { Component, OnInit } from '@angular/core'
import * as ol from 'openlayers'
import { MapLabelImageComponent } from '../map-label-image/map-label-image.component'
@Component({
  selector: 'app-map-label-overlay',
  templateUrl: './map-label-overlay.component.html',
  styles: []
})
export class MapLabelOverlayComponent implements OnInit {
  constructor() {}

  ngOnInit() {}

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    this.initMap()
  }
  initMap() {
    const map = new ol.Map({
      target: 'map',
      layers: [
        new ol.layer.Tile({
          source: new ol.source.OSM()
        })
      ],
      view: new ol.View({
        center: [12956325, 4851028],
        zoom: 2
      })
    })

    const marker = new ol.Overlay({
      position: [12956325, 4851028], // 标注位置
      positioning: 'center-center', // 标注相对与锚点的方位
      element: document.getElementById('beijing') // 充当标注的DOM元素
    })

    map.addOverlay(marker)
  }
}
