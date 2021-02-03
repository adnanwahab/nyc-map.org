
import React, { useState } from 'react'
// import { Select, Box } from 'grommet';
import styled from 'styled-components'


const Label = styled.label`
  display: block;
`


const SuitabilityControls = (props) => {
  const [value, setValue] = useState('');

  return (<div>

<Label>
<input type="range"></input>noise complaints
</Label>
<Label>
<input type="range"></input>distance to yoga studio
</Label>
<Label>
<input type="range"></input>density of saunas
</Label>
<Label>
<input type="range"></input>gentrification score
</Label>

  </div>)
}

export default SuitabilityControls;