
import React, { useState } from 'react'
// import { Select, Box } from 'grommet';
import styled from 'styled-components'

const Label = styled.label`
  display: block;
`

const SuitabilityControls = (props) => {
  const [value, setValue] = useState('')

  return (
    <div className="p-5">

      <Label>
        <input type='range' />Crimes
      </Label>
      <Label>
        <input type='range' />Schools
      </Label>
      <Label>
        <input type='range' />Travel time to ...
      </Label>
      <Label>
        <input type='range' />Cafes
      </Label>

    </div>
  )
}

export default SuitabilityControls
