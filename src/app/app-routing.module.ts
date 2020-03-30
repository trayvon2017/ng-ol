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
import { MapBaiduXyzComponent } from './map/map-baidu-xyz/map-baidu-xyz.component'
import { MapVectorSourceComponent } from './map/map-vector-source/map-vector-source.component'
import { MapWmsSingleImageComponent } from './map/map-wms/map-wms-single-image.component'
import { MapWmsTileComponent } from './map/map-wms/map-wms-tile.component'
import { MapDrawStyleComponent } from './map/map-draw-style/map-draw-style.component'

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
  { path: 'map-baidu-xyz', component: MapBaiduXyzComponent },
  { path: 'map-vector-source', component: MapVectorSourceComponent },
  { path: 'map-wms-single-image', component: MapWmsSingleImageComponent },
  { path: 'map-wms-tile', component: MapWmsTileComponent },
  { path: 'map-draw-style', component: MapDrawStyleComponent },
  { path: 'map-overview-map', component: MapOverviewMapComponent }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
