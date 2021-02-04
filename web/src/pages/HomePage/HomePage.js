import React, { useState } from 'react'

import VisualizationControls from 'src/components/VisualizationControls'
import ListingControls from 'src/components/ListingControls'
import Map from 'src/components/Map'

import { Grommet } from 'grommet'

function Root () {
  const [selectedLayer, selectLayer] = useState()
  const [listingLayer, selectListings] = useState()

  return (
    <Grommet theme={{ global: { colors: { doc: '#ff99cc' } } }}>
      <ListingControls toggleListings={selectListings} />
      <VisualizationControls setLayer={selectLayer} />
      <Map layers={[listingLayer, selectedLayer]} />
    </Grommet>
  )
}

export default Root
