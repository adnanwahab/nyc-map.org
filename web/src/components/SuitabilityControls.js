import React, { useEffect, useState } from 'react'

import { H3HexagonLayer } from '@deck.gl/geo-layers'

import bart from '/public/suitability/bartLayer'
import crime from '/public/suitability/crimeLayer'
import schools from '/public/suitability/schoolsLayer'
import travelTime from '/public/suitability/travelTimeLayer'

let layers = [bart, crime, schools, travelTime].map((d) =>
    Object.entries(d).map((d) => d[1])
)

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
    let x = 0
    let weightValues = Object.values(weights)

    function fuck(i) {
        x++
        let sum = 0
        layers.forEach(
            (layer, i) => (sum += weightValues[i] * layer[x % layer.length])
        )
        let result = sum / layers.length

        return result * 5
    }

    return new H3HexagonLayer({
        id: 'h3-hexagon-layer',
        data,
        stroked: true,
        filled: true,
        extruded: false,
        getHexagon: (d) => d.hex9,
        getFillColor: (d, i) => [50, 1, fuck(i) * 255],
        getLineColor: 0,
    })
}

let features = ['Crimes', 'Schools', 'Travel Times', 'Cafes']
let buildWeights = () => {
    return features.reduce((acc, item) => {
        acc[item] = 1
        return acc
    }, {})
}

const SuitabilityControls = ({ selected, setLayer }) => {
    const [weights, setWeights] = useState(buildWeights())

    useEffect(() => {
        fetch(`/hexes.json`)
            .then((r) => r.json())
            .then((data) => {
                if (!selected) return
                let layer = h3Layer(data, weights)
                setLayer(layer)
            })
    }, Object.values(weights).concat(selected))
    return (
        <div className="p-5">
            Use the sliders below to adjust the importance of each category{' '}
            <br />
            {features.map((d, i) => (
                <div key={i}>
                    <input
                        value={weights[d] * 100}
                        type="range"
                        className="clear"
                        onChange={(e) => {
                            weights[d] = e.target.value / 100
                            console.log(d, e.target.value)
                            setWeights({ ...weights })
                        }}
                    />
                    <label className="" key={i}>
                        {d}
                    </label>
                </div>
            ))}
        </div>
    )
}

export default SuitabilityControls
