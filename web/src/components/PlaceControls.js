
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
const makeScatterLayer = (data, getter) => {
  return new ScatterplotLayer({
    id: 'places',
    getPosition: getter,
    pickable:true,

    getFillColor: (d) => {
      return [100, 0.5, 100, 255]
    },
    radiusScale: 10,
    getRadius: 10,
    data: data,
    stroke: false,
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
        console.log(data)
        window.data = data
        const layer = makeScatterLayer(data, (d) => [d.coordinates.longitude, d.coordinates.latitude])
        props.setLayer(layer)
      }
      call()
    }, [value])

    return (
      <div> <input
      type="search"
      className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
      placeholder='search' onChange={onChange} />
      </div>
    )
}

export default PlaceControls
