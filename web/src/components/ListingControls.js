import React, { useState } from 'react'
import styled from 'styled-components'
import { RadioButton, Button, Box, Text } from 'grommet';

import Slider, {SliderTooltip} from 'rc-slider';
import 'rc-slider/assets/index.css';

const { createSliderWithTooltip } = Slider;
const Range = createSliderWithTooltip(Slider.Range);
const { Handle } = Slider;

const handle = props => {
  const { value, dragging, index, ...restProps } = props;
  return (
    <SliderTooltip
      prefixCls="rc-slider-tooltip"
      overlay={`${value} %`}
      visible={dragging}
      placement="top"
      key={index}
    >
      <Handle value={value} {...restProps} />
    </SliderTooltip>
  );
};

const wrapperStyle = { width: 250 };




const makeNameGood = (str) => {
  return str.replace('_', ' ')
}

const Link = styled.a`
  text-decoration: none;
  color: #323232;
`

const List = styled.section`
  background: transparent;
  border-radius: 3px;
  margin: 0 1em;
  padding: 0.25em 1em;
`
// The above changes the color for the legend.
const SidePanel = styled.section`
  line-height: 21px;
  font-size: 16px;
  padding: 0px;
  font-size: 10px;
  position: fixed;
  left: 25px;
  bottom: 36px;
  z-index: 1100;
  background: white;
  height: 300px;
  box-shadow: 0 0 4px 2px rgba(0, 0, 0, 0.2);
  font-weight: 500;
  color: black;

  height: 300px;
  width: 350px;
  overflow: scroll;
`
const SubHeader = styled.section`
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

const Logo = styled.img`
  padding-right: 10px;
  display: inline;
`

const Label = styled.label`
  display: block;
`

const LinkTitle = styled.h1`
  display: inline;

font-size: 16px;
`

const PriceInput = styled.input`
  width: 50px;
`
const openModal = () => {
  alert(
    'Find the best appartment to live in using the best data sets!!! fuck brokers they are lying scum trash!!!! '
  )
}


const RangeSelector = () => {
  return (
    <div>
    <div style={wrapperStyle}>
      <Range min={0} max={3000} defaultValue={[0, 2000]} tipFormatter={value => `$${value}`} />
    </div>
  </div>)
}

const ListingControls = (props) => {
  const [checked, setChecked] = useState('Rentals')
  const [priceRange, setPriceRange] = useState([0, 1000])
  return (
    <SidePanel>
      <SubHeader>
        <Logo src="/favicon.png" />
        <Text size="large">Crib Finder </Text> <br></br>
        <Text size="xsmall">Data Driven Appartment Hunting</Text>
      </SubHeader>
      <Box direction="row" align="center" pad="small" gap="small">
      <Text size="small" color="brand">Type</Text>
        <label><input checked type="radio" ></input> Rentals</label>
        <label><input disabled type="radio" ></input> Airbnb</label>
        <label><input disabled type="radio" ></input> Office</label>
        <label><input disabled type="radio" ></input> Condo</label>
        </Box>


      <Box direction="row" align="center" pad="small" gap="small">
        <Text size="small" color="brand">Price</Text>

        <RangeSelector
            direction='horizontal'
            invert={false}
            min={0}
            max={1000}
            size='medium'
            round='small'
            values={priceRange}
            onChange={nextValues => console.log(nextValues) || setPriceRange(nextValues )}
          />
      </Box>

      <Box size="small" direction="row" align="center" pad="medium" gap="small">
      <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
      Get Email Alerts about this Search</button>
      </Box>

    </SidePanel>
  )
}

export default ListingControls
