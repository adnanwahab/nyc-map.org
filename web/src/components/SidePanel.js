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
const Blurb = styled.section`
  border-radius: 50px;
  font-size: 10px;
  margin-top: 5px;
  padding: 0.25em 1em;
  position: fixed;
  top: 10px;
  z-index: 1100;
  background: rgb(130, 221, 234);
  background-opacity: 0.9;
  color: black;
  overflow-y:auto
`

const ListView = (props) => {
  const [checked, setChecked] = useState(false)
  return (
    <Blurb>
      <h1 className="under-line">Appartment Explorer</h1>
      <p>Choose the best place to live using artificial intelligence</p>
      <h4>Visualization Layers</h4>
      <List onClick={props.onClick}>{buildListItems(props.selectedIndex)}</List>
      <p>{props.exposition}</p>
    </Blurb>
  )
}

export default ListView
