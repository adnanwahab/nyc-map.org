import Head from 'next/head'
import React, { useState } from 'react'

import VisualizationControls from '../components/VisualizationControls'
import Map from '../components/Map'
import ListingModal from '../components/ListingModal'
import MapContext from '../components/MapContext'

import '@blueprintjs/core/lib/css/blueprint.css'

function Root() {
    const [selectedLayer, selectLayer] = useState()
    const [showLoading, setShowLoading] = useState()
    const [listing, setListing] = useState()

    const stuff = {
        showLoading: setShowLoading,
        setSelectedListing: setListing,
    }

    const loader = <div id="rainbow-progress-bar"></div>

    return (
        <div className="antialiased">
            {showLoading && loader}
            <MapContext.Provider value={stuff}>
                <ListingModal object={listing} />
                <VisualizationControls setLayer={selectLayer} />
                <Map layers={[selectedLayer]} />
            </MapContext.Provider>
        </div>
    )
}
// Add this in your component file

export default function Home() {
    return (
        <div>
            <Head>
                <title>Create Next App</title>
                <link rel="icon" href="/favicon.ico" />
                <link
                    href="https://api.mapbox.com/mapbox-gl-js/v2.0.0/mapbox-gl.css"
                    rel="stylesheet"
                />
                {/* <script
                    async
                    src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCXhtThQ-HhqJ6Wy32OcguREDFEy2Y5sWI&libraries=places&callback=console.log.bind(console)"
                ></script> */}
                <title>
                    Crib Finder - Making appartment hunting suck less.
                </title>
            </Head>
            <Root />
        </div>
    )
}
