import React, { useState } from 'react'
import styled from 'styled-components'
import { RadioButton, RangeSelector, Button, Box, Text } from 'grommet';




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
      <Text size="small" color="brand">Type:</Text>

          <RadioButton checked={checked} label="Rentals"
              onChange={(event) => setChecked(event.target.checked)}
            />
           <RadioButton disabled label="Airbnb"
          onChange={(event) => setChecked(event.target.checked)}
        />
           <RadioButton disabled label="Office"
          onChange={(event) => setChecked(event.target.checked)}
        />

        </Box>


      <Box direction="row" align="center" pad="small" gap="small">
        <Text size="small" color="brand">Rent Range</Text>

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
            <Box align="center">
        <Text size="small">{`$${priceRange[0]} - $${priceRange[1]}`}</Text>
        </Box>
      </Box>

      <Box size="small" direction="row" align="center" pad="medium" gap="small">
      <Button size="small"  label='Get Email Alerts about this Search' onClick={() => {}} />
      </Box>

    </SidePanel>
  )
}

export default ListingControls
