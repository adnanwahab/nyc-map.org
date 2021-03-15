import React, { useState, useEffect } from 'react'
import CommuteDistanceControls from './CommuteDistanceControls'
import ComplaintControls from './ComplaintControls'
import SuitabilityControls from './SuitabilityControls'
import PlaceControls from './PlaceControls'

const Accordion = (props) => {
    let [selectedIndex, setSelectedIndex] = useState(3)

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
        'Suitability',
    ].map((children, idx) => {
        return (
            <div
                key={idx}
                className="tab w-full overflow-hidden border-t text-black"
            >
                <input
                    defaultChecked={selectedIndex === idx}
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

const VisualizationControls = ({ setLayer }) => {
    let [showing, setShowing] = useState(true)

    return (
        <div className="hidden md:block fixed inset-0 overflow-hidden z-50 pointer-events-none">
            <div className="absolute inset-0 overflow-hidden">
                {/* <div className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div> */}
                <section
                    className={
                        'absolute inset-y-0 right-0 pl-10 max-w-full flex transform-gpu transition-transform ' +
                        (showing ? ' translate-x-20' : 'translate-x-0')
                    }
                    style={
                        showing
                            ? { transform: 'translatex(0rem)' }
                            : { transform: 'translatex(20rem)' }
                    }
                    aria-labelledby="slide-over-heading"
                >
                    <div className="relative w-screen max-w-xs">
                        <div className="absolute top-0 left-0 -ml-8 pt-4 pr-2 flex sm:-ml-10 sm:pr-4">
                            <button
                                onClick={() => setShowing(!showing)}
                                className="pointer-events-auto rounded-md hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                            >
                                <span className="sr-only">Close panel</span>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 64 64"
                                    stroke="currentColor"
                                    aria-hidden="true"
                                    width="24px"
                                    height="24px"
                                    className={`opacity-70 rotate-${
                                        showing ? 0 : 180
                                    }`}
                                >
                                    <path d="M26.7,54.7l-4.5-4.4c-0.4-0.4-0.4-1,0-1.4L38.6,33L22.2,17c-0.4-0.4-0.4-1,0-1.5l4.5-4.4c0.4-0.4,1.1-0.4,1.5,0 l17.1,16.7l4.5,4.4c0.4,0.4,0.4,1,0,1.4L45.2,38L28.2,54.7C27.8,55.1,27.1,55.1,26.7,54.7"></path>
                                </svg>
                            </button>
                        </div>
                        <div className="h-full flex flex-col py-6 bg-white shadow-xl overflow-y-scroll">
                            <div className="px-4 sm:px-6">
                                <h2
                                    id="slide-over-heading"
                                    className="text-lg font-medium text-gray-900"
                                >
                                    Visualization Controls
                                </h2>
                            </div>
                            <div className="mt-6 relative flex-1 sm:px-6">
                                <div className="absolute inset-0 pointer-events-auto">
                                    <Accordion setLayer={setLayer} />
                                    {/* <div className="h-full border-2 border-dashed border-gray-200" aria-hidden="true"></div> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}

export default VisualizationControls

///
{
    /*  */
}
