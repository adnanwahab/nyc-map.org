import React, { useEffect, useState } from 'react'
import useOnclickOutside from 'react-cool-onclickoutside'
import { GeoJsonLayer } from 'deck.gl'

import usePlacesAutocomplete, {
  getGeocode,
  getLatLng
} from 'use-places-autocomplete'

const COLOR_SCALE = [
  // negative
  [65, 182, 196],
  [127, 205, 187],
  [199, 233, 180],
  [237, 248, 177],
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
    requestOptions: {},
    debounce: 300
  })
  const ref = useOnclickOutside(() => clearSuggestions() )

  const handleInput = (e) => {
    setValue(e.target.value)
  }

  const handleSelect =  ({ description }) => () => {
    setValue(description, false)
    clearSuggestions()

    let result = getGeocode({ address: description })
      .then((results) => getLatLng(results[0]))
      .then(({ lat, lng }) => {
        console.log('📍 Coordinates: ', { lat, lng })
        //setCoords([lat, long])
      })
  }

  const renderSuggestions = () =>
    data.map((suggestion) => {
      const {
        place_id,
        structured_formatting: { main_text, secondary_text }
      } = suggestion

      return (
        <li className="bg-white border-gray:300" key={place_id} onClick={handleSelect(suggestion)}>
          <strong>{main_text}</strong> <small>{secondary_text}</small>
        </li>
      )
    })

  return (
    <div ref={ref}>
      <input
        type="search"
        value={value}
        onChange={handleInput}
        disabled={!ready}
        placeholder='Where are you going?'
        className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"
      />
      {status === 'OK' && <ul>{renderSuggestions()}</ul>}
    </div>
  )
}

const hello = async(lon, lat) => {
  let transitType = 'walking'
  let token =
    'pk.eyJ1IjoiYXdhaGFiIiwiYSI6ImNpenExZHF0ZTAxMXYzMm40cWRxZXY1d3IifQ.TdYuekJQSG1eh6dDpywTxQ'
  let url = `https://api.mapbox.com/isochrone/v1/mapbox/${transitType}/-73.99399172186374%2C40.74021296904996?contours_minutes=15%2C30%2C45%2C60&polygons=true&denoise=1&generalize=1000&access_token=${token}`

  lon =  lon || -73.91922208269459
  lat = lat || 40.72185277744134
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



const CommuteDistanceControls = (props) => {
    const [selection, setSelection] = useState('c1')

    useEffect(() => {
      const call = async () => {
        const layer = await hello(selection)
        props.setLayer(layer)
      }
      call()
    }, [value, selection])

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
