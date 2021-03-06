import {
  Component,
  ElementRef,
  Input,
  OnInit,
  Output,
  ViewChild,
  EventEmitter,
} from '@angular/core'
import * as ol from 'openlayers'
import { BaseMapLayers, createTiledXYZLayer } from './model/mapconfig.js'
@Component({
  selector: 'app-k-map',
  templateUrl: './k-map.component.html',
  styleUrls: ['./k-map.component.scss'],
})
export class KMapComponent implements OnInit {
  @Input() mapView = new ol.View({
    center: [113.3502585130529, 23.137800388869294],
    zoom: 7,
    projection: 'EPSG:4326',
  })
  @ViewChild('mapEle', null) mapEle: ElementRef
  @Output() onMapLoaded = new EventEmitter()
  olMap: ol.Map
  baseLayer
  constructor() {}

  ngOnInit() {
    this.initMap()
  }
  initMap() {
    this.olMap = new ol.Map({
      target: this.mapEle.nativeElement,
      // layers: this.initBaseLayer(),
      layers: [
        new ol.layer.Tile({
          source: new ol.source.OSM(),
        }),
      ],
      view: this.mapView,
      controls: ol.control.defaults({
        attribution: false,
        rotate: false,
        zoom: false,
      }),
    })
    this.onMapLoaded.emit(this.olMap)
  }
  initBaseLayer() {
    const config = BaseMapLayers[0]
    const layers = []
    config.url && layers.push(createTiledXYZLayer(config.url))
    config.labelUrl && layers.push(createTiledXYZLayer(config.labelUrl))
    return layers
  }
}
