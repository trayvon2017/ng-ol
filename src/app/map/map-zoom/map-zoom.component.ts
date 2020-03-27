import { Component, OnInit } from '@angular/core'
import * as ol from 'openlayers'
@Component({
  selector: 'app-map-zoom',
  templateUrl: './map-zoom.component.html',
  styleUrls: ['./map-zoom.component.scss']
})
export class MapZoomComponent implements OnInit {
  mapId
  constructor() {}

  ngOnInit() {
    this.mapId = new Date().valueOf() + ''
    new ol.Map({
      target: 'map',
      // target: this.mapId,
      layers: [
        new ol.layer.Tile({
          source: new ol.source.OSM()
        })
      ],
      view: new ol.View({
        projection: 'EPSG:3857',
        center: [0, 0],
        zoom: 0
      }),
      controls: ol.control.defaults().extend([
        new ol.control.ZoomSlider(),
        new ol.control.ZoomToExtent({
          extent: [12667718, 2562800, 12718359, 2597725]
        }),
        new ol.control.FullScreen()
      ])
    })
  }
}
