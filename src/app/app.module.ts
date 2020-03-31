import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { NgZorroAntdModule, NZ_I18N, zh_CN } from 'ng-zorro-antd'
import { FormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { registerLocaleData } from '@angular/common'
import zh from '@angular/common/locales/zh'
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
import { MapEditGraphicComponent } from './map/map-edit-graphic/map-edit-graphic.component';
import { MapLabelTextComponent } from './map/map-label-text/map-label-text.component';
import { MapLabelImageComponent } from './map/map-label-image/map-label-image.component';
import { MapLabelOverlayComponent } from './map/map-label-overlay/map-label-overlay.component';
import { MapAnimationComponent } from './map/map-animation/map-animation.component'

registerLocaleData(zh)

@NgModule({
  declarations: [
    AppComponent,
    MapDemo1Component,
    MapZoomComponent,
    MapMousePositionComponent,
    MapOverviewMapComponent,
    MapRotateComponent,
    MapScalelineComponent,
    MapLayerSwitchComponent,
    MapTileCoordinateComponent,
    MapResolutionComponent,
    MapOsmXyzComponent,
    MapBaiduXyzComponent,
    MapVectorSourceComponent,
    MapWmsSingleImageComponent,
    MapWmsTileComponent,
    MapDrawStyleComponent,
    MapEditGraphicComponent,
    MapLabelTextComponent,
    MapLabelImageComponent,
    MapLabelOverlayComponent,
    MapAnimationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgZorroAntdModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [{ provide: NZ_I18N, useValue: zh_CN }],
  bootstrap: [AppComponent]
})
export class AppModule {}
