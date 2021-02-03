import React, { useState } from 'react'
// import { Select, Box } from 'grommet';
import styled from 'styled-components'

const objectOptions = [
  'Noise',
  'rats',
  'street conditions'
];


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

const ComplaintControls = (props) => {
  const [value, setValue] = useState('');

  return (<div>
  {/* <Select
          id="select"
          name="select"
          placeholder="Select"
          labelKey="label"
          valueKey={{ key: 'value', reduce: true }}
          value={value}
          options={objectOptions}
          onClick={()  => console.log('hi')}
          onChange={({ value: nextValue }) => setValue(nextValue)}
        /> */}

        <Select value={value} onChange={e => console.log(e) || setValue(e.textContent)}>
        {objectOptions.map(d => <option>{d}</option>)}

        </Select>

  </div>)
}

export default ComplaintControls;