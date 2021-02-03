
import React, { useState } from 'react'
// import { Select, Box } from 'grommet';
import styled from 'styled-components'


const Label = styled.label`
  display: block;
`


const PlaceControls = (props) => {
  const [value, setValue] = useState('');

  return (<div>

<input placeholder="search"></input>
          <p>
            blahlalbdalbdalglsalg asldflas falsdf lasdf lasdlf alsdfl asldf{' '}
          </p>

  </div>)
}

export default PlaceControls;