import { Component, OnInit } from "@angular/core";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/osm";
@Component({
  selector: "app-map-demo1",
  templateUrl: "./map-demo1.component.html",
  styleUrls: ["./map-demo1.component.scss"]
})
export class MapDemo1Component implements OnInit {
  constructor() {}

  ngOnInit() {
    let map = new Map({
      target: "map",
      layers: [
        new TileLayer({
          source: new OSM()
        })
      ],
      view: new View({
        projection: "EPSG:3857",
        center: [0, 0],
        zoom: 0
      })
    });
  }
}
