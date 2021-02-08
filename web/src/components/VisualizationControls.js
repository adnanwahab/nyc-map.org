import React, { useState } from 'react'
import styled from 'styled-components'
import CommuteDistanceControls from './CommuteDistanceControls'
import ComplaintControls from './ComplaintControls'
import SuitabilityControls from './SuitabilityControls'
import PlaceControls from './PlaceControls'

import {
  Accordion,
  AccordionPanel,
  Box,
  Text,
  TextInput
} from 'grommet'
// import Accordion from './Accordion'

const renderPanelHeader = (title, active) => (
  <Box direction='row' align='center' pad='medium' gap='small'>
    <strong>
      <Text>{title}</Text>
    </strong>
    <Text color='brand'>{active ? '-' : '+'}</Text>
  </Box>
)
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
        target='_blank'
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
  font-size: 10px;
  position: fixed;
  right: 0px;
  z-index: 1100;
  background: white;
  height: 100%;
  width: 300px;
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

const VisualizationControls = (props) => {
  const [activeIndex, setActiveIndex] = useState([0])

  // props.setLayer(Object.keys(props.layers)[activeIndex])

  return (
    <SidePanel>
      <SubHeader>
        <Text>Visualization Controls</Text>
      </SubHeader>

      <Accordion
        activeIndex={activeIndex}
        onActive={newActiveIndex => setActiveIndex(newActiveIndex)}
      >
      <AccordionPanel
                header={renderPanelHeader('311 Complaints', activeIndex.includes(0))}
              >
                <Box pad='medium' background='light-2' style={{ height: '150px' }}>
                  <ComplaintControls setLayer={props.setLayer} />
                </Box>
        </AccordionPanel>
        <AccordionPanel
          header={renderPanelHeader('Commute Distance', activeIndex.includes(1))}
        >
          <Box pad='medium' background='light-2' style={{ height: '250px' }}>
            <CommuteDistanceControls setLayer={props.setLayer} />
          </Box>
        </AccordionPanel>

        <AccordionPanel
          header={renderPanelHeader('Places', activeIndex.includes(2))}
        >
          <Box pad='medium' background='light-2' style={{ height: '100px' }}>
            <PlaceControls setLayer={props.setLayer} />

          </Box>
        </AccordionPanel>
        {/* <AccordionPanel
          header={renderPanelHeader('Crime', activeIndex.includes(3))}
        /> */}

        <AccordionPanel
          header={renderPanelHeader('Suitability Index', activeIndex.includes(3))}
        >
          <Box pad='medium' background='light-2' style={{ height: '300px' }}>
            <SuitabilityControls />
          </Box>
        </AccordionPanel>

      </Accordion>

    </SidePanel>
  )
}

export default VisualizationControls