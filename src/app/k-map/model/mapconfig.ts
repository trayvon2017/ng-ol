import * as ol from 'openlayers'
export const BaseMapLayers = [
  {
    id: 'tianditu_rs',
    type: 'TIANDITU_RS',
    name: '天地图',
    url:
      'https://t{0-6}.tianditu.gov.cn/DataServer?T=img_w&X={x}&Y={y}&L={z}&tk=9370735304473814ad8b7da79d8bfb6e',
    labelUrl:
      'https://t{0-6}.tianditu.gov.cn/DataServer?T=cia_w&x={x}&y={y}&l={z}&tk=9370735304473814ad8b7da79d8bfb6e',
    zindex: 0,
    maxZoom: 18,
    minZoom: 7,
    visible: true,
  },
  {
    id: 'YZT_YX_2017_RS',
    type: 'YZT_YX_2017_RS',
    name: '粤政图',
    url: '/ebus/zwdsj-dlk/geostar/GDDOM',
    labelUrl: '/ebus/zwdsj-dlk/geostar/DOMZJ_2000_2015',
    zindex: 0,
    maxZoom: 17,
    minZoom: 7,
    visible: false,
    PROXY_URL: 'http://19.15.15.49:9095/gmap/proxyHandler',
    PROXY_URL2: 'http://172.16.92.3:9095/gmap/proxyHandler',
    BASE_URL: 'https://19.15.0.119',
  },
  {
    id: 'vector_vt',
    type: 'VECTOR_VT',
    name: '矢量底图',
    url:
      'https://t{0-6}.tianditu.gov.cn/DataServer?T=vec_w&x={x}&y={y}&l={z}&tk=9370735304473814ad8b7da79d8bfb6e',
    labelUrl:
      'https://t{0-6}.tianditu.gov.cn/DataServer?T=cva_w&x={x}&y={y}&l={z}&tk=9370735304473814ad8b7da79d8bfb6e',
    zindex: 0,
    maxZoom: 18,
    minZoom: 7,
    visible: false,
  },
  {
    id: 'terrain_tg',
    type: 'TERRAIN_TG',
    name: '地形晕渲',
    url:
      'https://t{0-6}.tianditu.gov.cn/DataServer?T=ter_w&x={x}&y={y}&l={z}&tk=9370735304473814ad8b7da79d8bfb6e',
    labelUrl:
      'https://t{0-6}.tianditu.gov.cn/DataServer?T=cta_w&x={x}&y={y}&l={z}&tk=9370735304473814ad8b7da79d8bfb6e',
    zindex: 0,
    maxZoom: 14,
    minZoom: 7,
    visible: false,
  },
]
export function createTiledXYZLayer(url) {
  const layer = new ol.layer.Tile()
  const source = new ol.source.XYZ({
    url: url,
    crossOrigin: 'anonymous',
    wrapX: false,
  })
  layer.setSource(source)
  return layer
}
