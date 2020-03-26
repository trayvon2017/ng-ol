import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-map-zoom",
  templateUrl: "./map-zoom.component.html",
  styleUrls: ["./map-zoom.component.scss"]
})
export class MapZoomComponent implements OnInit {
  mapId;
  constructor() {}

  ngOnInit() {
    this.mapId = new Date().valueOf();
  }
}
