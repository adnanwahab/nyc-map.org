import React, { useState, useEffect } from 'react'
import CommuteDistanceControls from './CommuteDistanceControls'
import ComplaintControls from './ComplaintControls'
import SuitabilityControls from './SuitabilityControls'
import PlaceControls from './PlaceControls'

const Accordion = (props) => {
    let [selectedIndex, setSelectedIndex] = useState(0)

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


const VisualizationControls = ({ setLayer }) => {
    let [showing, setShowing] = useState(true)
    return (
        <div class="fixed inset-0 overflow-hidden z-50 text-black text-xs">
  <div class="absolute inset-0 overflow-hidden">

    {/* <div class="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div> */}
    <section class="absolute inset-y-0 right-0 pl-10 max-w-full flex" aria-labelledby="slide-over-heading">

      <div class="relative w-screen max-w-xs">

        {/* <div class="absolute top-0 left-0 -ml-8 pt-4 pr-2 flex sm:-ml-10 sm:pr-4">
          <button onClick={() => setShowing(! showing)} class="rounded-md hover:text-white focus:outline-none focus:ring-2 focus:ring-white">
            <span class="sr-only">Close panel</span>
            <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div> */}
        <div class="h-full flex flex-col py-6 bg-white shadow-xl overflow-y-scroll">
          <div class="px-4 sm:px-6">
            <h2 id="slide-over-heading" class="text-lg font-medium text-gray-900">
              Visualization Controls
            </h2>
          </div>
          <div class="mt-6 relative flex-1 sm:px-6">
            <div class="absolute inset-0">
                    <Accordion setLayer={setLayer} />
              {/* <div class="h-full border-2 border-dashed border-gray-200" aria-hidden="true"></div> */}

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
