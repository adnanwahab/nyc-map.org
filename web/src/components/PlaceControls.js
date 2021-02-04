
import React, { useState, useEffect } from 'react'
// import { Select, Box } from 'grommet';
import styled from 'styled-components'
const Label = styled.label`
  display: block;
`



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
    return rest
}

const PlaceControls = (props) => {
  const [value, setValue] = useState('');

  const onChange = (e) => {
    setValue(e.target.value)
  }
  window.x = props.layer
   useEffect(() => {
    const call = async () => {
      const data = await queryMongo()
      console.log('querying mongo' + data.length)
      //props.layer.props.data = data;
    }
    call()
  }, [value])

  return (<div> <input placeholder="search" onChange={onChange}></input>
  </div>)
}

export default PlaceControls;