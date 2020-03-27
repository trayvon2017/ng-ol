import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { MapDemo1Component } from './map/map-demo1/map-demo1.component'
import { MapZoomComponent } from './map/map-zoom/map-zoom.component'
import { MapMousePositionComponent } from './map/map-mouse-position/map-mouse-position.component'
import { MapOverviewMapComponent } from './map/map-overview-map/map-overview-map.component'
import { MapRotateComponent } from './map/map-rotate/map-rotate.component'
import { MapScalelineComponent } from './map/map-scaleline/map-scaleline.component'
import { MapLayerSwitchComponent } from './map/map-layer-switch/map-layer-switch.component'
import { MapTileCoordinateComponent } from './map/map-tile-coordinate/map-tile-coordinate.component'
import { MapResolutionComponent } from './map/map-resolution/map-resolution.component'
import { MapOsmXyzComponent } from './map/map-osm-xyz/map-osm-xyz.component'

const routes: Routes = [
  { path: 'simple-map', component: MapDemo1Component },
  { path: 'map-zoom', component: MapZoomComponent },
  { path: 'map-mouse-position', component: MapMousePositionComponent },
  { path: 'map-rotate', component: MapRotateComponent },
  { path: 'map-scaleline', component: MapScalelineComponent },
  { path: 'map-layer-switch', component: MapLayerSwitchComponent },
  { path: 'map-tile-coordinate', component: MapTileCoordinateComponent },
  { path: 'map-resolution', component: MapResolutionComponent },
  { path: 'map-osm-xyz', component: MapOsmXyzComponent },
  { path: 'map-overview-map', component: MapOverviewMapComponent }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
