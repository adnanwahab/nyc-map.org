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

const PlacesAutocomplete = ({setCoords}) => {
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
        setCoords([lng, lat])
      })
  }

  const renderSuggestions = () =>
    data.map((suggestion) => {
      const {
        place_id,
        structured_formatting: { main_text, secondary_text }
      } = suggestion

      return (
        <li className="bg-white border-gray:300 hover:bg-indigo-300 hover:text-white" key={place_id} onClick={handleSelect(suggestion)}>
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

const isoChrone = async(coords, selection, minutes) => {
  let transitType = selection
  let token = 'pk.eyJ1IjoiYXdhaGFiIiwiYSI6ImNpenExZHF0ZTAxMXYzMm40cWRxZXY1d3IifQ.TdYuekJQSG1eh6dDpywTxQ'

  var urlBase = 'https://api.mapbox.com/isochrone/v1/mapbox/'
  // https://api.mapbox.com/isochrone/v1/mapbox/cycling/-73.91922208269459,40.72185277744134?contours_minutes=10&polygons=true&access_token=pk.eyJ1IjoiYXdhaGFiIiwiYSI6ImNpenExZHF0ZTAxMXYzMm40cWRxZXY1d3IifQ.TdYuekJQSG1eh6dDpywTxQ
  var query =
    urlBase +
    selection.toLowerCase() +
    '/' +
    coords[0] +
    ',' +
    coords[1] +
    '?contours_minutes=' +
    minutes +
    '&polygons=true&access_token=' +
    token

    console.log(query)

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
    const options = ['Walking', 'Cycling', 'Driving']
    const [selection, setSelection] = useState(options[0])
    const [coords, setCoords] = useState([-73.91922208269459, 40.72185277744134])
    const [minutes, setMinutes] = useState(10)
    const setDebouncedMinutes = _.debounce(setMinutes, 300)

    useEffect(() => {
      const call = async () => {
        const layer = await isoChrone(coords, selection, minutes)
        props.setLayer(layer)

      //   analytics.track('control_open', {
      //     tab: 'complaint',

      // });
      }
      call()

    }, [selection, coords, minutes, props.selected])

    const pills =  "py-2 px-4 shadow-md no-underline rounded-full text-white font-sans font-semibold text-sm border-red btn-primary hover:text-white hover:bg-red-light focus:outline-none active:shadow-none"
  return (
    <div style={{'borderBottom': '2px solid #eaeaea'}} className="p-5">

      <ul className='flex cursor-pointer'>
          {options.map(o => (
            <li key={o} onClick={() => setSelection(o)} className={pills + (selection == o ? ' bg-indigo-400' : ' bg-pink-500')}>{o}</li>
          ))}
        </ul>
        <input type="range" onChange={(e) => setDebouncedMinutes(e.target.value)} value={minutes} min={0} max={60} /> <span>Max Travel Time: {minutes} minutes</span>

      <PlacesAutocomplete setCoords={setCoords}/>
      </div>

  )
}


//https://dev.virtualearth.net/REST/v1/Routes/Isochrones?waypoint=31.520759,-97.133597&maxDistance=50&distanceUnit=mile&optimize=distance&travelMode=driving&key=ApLkwLVokERzZT9fwea7ZeHsVlM2nDfSGA2tkarKA8EUcuhbrF04OINaeBSmSPS4
export default CommuteDistanceControls
