import React, { useState, useEffect } from 'react'

import { H3HexagonLayer } from '@deck.gl/geo-layers'
import { H3ClusterLayer } from '@deck.gl/geo-layers'

const complaints = [
    'Blocked-Driveway',
    'Street-Light-Condition',
    'UNSANITARY-CONDITION',
    'GENERAL-CONSTRUCTION',
    'Water-System',
    'HEAT-HOT-WATER',
    'HEATING',
    'Illegal-Parking',
    'Noise---Residential',
    'Noise---Street-Sidewalk',
    'PLUMBING',
    'Street-Condition',
]

// const Select = styled.select`
//     padding: 0px 1.5rem;
//     border-color: rgba(0, 0, 0, 0.1);
//     border-bottom: 1px solid #333;
//     border-color: rgba(0, 0, 0, 0.1);
//     padding-left: 1.5rem;
//     padding-right: 1.5rem;
//     font-weight: 600;
//     padding-top: 1rem;
//     padding-bottom: 1rem;
// `
export const colorRange = [
    [1, 152, 189],
    [73, 227, 206],
    [216, 254, 181],
    [254, 237, 177],
    [254, 173, 84],
    [209, 55, 78],
]

const colorRamp = (n) => {
    let len = n.toString().length

    return colorRange[len + 1]
}

const makeComplaintLayer = (url) => {
    return () => {
        console.log('loading ' + `data/${url}.json`)
        return new H3HexagonLayer({
            id: 'h3-hexagon-layer',
            data: `data/${url}.json`,
            coverage: 1,
            elevationScale: 2,
            opacity: 0.8,
            pickable: false,
            //onHover: (d) => { console.log(d)},
            stroked: false,
            filled: true,
            extruded: true,
            wireframe: true,
            // fp64: true,
            getHexagon: (d) => d[0],
            getFillColor: (d) => colorRamp(d[1]),
            elevationScale: 1,
            getElevation: (d) => d[1],
        })
    }
}

const ComplaintControls = (props) => {
    const [value, setValue] = useState('HEATING')

    useEffect(() => {
        const call = async () => {
            console.log('adnan', value)
            const layer = makeComplaintLayer(value)
            props.setLayer(layer)

            //   analytics.track('control_open', {
            //     tab: 'complaint',

            // });
        }
        call()
    }, [value, props.selected])

    return (
        <div className="p-5">
            <select
                value={value}
                onChange={(e) => console.log(e) || setValue(e.target.value)}
            >
                {complaints.map((d) => (
                    <option key={d}>{d}</option>
                ))}
            </select>
            <div className="info-panel__InfoPanelContent-cbpqj4-0 fjyHRS">
                <div>
                    <p>
                        The layer aggregates data within the boundary of each
                        hexagon cell
                    </p>
                    <div className="layout">
                        <div
                            className="legend"
                            style={{
                                background: 'rgb(1, 152, 189)',
                                width: '16.6667%',
                            }}
                        ></div>
                        <div
                            className="legend"
                            style={{
                                background: 'rgb(73, 227, 206)',
                                width: '16.6667%',
                            }}
                        ></div>
                        <div
                            className="legend"
                            style={{
                                background: 'rgb(216, 254, 181)',
                                width: ' 16.6667%',
                            }}
                        ></div>
                        <div
                            className="legend"
                            style={{
                                background: 'rgb(254, 237, 177)',
                                width: '16.6667%',
                            }}
                        ></div>
                        <div
                            className="legend"
                            style={{
                                background: 'rgb(254, 173, 84)',
                                width: '16.6667%',
                            }}
                        ></div>
                        <div
                            className="legend"
                            style={{
                                background: 'rgb(209, 55, 78)',
                                width: '16.6667%',
                            }}
                        ></div>
                    </div>
                    <p className="layout">
                        <span className="col-1-2">Fewer Complaints</span>
                        <span className="col-1-2 text-right">
                            More Complaints
                        </span>
                    </p>
                    <p>
                        Data source:{' '}
                        <a href="https://data.cityofnewyork.us/Social-Services/311-Service-Requests-from-2010-to-Present/erm2-nwe9">
                            New York City 311{' '}
                        </a>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default ComplaintControls
