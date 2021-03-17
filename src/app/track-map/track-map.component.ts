import { Component, OnInit } from '@angular/core'
import * as ol from 'openlayers'
import axios from 'axios'
@Component({
  selector: 'app-track-map',
  templateUrl: './track-map.component.html',
  styleUrls: ['./track-map.component.scss'],
})
export class TrackMapComponent implements OnInit {
  constructor() {}
  startArr
  ngOnInit() {}

  styles = {
    route: new ol.style.Style({
      stroke: new ol.style.Stroke({
        width: 6,
        color: [237, 212, 0, 0.8],
      }),
    }),
    start: new ol.style.Style({
      image: new ol.style.Icon({
        anchor: [0.5, 1],
        // size: [100, 100],
        scale: 0.2,
        src: '../../assets/map/p-start.png',
      }),
    }),
    end: new ol.style.Style({
      image: new ol.style.Icon({
        anchor: [0.5, 1],
        // size: [100, 100],
        scale: 0.2,
        src: '../../assets/map/p-end.png',
      }),
    }),
    geoMarker: new ol.style.Style({
      image: new ol.style.Circle({
        radius: 7,
        snapToPixel: false,
        fill: new ol.style.Fill({ color: 'black' }),
        stroke: new ol.style.Stroke({
          color: 'white',
          width: 2,
        }),
      }),
    }),
  }
  geoMarker
  map
  routeCoords
  onMapLoaded(map: ol.Map) {
    console.log(map)
    this.map = map
    axios.get('/assets/data/track01.json', {}).then((data) => {
      const pointArr = []
      const trackPoints = data.data['attendanceInfo'].points.map((e) => {
        const coor = [e.x, e.y]
        pointArr.push(coor)
        return Object.assign({}, e, { coor })
      })
      this.routeCoords = pointArr
      const startFeature = new ol.Feature({
        type: 'start',
        geometry: new ol.geom.Point(pointArr[0]),
      })
      const endFeature = new ol.Feature({
        type: 'end',
        geometry: new ol.geom.Point(pointArr[pointArr.length - 1]),
      })
      const routeFeature = new ol.Feature({
        type: 'route',
        geometry: new ol.geom.LineString(pointArr),
      })
      this.geoMarker = new ol.Feature({
        type: 'geoMarker',
        geometry: new ol.geom.Point(pointArr[0]),
      })

      map.addLayer(
        new ol.layer.Vector({
          source: new ol.source.Vector({
            features: [startFeature, endFeature, routeFeature, this.geoMarker],
          }),
          style: (feature) => {
            if (this.animating && feature.get('type') === 'geoMarker') {
              return null
            }
            return this.styles[feature.get('type')]
          },
        })
      )
      map.getView().fit(new ol.geom.LineString(pointArr))
    })
  }
  animating = false
  now

  moveFeature = (event) => {
    var vectorContext = event.vectorContext
    var frameState = event.frameState

    if (this.animating) {
      var elapsedTime = frameState.time - this.now
      // here the trick to increase speed is to jump some indexes
      // on lineString coordinates
      var index = Math.round((this.speed * elapsedTime) / 1000)

      if (index >= this.routeCoords.length) {
        this.stopAnimation(true)
        return
      }
      console.log('index:', index)
      var currentPoint = new ol.geom.Point(this.routeCoords[index])
      var feature = new ol.Feature(currentPoint)
      vectorContext.drawFeature(feature, this.styles.geoMarker)
    }
    // tell OpenLayers to continue the postcompose animation
    this.map.render()
  }
  speed
  move() {
    this.startAnimation()
  }
  startAnimation() {
    if (this.animating) {
      this.stopAnimation(false)
    } else {
      this.animating = true
      this.now = new Date().getTime()
      this.speed = 1
      // startButton.textContent = 'Cancel Animation';
      // hide geoMarker
      this.geoMarker.setStyle(null)
      // just in case you pan somewhere else
      // this.map.getView().setCenter(center);
      this.map.on('postcompose', this.moveFeature)
      this.map.render()
    }
  }

  stopAnimation(ended) {
    // this.animating = false;
    // // if animation cancelled set the marker at the beginning
    // var coord = ended ? routeCoords[routeLength - 1] : routeCoords[0];
    // /** @type {ol.geom.Point} */ (geoMarker.getGeometry())
    //     .setCoordinates(coord);
    // //remove listener
    // map.un('postcompose', moveFeature);
  }
}
