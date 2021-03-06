import React, { useEffect, useState } from 'react'

import geojson2h3 from 'geojson2h3';
import {H3HexagonLayer} from '@deck.gl/geo-layers';

import {H3ClusterLayer} from '@deck.gl/geo-layers';
import { GeoJsonLayer } from 'deck.gl'
const COLOR_SCALE = [
    // negative
    [65, 182, 196],
    [127, 205, 187],
    [199, 233, 180],
    [237, 248, 177],
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


const h3Layer = (data, weights) => {
    return new GeoJsonLayer({
        id: 'commute',
        data: data,
        opacity: 0.8,
        stroked: true,
        filled: true,
        extruded: false,
        getElevation: (f) => Math.random() * 100,
        getStrokeColor: (f) => colorScale(weights.Crimes),
        getFillColor: (d, i)=> [weights.Crimes * 255, weights.Schools * 255, weights.Cafes * 255],
        lineWidthScale: 10,
    })

}

// const h3Layer = (data) => {
//     return new H3HexagonLayer({
//         id: 'h3-hexagon-layer',
//         data,
//         pickable: true,
//         wireframe: fal   se,
//         filled: true,
//         extruded: true,
//         elevationScale: 2000,
//         // getHexagon: d => d.hex,
//         getHexagons: d => console.log(d) || d,
//         getFillColor: d => [255, (1 - 0 / 500) * 255, 0],
//         getElevation: d => 10
//       });

// }

const polygon = {
    type: 'Feature',
    geometry: {
      type: 'Polygon',
      coordinates: [[
        [-122.47485823276713, 37.85878356045377],
        [-122.47504834087829, 37.86196795698972],
        [-122.47845104316997, 37.86010614563313],
        [-122.47485823276713, 37.85878356045377]
      ]]
    }
  };

let features = ['Crimes', "Schools", "Travel Times", "Cafes"]
let buildWeights = () => {
    return features.reduce((acc, item) => { acc[item] = Math.random(); return acc }, {})
}

const SuitabilityControls = (props) => {
    const [weights, setWeights] = useState(buildWeights())

    useEffect(() => {
        fetch(`/wow`)
        .then((r) => r.json())
        .then((data) =>{
            console.log(data);
            data = data.map(d => geojson2h3.h3SetToMultiPolygonFeature(d) )
            console.log(weights)
            let layer = h3Layer(data, weights)
            if (props.selected) props.setLayer(layer)
        })
    }, Object.values(weights).concat(props.selected))
    return (
        <div className="p-5">
            {features.map((d, i) =>
                <label>
                    <input type="range" onChange={(e) => {
                        weights[d] = (e.target.value / 100)
                        console.log(d, e.target.value)
                        setWeights({...weights})
                    }} />
                    {d}
                </label>
            )}
        </div>
    )
}

export default SuitabilityControls
