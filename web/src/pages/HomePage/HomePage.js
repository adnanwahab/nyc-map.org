import React, { useState } from 'react'

import VisualizationControls from 'src/components/VisualizationControls'
import ListingControls from 'src/components/ListingControls'
import Map from 'src/components/Map'

import { Grommet } from 'grommet'

function Root () {
  const [selectedLayer, selectLayer] = useState()
  const [listingLayer, selectListings] = useState()
  const [showLoading, setShowLoading] = useState()


  const layers = [
    selectedLayer,
    listingLayer,
  ]
    const loader = (<div className="relative pt-1">
    <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-pink-200">
      <div style={{"width":"30%"}} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-pink-500"></div>
    </div>
    </div>)
  return (
    <Grommet theme={{ global: { colors: { doc: '#ff99cc' } } }}>
          <ListingControls selectListings={selectListings} />
          <VisualizationControls setLayer={selectLayer} />
      <Map layers={layers} />
    </Grommet>
  )
}

export default Root
