import React, { useState, useEffect } from 'react'
import { StaticMap } from 'react-map-gl'
import DeckGL from 'deck.gl'
import VisualizationControls from 'src/components/VisualizationControls'
import ListingControls from 'src/components/ListingControls'
import styled from 'styled-components'
import { layers } from 'src/components/layers'

import { Grommet } from 'grommet';

const INITIAL_VIEW_STATE = {
  longitude: -73.91922208269459,
  latitude: 40.72185277744134,
  zoom: 11.502812637593744,
  pitch: 0,
  bearing: 0,
  width: 960,
  height: 500,
}

// Set your mapbox token here
const MAPBOX_TOKEN = // process.env.MapboxAccessToken; // eslint-disable-line
  'pk.eyJ1IjoiYXdhaGFiIiwiYSI6ImNpenExZHF0ZTAxMXYzMm40cWRxZXY1d3IifQ.TdYuekJQSG1eh6dDpywTxQ'

const Legend = styled.section`
  display: fixed;
`
function Root() {
  const [selection, setSelection] = useState(0)
  const [layer, setLayer] = useState([])

  const _onWebGLInitialize = (gl) => {
    gl.enable(gl.DEPTH_TEST)
    gl.depthFunc(gl.LEQUAL)
  }

  const _updateLayerSettings = (settings) => {
    setData({ settings })
  }

  const _selectLayer = async (e) => {
    console.log(+e.target.id)
    setSelection(e.target.id)
  }

  useEffect(() => {
    const poop = async () => {
      const l = await layers[selection].fn()
      setLayer(l)
    }
    poop()
  }, [selection])

  return (
    <Grommet theme={{ global: { colors: { doc: '#ff99cc' } } }} >
      <ListingControls />
      <VisualizationControls selectedIndex={selection} onClick={_selectLayer} />

      {false && (
        <LayerControls
          settings={this.state.settings}
          propTypes={HEXAGON_CONTROLS}
          onChange={(settings) => this._updateLayerSettings(settings)}
        />
      )}

      <DeckGL initialViewState={INITIAL_VIEW_STATE} controller layers={[layer]}>
        <StaticMap
          mapboxApiAccessToken={MAPBOX_TOKEN}
          mapStyle="mapbox://styles/mapbox/dark-v9"
        />
      </DeckGL>

      <Legend />
    </Grommet>
  )
}

export default Root
