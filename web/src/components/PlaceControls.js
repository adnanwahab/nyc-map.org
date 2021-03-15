import React, { useState, useEffect } from 'react'
import GL from '@luma.gl/constants'
import _ from 'lodash'
import { ScatterplotLayer } from 'deck.gl'

const useFetch = (url) => {
    const [status, setStatus] = useState('idle')
    const [data, setData] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            setStatus('fetching')
            const res = await queryMongo(url)
            const data = await res.json()
            setData(data)
            setStatus('fetched')
            console.log('fetched')
        }

        fetchData()
    }, [url])

    return { status, data }
}

const queryMongo = async (search) => {
    const res = await fetch('http://localhost:8911/mongo', {
        method: 'POST',
        body: JSON.stringify({ search }),
        //body: JSON.stringify({$text: {$search: search}})
    })
    return res
}
const makeScatterLayer = (data) => {
    return new ScatterplotLayer({
        id: 'places',
        getPosition: (d) => [d.coordinates.longitude, d.coordinates.latitude],
        getFillColor: [100, 0, 100, 255],
        getLineColor: (d) => [0, 0, 0],
        radiusScale: 15,
        radiusMinPixels: 2,
        radiusMaxPixels: 100,
        data: data,
        lineWidthMinPixels: 1,
        stroked: true,
        opacity: 0.9,

        parameters: {
            [GL.DEPTH_TEST]: true,
            [GL.BLEND]: true,
            [GL.BLEND_SRC_RGB]: GL.ONE,
            [GL.BLEND_DST_RGB]: GL.ONE,
            [GL.BLEND_EQUATION]: GL.FUNC_ADD,
        },
    })
}

const PlaceControls = ({ selected, setLayer }) => {
    const [value, setValue] = useState('')
    const setValueBounce = _.debounce(setValue, 300)
    const { status, data } = useFetch(value)

    useEffect(() => {
        if (selected) setLayer(makeScatterLayer(data))
    }, [value, selected])

    return (
        <div className="p-5">
            {' '}
            <input
                type="search"
                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                placeholder="search"
                onChange={(e) => setValueBounce(e.target.value)}
            />
        </div>
    )
}

export default PlaceControls
