import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Box, Text } from 'grommet'
// import Accordion from './Accordion'
import CommuteDistanceControls from './CommuteDistanceControls'
import ComplaintControls from './ComplaintControls'
import SuitabilityControls from './SuitabilityControls'
import PlaceControls from './PlaceControls'

const Accordion = (props) => {
    let [selectedIndex, setSelectedIndex] = useState(0)

    // let controls = [<ComplaintControls selected={selectedIndex===0} {...props}/>,
    // <CommuteDistanceControls setLayer={props.setLayer}/>,
    // <PlaceControls setLayer={props.setLayer}/>,
    // <SuitabilityControls setLayer={props.setLayer}/>]

    let controls = [
        ComplaintControls,
        CommuteDistanceControls,
        PlaceControls,
        SuitabilityControls,
    ].map((C, idx) => {
        return (
            <C setLayer={props.setLayer} selected={selectedIndex === idx}></C>
        )
    })
    let list = [
        '311 Complaints',
        'Commute Distance',
        'Places',
        'S uitability',
    ].map((children, idx) => {
        return (
            <div key={idx} className="tab w-full overflow-hidden border-t">
                <input
                    checked={selectedIndex === idx}
                    onClick={(e) => {
                        setSelectedIndex(idx)
                    }}
                    className="absolute opacity-0"
                    id={children}
                    type="radio"
                    name="tabs2"
                />
                <label
                    className="block p-5 leading-normal cursor-pointer"
                    htmlFor={children}
                >
                    {children}
                </label>
                <div className="tab-content overflow-hidden border-l-2 bg-gray-100 border-indigo-500 leading-normal">
                    {controls[idx]}
                </div>
            </div>
        )
    })

    return <div className="shadow-md">{list}</div>
}
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

const VisualizationControls = ({ setLayer }) => {
    return (
        <SidePanel>
            <SubHeader>
                <Text>Visualization Controls</Text>
            </SubHeader>

            <div className="w-full mx-auto">
                <Accordion setLayer={setLayer} />
            </div>
        </SidePanel>
    )
}

export default VisualizationControls

///
{
    /*  */
}
