import React, {useState} from 'react'

import VisualizationControls from 'src/components/VisualizationControls'
import ListingControls from 'src/components/ListingControls'
import Map from 'src/components/Map'

import { Grommet } from 'grommet';


function Root() {
  const [selectedLayer, selectLayer] = useState('Places')

  return (
    <Grommet theme={{ global: { colors: { doc: '#ff99cc' } } }} >
      <ListingControls />
      <VisualizationControls layers={Map.layers} setLayer={selectLayer} />
      <Map selectedLayer={selectedLayer} />
    </Grommet>
  )
}

export default Root
