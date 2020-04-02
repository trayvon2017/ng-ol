import { Component, OnInit } from '@angular/core'
import * as ol from 'openlayers'
import { RotateSouth } from './rotate-south'
@Component({
  selector: 'app-custom-control',
  templateUrl: './custom-control.component.html',
  styleUrls: ['./custom-control.component.scss']
})
export class CustomControlComponent implements OnInit {
  constructor() {}

  ngOnInit() {
    // let button = document.createElement('button')
    // button.innerHTML = 'N'
    // button.addEventListener('click', () => {
    //   console.log(23)
    // })
    // let element = document.createElement('div')
    // element.className = 'rotate-north ol-unselectable ol-control'
    // element.append(button)
    new ol.Map({
      target: 'map',
      layers: [
        new ol.layer.Tile({
          source: new ol.source.OSM()
        })
      ],
      view: new ol.View({
        center: [0, 0],
        zoom: 0
      }),
      controls: ol.control
        .defaults()
        .extend([new RotateSouth(), new ol.control.Attribution()])
    })
  }
}
