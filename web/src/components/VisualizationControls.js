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
      <div class="w-full md:w-3/5 mx-auto p-8">
          <div className="shadow-md">
          <div className="tab w-full overflow-hidden border-t">
                <input className="absolute opacity-0" id="tab-single-one" type="radio" name="tabs2" />
                <label className="block p-5 leading-normal cursor-pointer" for="tab-single-one">Label One</label>
                <div className="tab-content overflow-hidden border-l-2 bg-gray-100 border-indigo-500 leading-normal">
                <ComplaintControls setLayer={props.setLayer} />
                  </div>
              </div>
            <div className="tab w-full overflow-hidden border-t">
                <input className="absolute opacity-0" id="tab-single-one" type="radio" name="tabs2" />
                <label className="block p-5 leading-normal cursor-pointer" for="tab-single-one">Label One</label>
                <div className="tab-content overflow-hidden border-l-2 bg-gray-100 border-indigo-500 leading-normal">
                <ComplaintControls setLayer={props.setLayer} />
                  </div>
              </div>
            <div className="tab w-full overflow-hidden border-t">
               <input className="absolute opacity-0" id="tab-single-one" type="radio" name="tabs2" />
               <label className="block p-5 leading-normal cursor-pointer" for="tab-single-one">Label One</label>
               <div className="tab-content overflow-hidden border-l-2 bg-gray-100 border-indigo-500 leading-normal">
               <CommuteDistanceControls setLayer={props.setLayer} />
               </div>
            </div>
            <div className="tab w-full overflow-hidden border-t">
               <input className="absolute opacity-0" id="tab-single-two" type="radio" name="tabs2" />
               <label className="block p-5 leading-normal cursor-pointer" for="tab-single-two">Label Two</label>
               <div className="tab-content overflow-hidden border-l-2 bg-gray-100 border-indigo-500 leading-normal">
                  <p className="p-5">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tenetur, architecto, explicabo perferendis nostrum, maxime impedit atque odit sunt pariatur illo obcaecati soluta molestias iure facere dolorum adipisci eum? Saepe, itaque.</p>
                  <PlaceControls setLayer={props.setLayer} />
               </div>
            </div>
            <div className="tab w-full overflow-hidden border-t">
               <input className="absolute opacity-0" id="tab-single-three" type="radio" name="tabs2" />
               <label className="block p-5 leading-normal cursor-pointer" for="tab-single-three">Label Three</label>
               <div className="tab-content overflow-hidden border-l-2 bg-gray-100 border-indigo-500 leading-normal">
                  <p className="p-5">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tenetur, architecto, explicabo perferendis nostrum, maxime impedit atque odit sunt pariatur illo obcaecati soluta molestias iure facere dolorum adipisci eum? Saepe, itaque.</p>
                  <SuitabilityControls />
               </div>
            </div>
        </div>
        </div>

    </SidePanel>
  )
}

export default VisualizationControls