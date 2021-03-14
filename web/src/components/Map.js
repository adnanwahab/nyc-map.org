import { StaticMap } from 'react-map-gl'
import {
    _MapContext as MapContext,
} from 'react-map-gl'

import DeckGL from 'deck.gl'

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
    zoom: 11.502812637593744,
}


const adnan = ({object}) => {
    let html
    if (! object) return null

    if (object.cluster)
    html = `<div class="mini-bubble-details">
    ${object.point_count} appartments
           </div>`

    else if (object.picture_url) //<img width="100px" height="100px" src=${object.picture_url + '?im_w=1200'}/>
        html = `
        <div class="mini-bubble-details">
                    <strong>${object.price}</strong>
                    <div>${object.name}</div>
                    <div>3 bd, 2 ba</div>
                    <div>1,604 sqft</div>
                    <div>Review Score: ${object.review_scores_rating}</div>
                    <div class="text-red-600">Price is 300 over expected value!</div>
                    <div class="text-green-600">Price is 300 under expected value!</div>

               </div>`
    else
        html = `
        <img width="100px" height="100px" src=${object.image_url + '?im_w=1200'}/>
        <div class="mini-bubble-details">
                    <div>${object.name}</div>

               </div>`
    return {
        style: {
            color: '#333',
            'background-color': 'white'
        },
        html
    }
}

const MAPBOX_TOKEN = process.env.HELLO_ENV; // eslint-disable-line
console.log(MAPBOX_TOKEN)


const Map = (props) => {
    return (
        <DeckGL
            className="text-red-900"
            useDevicePixels={false}
            ContextProvider={MapContext.Provider}
            getTooltip={adnan}

            controller


            initialViewState={INITIAL_VIEW_STATE}
            layers={props.layers || []}
        >
            <StaticMap
                mapboxApiAccessToken={MAPBOX_TOKEN}
                mapStyle="mapbox://styles/mapbox/light-v9"
            />
        </DeckGL>
    )
}

export default Map
