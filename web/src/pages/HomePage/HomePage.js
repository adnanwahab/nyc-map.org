import React, { useState } from 'react'

import VisualizationControls from 'src/components/VisualizationControls'
import Map from 'src/components/Map'

//import 'normalize.css'
import '@blueprintjs/core/lib/css/blueprint.css'
//import '@blueprintjs/icons/lib/css/blueprint-icons.css'
// import "@blueprintjs/select/lib/css/blueprint-select.css";

function Root() {
    const [selectedLayer, selectLayer] = useState()
    const [listingLayer, selectListings] = useState()
    const [showLoading, setShowLoading] = useState()

    const layers = [listingLayer, selectedLayer]
    const loader = <div id="rainbow-progress-bar"></div>

    return (
        <div className="antialiased">
            {showLoading && loader}
            <VisualizationControls setLayer={selectLayer} />
            <Map layers={layers} />
        </div>
    )
}

export default Root
