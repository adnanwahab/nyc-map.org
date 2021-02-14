import React, { useState } from 'react'
import styled from 'styled-components'
import {
  Box,
  Text,
} from 'grommet'
import Accordion from './Accordion'

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

const VisualizationControls = (props) => {
  console.log('wtf')
  return (
    <SidePanel>

      <SubHeader>
        <Text>Visualization Controls</Text>
      </SubHeader>
      <div className="w-full mx-auto">

      </div>
    </SidePanel>
  )
}

export default VisualizationControls