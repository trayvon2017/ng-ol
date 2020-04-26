import { Injectable } from '@angular/core'
import * as ol from 'openlayers'
@Injectable({
  providedIn: 'root',
})
export class MapUtilService {
  constructor() {}

  getRandomGeom() {
    var x = Math.random() * 360 - 180
    var y = Math.random() * 180 - 90
    return new ol.geom.Point(
      ol.proj.transform([x, y], 'EPSG:4326', 'EPSG:3857')
    )
  }
}
