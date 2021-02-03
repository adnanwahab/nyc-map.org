
import React, { useState } from 'react'
// import { Select, Box } from 'grommet';
import styled from 'styled-components'


const Label = styled.label`
  display: block;
`
let layer = {
  name: 'restaurants',
  fn: async () => {
    let query = { chinese: 'shit' }
    const res = await fetch('http://localhost:8911/mongo', {
      method: 'POST',
      body: JSON.stringify(query),
    })
    const rest = await res.json()
    window.rest = rest
    let data = rest.filter((d) => d.cuisine === window.location.hash.slice(1))
    return () => makeScatterLayer(data, (r) => r.address.coord)
  },
}

const PlaceControls = (props) => {
  const [value, setValue] = useState('');

  return (<div> <input placeholder="search"></input>
  </div>)
}

export default PlaceControls;