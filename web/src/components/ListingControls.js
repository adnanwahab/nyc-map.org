import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { RadioButton, Button, Box, Text } from 'grommet'

import Slider, { SliderTooltip } from 'rc-slider'
import 'rc-slider/assets/index.css'
import GL from '@luma.gl/constants'

import {IconLayer} from '@deck.gl/layers';

import {
  ScatterplotLayer,
  GeoJsonLayer,
  LineLayer,
  HexagonLayer
} from 'deck.gl'
const makeIconLayer = (data) => {


  const iconMapping = '/location-icon-mapping.json',
  iconAtlas = '/location-icon-atlas.png'

  console.log(data)
  const layerProps = {
    data,
    pickable: true,
    getPosition: d => [+ d.longitude, + d.latitude],
    iconAtlas: '/location-icon-atlas.png',
    iconMapping: {
      "x": 384,
      "y": 512,
      "width": 128,
      "height": 128,
      "anchorY": 128
    },
    // getIcon: {
    //   url: '/icon-marker.png',
    //   width: 512,
    //   height: 512,
    //   anchorY: 0
    // },
    onHover: d => { d.picked && console.log(d.object) }
  };

  return new IconLayer({
    ...layerProps,
    id: 'icon',
    getIcon: d => 'marker',
    sizeUnits: 'meters',
    sizeScale: 2000,
    sizeMinPixels: 6
  });
}

const makeScatterLayer = (data, getter) => {
  return new ScatterplotLayer({
    id: 'places',
    getPosition: getter,
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




const queryMongo = async (search) => {
  console.log('QUERYinG MONGO OH MY GOD')

  const query = { }
  const res = await fetch('http://localhost:8911/listings', {
    method: 'POST',
    body: JSON.stringify(query)
  })
  const rest = await res.json()

  console.log('WTF WHY NO RUN')

  return rest
}

const { createSliderWithTooltip } = Slider
const Range = createSliderWithTooltip(Slider.Range)
const { Handle } = Slider

const handle = props => {
  const { value, dragging, index, ...restProps } = props
  return (
    <SliderTooltip
      prefixCls='rc-slider-tooltip'
      overlay={`${value} %`}
      visible={dragging}
      placement='top'
      key={index}
    >
      <Handle value={value} {...restProps} />
    </SliderTooltip>
  )
}

const wrapperStyle = { width: 250 }

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
        <Range min={0} max={3000} step={100} defaultValue={[0, 2000]} tipFormatter={value => `$${value}`} />
      </div>
    </div>
  )
}

const ListingControls = (props) => {
  const [checked, setChecked] = useState(true)
  const [priceRange, setPriceRange] = useState([0, 1000])

  useEffect(() => {
    console.log('effecting my anus')
    const call = async () => {
      console.log('effecting my butt')

      const data = await queryMongo({})
      console.log('querying FUCK ' + data.length)
      //const layer = makeScatterLayer(data, (d) => {console.log(d);return [+ d.longitude, + d.latitude]})
      const layer = makeIconLayer(data)
      console.log('fart')
      props.selectListings(layer)
    }
    call()
  }, [checked])

  const onChange = (e) => {
    setChecked(e.target.checked)
  }
  console.log('rerender')
  return (
    <SidePanel>
      <SubHeader>
        <Logo src='/favicon.png' />
        <Text size='large'>Crib Finder </Text> <br />
        <Text size='xsmall'>Data Driven Appartment Hunting</Text>
      </SubHeader>
      <Box direction='row' align='center' pad='small' gap='small'>
        <Text size='small' color='brand'>Type</Text>
        <form>
        <label><input disabled type='checkbox' /> Rentals</label>
        <label><input onChange={onChange} checked={checked} type='checkbox' /> Airbnb</label>
        <label><input disabled type='checkbox' /> Office</label>
        <label><input disabled type='checkbox' /> Condo</label>
        </form>
      </Box>

      <Box direction='row' align='center' pad='small' gap='small'>
        <Text size='small' color='brand'>Price</Text>

        <RangeSelector
          direction='horizontal'
          invert={false}
          min={0}
          max={1000}
          size='medium'
          round='small'
          values={priceRange}
          onChange={nextValues => console.log(nextValues) || setPriceRange(nextValues)}
        />
      </Box>

      <Box size='small' direction='row' align='center' pad='medium' gap='small'>
        <button className='bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow'>
          Get Email Alerts about this Search
        </button>
      </Box>

    </SidePanel>
  )
}

export default ListingControls
