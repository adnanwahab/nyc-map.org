import { StaticMap } from 'react-map-gl'
import DeckGL, {
  ScatterplotLayer,
  GeoJsonLayer,
  LineLayer,
  HexagonLayer
} from 'deck.gl'
import GL from '@luma.gl/constants'

import { HeatmapLayer } from '@deck.gl/aggregation-layers'

import { h3ToGeo } from 'h3-js'
import { H3HexagonLayer } from '@deck.gl/geo-layers'

import { CSVLoader } from '@loaders.gl/csv'
import { load } from '@loaders.gl/core'

const INITIAL_VIEW_STATE = {
  longitude: -73.91922208269459,
  latitude: 40.72185277744134,
  zoom: 11.502812637593744,
  pitch: 0,
  bearing: 0,
  width: 960,
  height: 500
}

const Map = (props) => {
  return (
    <DeckGL
      getTooltip={({object}) => {
        if (!object) return null;
        let html = `<div>${object.name}</div>`
        console.log(object)
        if (object.image_url) html+= `<img width="250px" height="250px" src=${object.image_url}>`
        return {html}
      }}
      controller initialViewState={INITIAL_VIEW_STATE} layers={props.layers || []}>
      <StaticMap
        mapboxApiAccessToken={MAPBOX_TOKEN}
        mapStyle='mapbox://styles/mapbox/light-v9'
      />

    </DeckGL>
  )
}

export default Map
