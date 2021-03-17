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
import { MapEditGraphicComponent } from './map/map-edit-graphic/map-edit-graphic.component'
import { MapLabelTextComponent } from './map/map-label-text/map-label-text.component'
import { MapLabelImageComponent } from './map/map-label-image/map-label-image.component'
import { MapLabelOverlayComponent } from './map/map-label-overlay/map-label-overlay.component'
import { MapAnimationComponent } from './map/map-animation/map-animation.component'
import { MapOverlayComponent } from './map/map-overlay/map-overlay.component'
import { MakerComponent } from './map/map-overlay/maker/maker.component'
import { BoxSelectionComponent } from './map/box-selection/box-selection.component'
import { StylingFeatureWithCanvasComponent } from './map/styling-feature-with-canvas/styling-feature-with-canvas.component'
import { AdvancedViewPositioningComponent } from './map/advanced-view-positioning/advanced-view-positioning.component'
import { ClusteredFeaturesComponent } from './map/clustered-features/clustered-features.component'
import { CustomControlComponent } from './map/custom-control/custom-control.component'
import { MapFeatureRippleComponent } from './map/map-feature-ripple/map-feature-ripple.component'
import { MapFeatureSurfaceComponent } from './map/map-feature-surface/map-feature-surface.component'
import { MapFeatureSelectComponent } from './map/map-feature-select/map-feature-select.component'
import { MapFixedExtentComponent } from './map/map-fixed-extent/map-fixed-extent.component'
import { TestComponent } from './map/test/test.component'
import { MapModifyAreaComponent } from './map/map-modify-area/map-modify-area.component'
import { HighlightExtentComponent } from './map/highlight-extent/highlight-extent.component'
import { ScMapComponent } from './map/sc-map/sc-map.component'
import { ScMap2Component } from './map/sc-map2/sc-map2.component'
import { KMapModule } from './k-map/k-map.module';
import { RegionControlComponent } from './map/region-control/region-control.component';
import { ClusterUsersComponent } from './map/cluster-users/cluster-users.component';
import { AutoRegionLayerComponent } from './map/auto-region-layer/auto-region-layer.component';
import { TrackMapComponent } from './track-map/track-map.component'

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
    MapAnimationComponent,
    MapOverlayComponent,
    MakerComponent,
    BoxSelectionComponent,
    StylingFeatureWithCanvasComponent,
    AdvancedViewPositioningComponent,
    ClusteredFeaturesComponent,
    CustomControlComponent,
    MapFeatureRippleComponent,
    MapFeatureSurfaceComponent,
    MapFeatureSelectComponent,
    MapFixedExtentComponent,
    TestComponent,
    MapModifyAreaComponent,
    HighlightExtentComponent,
    ScMapComponent,
    ScMap2Component,
    RegionControlComponent,
    ClusterUsersComponent,
    AutoRegionLayerComponent,
    TrackMapComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgZorroAntdModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    KMapModule,
  ],
  providers: [{ provide: NZ_I18N, useValue: zh_CN }],
  bootstrap: [AppComponent],
  exports: [ScMapComponent, ScMap2Component],
})
export class AppModule {}
