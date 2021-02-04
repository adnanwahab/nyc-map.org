import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

import { H3HexagonLayer } from '@deck.gl/geo-layers'


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
  'Street-Condition'
]


const Select = styled.select`
  padding: 0px 1.5rem;
  border-color: rgba(0, 0, 0, 0.1);
  border-bottom: 1px solid #333;
  border-color: rgba(0, 0, 0, 0.1);
  padding-left: 1.5rem;
  padding-right: 1.5rem;
  font-weight: 600;
  padding-top: 1rem;
  padding-bottom: 1rem;
`
export const colorRange = [
  [1, 152, 189],
  [73, 227, 206],
  [216, 254, 181],
  [254, 237, 177],
  [254, 173, 84],
  [209, 55, 78]
];

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
      colorRange: colorRange,
      elevationScale: 1,
      getElevation: (d) => d[1]
    })
  }
}

const ComplaintControls = (props) => {
  const [value, setValue] = useState('PLUMBING')

  useEffect(() => {
    const call = async () => {
      const layer = makeComplaintLayer(value)
      props.setLayer(layer)
    }
    call()
  }, [value])

  return (
    <div>
      <Select value={value} onChange={e => console.log(e) || setValue(e.target.textContent)}>
        {complaints.map(d => <option key={d}>{d}</option>)}

      </Select>

    </div>
  )
}

export default ComplaintControls
