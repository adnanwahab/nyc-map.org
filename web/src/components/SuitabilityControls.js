
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
        <input type='range' />noise complaints
      </Label>
      <Label>
        <input type='range' />distance to yoga studio
      </Label>
      <Label>
        <input type='range' />density of saunas
      </Label>
      <Label>
        <input type='range' />gentrification score
      </Label>

    </div>
  )
}

export default SuitabilityControls
