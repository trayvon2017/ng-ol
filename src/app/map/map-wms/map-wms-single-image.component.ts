import { Component, OnInit } from '@angular/core'
import * as ol from 'openlayers'
@Component({
  selector: 'app-map-wms',
  template: `
    <div id="map"><div></div></div>
  `,
  styles: []
})
export class MapWmsSingleImageComponent implements OnInit {
  constructor() {}

  ngOnInit() {}

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    this.initMap()
  }
  initMap() {
    new ol.Map({
      target: 'map',
      layers: [
        new ol.layer.Tile({
          source: new ol.source.OSM()
        }),
        new ol.layer.Image({
          source: new ol.source.ImageWMS({
            projection: 'EPSG:3857',
            url: 'https://ahocevar.com/geoserver/wms',
            params: {
              LAYERS: 'topp:states'
            },
            // ratio: 1,
            serverType: 'geoserver'
          })
        })
      ],
      view: new ol.View({
        projection: 'EPSG:3857',
        center: [-10997148, 4569099],
        zoom: 4
      })
    })
  }
}
