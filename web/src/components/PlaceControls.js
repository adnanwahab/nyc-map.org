
import React, { useState, useEffect } from 'react'
// import { Select, Box } from 'grommet';
import styled from 'styled-components'

import GL from '@luma.gl/constants'
import _ from 'lodash'
import {
  ScatterplotLayer,
  GeoJsonLayer,
  LineLayer,
  HexagonLayer
} from 'deck.gl'

const Label = styled.label`
  display: block;
`

const queryMongo = async (search) => {
  const res = await fetch('http://localhost:8911/mongo', {
    method: 'POST',
    body: JSON.stringify({search})
    //body: JSON.stringify({$text: {$search: search}})
  })
  const rest = await res.json()
  return rest
}
const makeScatterLayer = (data, hoveredId, onHover) => {
  return new ScatterplotLayer({
    id: 'places',
    getPosition: (d) => [d.coordinates.longitude, d.coordinates.latitude],

    getFillColor: (d) => {
      return [100, 0, 100, 255]
    },
    getLineColor: d => [0, 0, 0],
    radiusScale: 15,
    radiusMinPixels: 2,
    radiusMaxPixels: 100,
    data: data,
    lineWidthMinPixels: 1,
    stroked: true,
    opacity: 0.9,

    parameters: {
      // prevent flicker from z-fighting
      [GL.DEPTH_TEST]: true,

      // turn on additive blending to make them look more glowy
      [GL.BLEND]: true,
      [GL.BLEND_SRC_RGB]: GL.ONE,
      [GL.BLEND_DST_RGB]: GL.ONE,
      [GL.BLEND_EQUATION]: GL.FUNC_ADD
    }
  })
}

const PlaceControls = (props) => {
    const [value, setValue] = useState('')
    const setValueBounce = _.debounce(setValue, 300)

    const onChange = (e) => {
      setValueBounce(e.target.value)
    }

    useEffect(() => {
      const call = async () => {
        const data = await queryMongo(value)
        const layer = makeScatterLayer(data)
        if (props.selected) props.setLayer(layer)
        console.log('adnan', props.selected)
      }
      call()
    }, [value, props.selected])

    return (
      <div className="p-5"> <input
      type="search"
      className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
      placeholder='search' onChange={onChange} />
      </div>
    )
}

export default PlaceControls
