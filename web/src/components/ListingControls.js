import React, { useState } from 'react'
import styled from 'styled-components'

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
`

const Label = styled.label`
  display: block;
`

const LinkTitle = styled.span`
  cursor: pointer;
  &:hover {
    color: palevioletred;
  }
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
  const [checked, setChecked] = useState(false)
  return (
    <SidePanel>
      <SubHeader>
        <Logo src="/favicon.png" />
        <LinkTitle onClick={openModal}>Crib Finder</LinkTitle>
      </SubHeader>
      <p>Crib Finder is a next-generation appartment finder. </p>
      <div>
      <input type="radio" value="Other" name="gender" /> Airbnb
        <input enabled={true} type="radio" value="Male" name="gender" /> Rentals
        <input disabled type="radio" value="Female" name="gender" /> Buying
        <input disabled type="radio" value="Other" name="gender" /> officespace
      </div>
      <img src="lol.png" width="300" height="100"></img>
      <div>
        <label>
          min<PriceInput type="number"></PriceInput>
        </label>
        <label>
          max<PriceInput type="number"></PriceInput>
        </label>
      </div>
      <button> Get Email Alerts about this Search</button>
    </SidePanel>
  )
}

export default ListingControls
