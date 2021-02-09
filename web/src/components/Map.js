import { StaticMap } from 'react-map-gl'
import {_MapContext as MapContext, NavigationControl,  ScaleControl} from 'react-map-gl';

import DeckGL, {
  ScatterplotLayer,
  GeoJsonLayer,
  LineLayer,
  HexagonLayer
} from 'deck.gl'


// const INITIAL_VIEW_STATE = {
//   longitude: -73.91922208269459,
//   latitude: 40.72185277744134,
//   zoom: 11.502812637593744,
//   pitch: 0,
//   bearing: 0,
//   width: 960,
//   height: 500
// }


const INITIAL_VIEW_STATE = {
  altitude: 1.5,
  bearing: 26.13583138173302,
  height: 766,
  latitude: 40.70668036901265,
  longitude: -73.94436173838425,
  maxPitch: 60,
  maxZoom: 20,
  minPitch: 0,
  minZoom: 0,
  pitch: 41.81818181818182,
  width: 854,
  zoom: 11.502812637593744
}

const navControlStyle= {
  left: 10,
  top: 10
};


const scaleControlStyle= {
  left: 20,
  top: 100
};

// name: 1,

// picture_url: 1,
// review_scores_rating: "94",
// price: 1,
// description: 1,
// Set your mapbox token here
const MAPBOX_TOKEN = // process.env.MapboxAccessToken; // eslint-disable-line
  'pk.eyJ1IjoiYXdhaGFiIiwiYSI6ImNpenExZHF0ZTAxMXYzMm40cWRxZXY1d3IifQ.TdYuekJQSG1eh6dDpywTxQ'

const Map = (props) => {
  window.map = MapContext.Provider
  return (
    <DeckGL
onViewStateChange={o=>
{console.log(o.viewState)
  return o.viewState
}
}
ContextProvider={MapContext.Provider}
      getTooltip={({object}) => {
        if (!object) return null;

        //if (! object.name) return `${object[1]} complaints`

        if (object.picture_url) return {html:`
          <div>${object.name}</div>
          <div>Price ${object.price}</div>
          <div>${object.description}</div>
          <div>Review Score: ${object.review_scores_rating}</div>
          <img src=${object.picture_url+ '?im_w=1200'}/>
        `}

        let html = `<div>${object.name}</div>`
        if (object.image_url) html+= `<img width="250px" height="250px" src=${object.image_url}>`
        return {html}
      }}
      controller initialViewState={INITIAL_VIEW_STATE} layers={props.layers || []}>
            <NavigationControl  style={navControlStyle} />
            {/* <ScaleControl maxWidth={100} unit="metric" style={scaleControlStyle} /> */}

      <StaticMap
        mapboxApiAccessToken={MAPBOX_TOKEN}
        mapStyle='mapbox://styles/mapbox/light-v9'
      />

    </DeckGL>
  )
}

export default Map
