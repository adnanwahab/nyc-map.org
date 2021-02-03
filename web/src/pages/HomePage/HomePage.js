import React from 'react'

import VisualizationControls from 'src/components/VisualizationControls'
import ListingControls from 'src/components/ListingControls'
import Map from 'src/components/Map'

import { Grommet } from 'grommet';


function Root() {
  return (
    <Grommet theme={{ global: { colors: { doc: '#ff99cc' } } }} >
      <ListingControls />
      <VisualizationControls setLayer={()=> {console.log('wtf')}} />
      <Map />
    </Grommet>
  )
}

export default Root
