import { StaticMap } from 'react-map-gl'
import DeckGL from 'deck.gl'
import GL from '@luma.gl/constants'

import {
  ScatterplotLayer,
  GeoJsonLayer,
  LineLayer,
  HexagonLayer,
} from 'deck.gl'

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
  height: 500,
}

// Set your mapbox token here
const MAPBOX_TOKEN = // process.env.MapboxAccessToken; // eslint-disable-line
  'pk.eyJ1IjoiYXdhaGFiIiwiYSI6ImNpenExZHF0ZTAxMXYzMm40cWRxZXY1d3IifQ.TdYuekJQSG1eh6dDpywTxQ'

const makeGeoJsonLayer = () => {
  return new GeoJsonLayer({
    id: 'name',
    data: {},
    opacity: 0.8,
    stroked: true,
    filled: true,
    extruded: true,
    getElevation: (f) => Math.random() * 100,
    getFillColor: (f) => colorScale(Math.random()),
    getLineColor: [255, 0, (1 - 1 / 500) * 255],
    lightSettings: lightSettings,
    lineWidthScale: 10,
  })
}


const lightSettings = {
  lightsPosition: [-0.144528, 49.739968, 8000, -3.807751, 54.104682, 8000],
  ambientRatio: 0.4,
  diffuseRatio: 0.6,
  specularRatio: 0.2,
  lightsStrength: [0.8, 0.0, 0.8, 0.0],
  numberOfLights: 2,
}
const COLOR_SCALE = [
  // negative
  [65, 182, 196],
  [127, 205, 187],
  [199, 233, 180],
  [237, 248, 177],

  // positive
  [255, 255, 204],
  [255, 237, 160],
  [254, 217, 118],
  [254, 178, 76],
  [253, 141, 60],
  [252, 78, 42],
  [227, 26, 28],
  [189, 0, 38],
  [128, 0, 38],
]

const colorScale = (x) => {
  const i = Math.round(x * 7) + 4
  if (x < 0) {
    return COLOR_SCALE[i] || COLOR_SCALE[0]
  }
  return COLOR_SCALE[i] || COLOR_SCALE[COLOR_SCALE.length - 1]
}

const colorRange = [
  [1, 152, 189],
  [73, 227, 206],
  [216, 254, 181],
  [254, 237, 177],
  [254, 173, 84],
  [209, 55, 78],
]

const complaints = [
  'Blocked-Driveway',
  'Street-Light-Condition',
  'UNSANITARY-CONDITION',
  'GENERAL-CONSTRUCTION',
  'Water-System',
  'HEAT-HOT-WATER',
  'HEATING',
  'Noise---Residential',
  'Noise---Street-Sidewalk',
  'PLUMBING',
  'Street-Condition',
]

const colorHexagon = (d) => {
  // const rgb = d3.rgb(d3.interpolateMagma((d[1] + 50) / 500))

  // return [rgb.r, rgb.g, rgb.b]
}

// let token =
//       'pk.eyJ1IjoiYXdhaGFiIiwiYSI6ImNpenExZHF0ZTAxMXYzMm40cWRxZXY1d3IifQ.TdYuekJQSG1eh6dDpywTxQ'
//     let url = `https://api.mapbox.com/isochrone/v1/mapbox/walking/-73.99399172186374%2C40.74021296904996?contours_minutes=15%2C30%2C45%2C60&polygons=true&denoise=1&generalize=1000&access_token=${token}`

//     const lon = -73.91922208269459,
//       lat = 40.72185277744134
//     var profile = 'cycling'
//     var minutes = 10
//     var urlBase = 'https://api.mapbox.com/isochrone/v1/mapbox/'

//     var query =
//       urlBase +
//       profile +
//       '/' +
//       lon +
//       ',' +
//       lat +
//       '?contours_minutes=' +
//       minutes +
//       '&polygons=true&access_token=' +
//       token

//     let req = await fetch(query, {
//       method: 'GET',
//     })
//     const res = await req.json()


//   },
const makeComplaintLayer = (url) => {
  return () => {
    console.log('loading ' + `data/${url}.json`)
    return new H3HexagonLayer({
      id: 'h3-hexagon-layer',
      data: `data/${url}.json`,

      elevationScale: 20,
      opacity: 0.8,
      stroked: false,
      filled: true,
      extruded: true,
      wireframe: false,
      fp64: true,
      getHexagon: (d) => d[0],
      getFillColor: colorHexagon,
      elevationScale: 1,
      getElevation: (d) => d[1],
    })
  }
}

const Map = (props) => {
  return (<DeckGL controller initialViewState={INITIAL_VIEW_STATE} layers={props.layers || []}>
    <StaticMap
      mapboxApiAccessToken={MAPBOX_TOKEN}
      mapStyle="mapbox://styles/mapbox/light-v9"
    />
    </DeckGL>)

  //return <div></div>
}

Map.Layers = {
  // Places: makeScatterLayer((d) => { console.log(d) }),
  // 'Commute Distance': makeGeoJsonLayer(),
  // 'Listings': () => {}

}

export default Map
