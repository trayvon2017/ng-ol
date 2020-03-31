import { Component, OnInit } from '@angular/core'
import * as ol from 'openlayers'
@Component({
  selector: 'app-map-label-image',
  templateUrl: './map-label-image.component.html',
  styles: []
})
export class MapLabelImageComponent implements OnInit {
  constructor() {}

  ngOnInit() {}

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    this.initMap()
  }

  initMap() {
    // feature
    const labelStyle = new ol.style.Style({
      image: new ol.style.Icon({
        src: 'assets/images/star.png'
        // scale: 0.1
      })
    })

    const labelFeature = new ol.Feature({
      geometry: new ol.geom.Point([12956325, 4851028])
    })

    labelFeature.setStyle(labelStyle)

    const vectorSource = new ol.source.Vector()

    vectorSource.addFeature(labelFeature)
    // map
    new ol.Map({
      target: 'map',
      layers: [
        new ol.layer.Tile({
          source: new ol.source.OSM()
        }),
        new ol.layer.Vector({
          source: vectorSource
        })
      ],
      view: new ol.View({
        projection: 'EPSG:3857',
        center: [12956325, 4851028],
        zoom: 10
      })
    })
  }
}
