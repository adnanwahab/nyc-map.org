import React from 'react'
import Collapse, { Panel } from 'rc-collapse'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import 'rc-collapse/assets/index.css'

import {
  CSSMotionProps,
  MotionEventHandler,
  MotionEndEventHandler,
} from 'rc-motion'

var getCollapsedHeight = function () {
  return { height: 0, opacity: 0 }
}
var getRealHeight = function (node) {
  return { height: node.scrollHeight, opacity: 1 }
}
var getCurrentHeight = function (node) {
  return { height: node.offsetHeight }
}
var skipOpacityTransition = function (_, event) {
  return event.propertyName === 'height'
}
var collapseMotion = {
  motionName: 'rc-collapse-motion',
  onEnterStart: getCollapsedHeight,
  onEnterActive: getRealHeight,
  onLeaveStart: getCurrentHeight,
  onLeaveActive: getCollapsedHeight,
  onEnterEnd: skipOpacityTransition,
  onLeaveEnd: skipOpacityTransition,
  motionDeadline: 500,
  leavedClassName: 'rc-collapse-content-hidden',
}
const StyledCollapse = styled(Collapse)`
  &.rc-collapse {
    width: 100%;
    border-radius: 0px;
    border-color: transparent;
    ${'' /* background-color: ${props => props.theme.colors.white}; */}
    border: 0px;
    > .rc-collapse-item {
      border: 0px;
      > .rc-collapse-header {
        flex-direction: row-reverse;
        height: auto;
        line-height: normal;
        text-indent: 0px;
        text-transform: none;
        display: flex;
        align-items: center;
      }
    }
    .rc-collapse-content {
      border-bottom-width: 0px;
      ${'' /* border-color: ${props => props.theme.colors.lighterGrey}; */}
      border-left-width: 3px;
      border-right-width: 0px;
      border-style: solid;
      border-top-width: 0px;
    }
    .rc-collapse-content-box {
      margin-top: 0px;
      margin-bottom: 12px;
    }
  }
`

const Accordion = (props) => (
  <StyledCollapse accordion={true} openMotion={collapseMotion} {...props}>
    {props.children}
  </StyledCollapse>
)

Accordion.propTypes = {
  children: PropTypes.node.isRequired,
}

Accordion.Panel = Panel

export default Accordion
