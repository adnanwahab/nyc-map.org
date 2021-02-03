import React, { useState } from 'react'
import styled from 'styled-components'
import { RangeSelector, Button } from 'grommet';


const renderPanelHeader = (title, active) => (
  <Box direction="row" align="center" pad="medium" gap="small">
    <strong>
      <Text>{title}</Text>
    </strong>
    <Text color="brand">{active ? '-' : '+'}</Text>
  </Box>
);

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
  height: 200px;
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

//https://github.com/react-component/slider
const ListingControls = (props) => {
  const [checked, setChecked] = useState('Rentals')
  const [priceRange, setPriceRange] = useState([0, 1000])
  return (
    <SidePanel>
      <SubHeader>
        <Logo src="/favicon.png" />
        <LinkTitle>Crib Finder</LinkTitle>
        <p>Making Appartment Hunting Suck Less. </p>
      </SubHeader>
      <div>
      <input type="radio" value="Airbnb" name="Airbnb" /> Airbnb
        <input checked type="radio" value="Rentals" name="Rentals" /> Rentals
        <input disabled type="radio" value="Buying" name="Buying" /> Buying
        <input disabled type="radio" value="officespace" name="officespace" /> officespace
      </div>
      {/* <img src="lol.png" width="300" height="100"></img> */}
      <div>
      <span>Rent Range: </span>

      <RangeSelector
            direction='horizontal'
            invert={false}
            min={0}
            max={1000}
            size='full'
            round='small'
            values={priceRange}
            onChange={nextValues => console.log(nextValues) || setPriceRange(nextValues )}
          />
      </div>
      <Button label='Get Email Alerts about this Search' onClick={() => {}} />
    </SidePanel>
  )
}

export default ListingControls
