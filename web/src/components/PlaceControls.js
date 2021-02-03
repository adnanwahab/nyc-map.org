
import React, { useState, useEffect } from 'react'
// import { Select, Box } from 'grommet';
import styled from 'styled-components'
import GL from '@luma.gl/constants'


import {
  ScatterplotLayer
} from 'deck.gl'

const Label = styled.label`
  display: block;
`

const makeScatterLayer = (data, getter) => {
  return new ScatterplotLayer({
    id: 'name',
    getPosition: getter,
    getColor: (d) => {
      return [100, 0.5, 100, 255]
    },
    radiusScale: 10,
    getRadius: 10,
    data: data,
    outline: false,
    parameters: {
      // prevent flicker from z-fighting
      [GL.DEPTH_TEST]: true,

      // turn on additive blending to make them look more glowy
      [GL.BLEND]: true,
      [GL.BLEND_SRC_RGB]: GL.ONE,
      [GL.BLEND_DST_RGB]: GL.ONE,
      [GL.BLEND_EQUATION]: GL.FUNC_ADD,
    },
  })
}

// let layer = {
//   name: 'restaurants',
//   fn: async () => {
//     let query = { chinese: 'shit' }
//     const res = await fetch('http://localhost:8911/mongo', {
//       method: 'POST',
//       body: JSON.stringify(query),
//     })
//     const rest = await res.json()
//     let data = rest.filter((d) => d.cuisine === window.location.hash.slice(1))
//   },
// }

const queryMongo = async (search) => {
  let query = { }
    const res = await fetch('http://localhost:8911/mongo', {
      method: 'POST',
      body: JSON.stringify(query),
    })
    const rest = await res.json()
    let data = rest
    console.log(data)
}

const PlaceControls = (props) => {
  const [value, setValue] = useState('');
  const layer = makeScatterLayer([], (r) => r.address.coord)

  const onChange = (e) => {
    setValue(e.target.value)
  }

   useEffect(() => {
    const call = async () => {
      const l = await queryMongo()
      console.log('querying mongo')
    }
    call()
  }, [value])
  window.x = layer
  props.setLayer(layer)

  return (<div> <input placeholder="search" onChange={onChange}></input>
  </div>)
}

export default PlaceControls;