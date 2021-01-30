import React, { useState } from 'react'
import styled from 'styled-components'
import { layers } from './layers'

const makeNameGood = (str) => {
  return str.replace('_', ' ')
}

const Link = styled.a`
  text-decoration: none;
  color: #323232;
`

const buildListItems = (selectedIndex) => {
  return layers.map((obj, i) => (
    <li key={obj.name} className={selectedIndex == obj.name ? 'selected' : ''}>
      <Link
        onClick={(e) => {
          e.preventDefault()
        }}
        href={'#' + obj.name}
        target="_blank"
        id={i}
      >
        {makeNameGood(obj.name)}
      </Link>
    </li>
  ))
}

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
  border-radius: 50px;
  font-size: 10px;
  margin-top: 5px;
  padding: 0.25em 1em;
  position: fixed;
  z-index: 1100;
  background: white;
  height: 100%;
  box-shadow: 0 0 4px 2px rgba(0, 0, 0, 0.2);
  font-weight: 500;
  color: black;
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
const ListView = (props) => {
  const [checked, setChecked] = useState(false)
  return (
    <SidePanel>
      <SubHeader>
        <Logo src="/favicon.png" />
        <LinkTitle onClick={openModal}>Crib Finder</LinkTitle>
      </SubHeader>
      <SubHeader>Appartment Listings</SubHeader>
      <div>
        <input type="radio" value="Male" name="gender" /> Rentals
        <input type="radio" value="Female" name="gender" /> Buying
        <input type="radio" value="Other" name="gender" /> Airbnb
        <input type="radio" value="Other" name="gender" /> officespace
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
      <SubHeader>Complaints</SubHeader>
      <select>
        <option>noise</option>
        <option>rats</option>
        <option>heating</option>
        <option>street condition</option>
      </select>
      <SubHeader>Places</SubHeader>
      <input placeholder="search"></input>
      <SubHeader>
        <a href="https://observablehq.com/@nrabinowitz/h3-tutorial-suitability-analysis">
          Suitability
        </a>
      </SubHeader>
      <div>
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
        <Label>
          <input type="range"></input>overall neightborhood sentiment
        </Label>
      </div>
      <SubHeader>Commute Distance</SubHeader>
      <SubHeader>neightborhood gossip</SubHeader>

      <SubHeader>Demographics</SubHeader>
      <span> racial demographic dot map</span>
    </SidePanel>
  )
}

export default ListView
