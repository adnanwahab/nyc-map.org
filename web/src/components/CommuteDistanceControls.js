import React, { useEffect, useState } from 'react'
import { RadioButtonGroup, TextInput } from 'grommet'

import usePlacesAutocomplete, {
  getGeocode,
  getLatLng
} from 'use-places-autocomplete'
import useOnclickOutside from 'react-cool-onclickoutside'


import {
  ScatterplotLayer,
  GeoJsonLayer,
  LineLayer,
  HexagonLayer,
} from 'deck.gl'

const COLOR_SCALE = [
  // negative
  [65, 182, 196],
  [127, 205, 187],
  [199, 233, 180],
  [237, 248, 177],

  // positive
  [255, 255, 204],
  [255, 237, 160],
  [254, 217, 118],
  [254, 178, 76],
  [253, 141, 60],
  [252, 78, 42],
  [227, 26, 28],
  [189, 0, 38],
  [128, 0, 38]
]

const colorScale = (x) => {
  const i = Math.round(x * 7) + 4
  if (x < 0) {
    return COLOR_SCALE[i] || COLOR_SCALE[0]
  }
  return COLOR_SCALE[i] || COLOR_SCALE[COLOR_SCALE.length - 1]
}

const PlacesAutocomplete = () => {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions
  } = usePlacesAutocomplete({
    requestOptions: {
      /* Define search scope here */
    },
    debounce: 300
  })
  const ref = useOnclickOutside(() => {
    // When user clicks outside of the component, we can dismiss
    // the searched suggestions by calling this method
    clearSuggestions()
  })

  const handleInput = (e) => {
    // Update the keyword of the input element
    setValue(e.target.value)
  }

  const handleSelect = ({ description }) => () => {
    // When user selects a place, we can replace the keyword without request data from API
    // by setting the second parameter to "false"
    setValue(description, false)
    clearSuggestions()

    // Get latitude and longitude via utility functions
    getGeocode({ address: description })
      .then((results) => getLatLng(results[0]))
      .then(({ lat, lng }) => {
        console.log('📍 Coordinates: ', { lat, lng })
      })
      .catch((error) => {
        console.log('😱 Error: ', error)
      })
  }

  const renderSuggestions = () =>
    data.map((suggestion) => {
      const {
        place_id,
        structured_formatting: { main_text, secondary_text }
      } = suggestion

      return (
        <li key={place_id} onClick={handleSelect(suggestion)}>
          <strong>{main_text}</strong> <small>{secondary_text}</small>
        </li>
      )
    })

  return (
    <div ref={ref}>
      <input
        value={value}
        onChange={handleInput}
        disabled={!ready}
        placeholder='Where are you going?'
        className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"
      />
      {/* We can use the "status" to decide whether we should display the dropdown or not */}
      {status === 'OK' && <ul>{renderSuggestions()}</ul>}
    </div>
  )
}

const hello = async() => {
  let transitType = 'walking'
  let token =
    'pk.eyJ1IjoiYXdhaGFiIiwiYSI6ImNpenExZHF0ZTAxMXYzMm40cWRxZXY1d3IifQ.TdYuekJQSG1eh6dDpywTxQ'
  let url = `https://api.mapbox.com/isochrone/v1/mapbox/${transitType}/-73.99399172186374%2C40.74021296904996?contours_minutes=15%2C30%2C45%2C60&polygons=true&denoise=1&generalize=1000&access_token=${token}`

  const lon = -73.91922208269459,
    lat = 40.72185277744134
  var profile = 'cycling'
  var minutes = 10
  var urlBase = 'https://api.mapbox.com/isochrone/v1/mapbox/'

  var query =
    urlBase +
    profile +
    '/' +
    lon +
    ',' +
    lat +
    '?contours_minutes=' +
    minutes +
    '&polygons=true&access_token=' +
    token

  let req = await fetch(query, {
    method: 'GET',
  })
  const res = await req.json()

  return new GeoJsonLayer({
    id: 'commute',
    data: res,
    opacity: 0.8,
    stroked: true,
    filled: true,
    extruded: true,
    getElevation: (f) => Math.random() * 100,
    getFillColor: (f) => colorScale(Math.random()),
    getLineColor: [255, 0, (1 - 1 / 500) * 255],
    lineWidthScale: 10,
  })
}

const allSuggestions = Array(100)
  .fill()
  .map((_, i) => `${i + 1} suggestion`)

const CommuteDistanceControls = (props) => {
  const [suggestions, setSuggestions] = React.useState(allSuggestions)
  const [value, setValue] = React.useState('')
  const [selection, setSelection] = useState('c1')

  // console.log('open sesame', props.setLayer(props.layers[15])())


  useEffect(() => {
    const call = async () => {
      const layer = await hello()
      props.setLayer(layer)
    }
    call()
  }, [value])

  const onChange = event => {
    console.log(event)
    const nextValue = event.target.value
    setValue(nextValue)
    if (!nextValue) setSuggestions(allSuggestions)
    else {
      const regexp = new RegExp(`^${nextValue}`)
      setSuggestions(allSuggestions.filter(s => regexp.test(s)))
    }
  }

  const onSuggestionSelect = event => {
    console.log(event)
    setValue(event.suggestion)
  }
  const options = ['Walk', 'Drive', 'Train']


  return (
    <>
    <div style={{'borderBottom': '2px solid #eaeaea'}}>

      <ul className='flex cursor-pointer'>
          {options.map(o => (
            <li key={o} onClick={() => setSelection(o)} className='py-2 px-6 bg-white rounded-t-lg'>{o}</li>
          ))}
        </ul>
      </div>
      <PlacesAutocomplete />
    </>
  )
}

export default CommuteDistanceControls
