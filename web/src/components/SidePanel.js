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

const Blurb = styled.section`
  border-radius: 3px;
  margin: 0 1em;
  padding: 0.25em 1em;
  position: fixed;
  z-index: 1000;
  background: rgb(41, 50, 60);
  background-opacity: 0.9;
  color: #323232;
  box-shadow: 0 0 4px 2px rgba(0, 0, 0, 0.2);
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  height: 100%;
  max-width: 408px;
  background: white;
  font-size: 0.875rem;
  font-family: Sailec, helvetica, sans-serif;
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
