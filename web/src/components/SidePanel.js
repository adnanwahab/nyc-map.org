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
  position: fixed;
  z-index: 1100;
  background: white;
  background-opacity: 0.9;
  color: black;
  overflow-y: scroll;
  height: 100%;
  box-shadow: 0 0 4px 2px rgba(0, 0, 0, 0.2);
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

const LinkTitle = styled.span`
  cursor: pointer;

  &:hover {
    color: palevioletred;
  }
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
      <div>
        <label>
          min<input></input>
        </label>
        <label>
          max<input></input>
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
      <SubHeader>Suitability</SubHeader>
      <div>
        <input style={{ display: 'block' }} type="range"></input>
        <input style={{ display: 'block' }} type="range"></input>
        <input style={{ display: 'block' }} type="range"></input>
        <input style={{ display: 'block' }} type="range"></input>
      </div>
      <SubHeader>Crimes</SubHeader>
      <SubHeader>Demographics</SubHeader>

      <List onClick={props.onClick}>{buildListItems(props.selectedIndex)}</List>
    </SidePanel>
  )
}

export default ListView
