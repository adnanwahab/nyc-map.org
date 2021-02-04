// import GL from '@luma.gl/constants'

// import {
//   ScatterplotLayer,
//   GeoJsonLayer,
//   LineLayer,
//   HexagonLayer,
// } from 'deck.gl'
// import { HeatmapLayer } from '@deck.gl/aggregation-layers'

// import { h3ToGeo } from 'h3-js'
// import { H3HexagonLayer } from '@deck.gl/geo-layers'
// import * as d3 from 'd3'

// import { CSVLoader } from '@loaders.gl/csv'
// import { load } from '@loaders.gl/core'

// const layers = []

// const counts = {}
// window.counts = counts

// layers.push({
//   name: 'crimes',
//   fn: async () => {
//     console.log('loading crimes')
//     const data = await load('/data/archive/crimes.csv', CSVLoader)
//     console.log(data)

//     return new HeatmapLayer({
//       data,
//       id: 'heatmp-layer',
//       pickable: false,
//       getPosition: (d) => [d.Longitude, d.Latitude],
//       getWeight: (d) => 1,
//       intensity: 1,
//       threshold: 0.03,
//       radiusPixels: 30,
//     })
//   },
// })

// const treeColors = {
//   Poor: 0,
//   Fair: 0.5,
//   Good: 1,
// }

// // layers.push({
// //   name: 'trees',
// //   fn: async () => {
// //     const data = await load('/data/archive/trees.csv', CSVLoader)
// //     console.log(data)
// //     return new ScatterplotLayer({
// //       id: 'name',
// //       getPosition: (d) => [d.longitude, d.latitude],
// //       getColor: (d) => {
// //         return [100, (treeColors[d.health] || 0.5) * 200, 100, 255]
// //       },
// //       radiusScale: 2,
// //       getRadius: 5,
// //       data: data,
// //       outline: false,
// //       parameters: {
// //         // prevent flicker from z-fighting
// //         [GL.DEPTH_TEST]: true,

// //         // turn on additive blending to make them look more glowy
// //         [GL.BLEND]: true,
// //         [GL.BLEND_SRC_RGB]: GL.ONE,
// //         [GL.BLEND_DST_RGB]: GL.ONE,
// //         [GL.BLEND_EQUATION]: GL.FUNC_ADD,
// //       },
// //     })
// //   },
// // })

// const makeScatterLayer = (data, getter) => {
//   return new ScatterplotLayer({
//     id: 'name',
//     getPosition: getter,
//     getColor: (d) => {
//       return [100, 0.5, 100, 255]
//     },
//     radiusScale: 10,
//     getRadius: 10,
//     data: data,
//     outline: false,
//     parameters: {
//       // prevent flicker from z-fighting
//       [GL.DEPTH_TEST]: true,

//       // turn on additive blending to make them look more glowy
//       [GL.BLEND]: true,
//       [GL.BLEND_SRC_RGB]: GL.ONE,
//       [GL.BLEND_DST_RGB]: GL.ONE,
//       [GL.BLEND_EQUATION]: GL.FUNC_ADD,
//     },
//   })
// }

// layers.push({
//   name: 'buildings',
//   fn: () =>
//     new GeoJsonLayer({
//       id: 'name',
//       data: '/data/adnan-no-fields.json',
//       opacity: 0.8,
//       stroked: true,
//       filled: true,
//       extruded: true,
//       getElevation: (f) => Math.random() * 100,
//       getFillColor: (f) => colorScale(Math.random()),
//       getLineColor: [255, 0, (1 - 1 / 500) * 255],
//       lightSettings: lightSettings,
//       lineWidthScale: 10,
//     }),
// })

// complaints.forEach((c) =>
//   layers.push({ name: '311-complaint ' + c, fn: makeComplaintLayer(c) })
// )

// layers.push({
//   name: 'restaurants',
//   fn: async () => {
//     let query = { chinese: 'shit' }
//     const res = await fetch('http://localhost:8911/mongo', {
//       method: 'POST',
//       body: JSON.stringify(query),
//     })
//     const rest = await res.json()
//     window.rest = rest
//     let data = rest.filter((d) => d.cuisine === window.location.hash.slice(1))
//     return () => makeScatterLayer(data, (r) => r.address.coord)
//   },
// })

// layers.push({
//   name: 'chinese-restaurants',
//   fn: async () => {
//     let query = { cusine: 'chinese' }
//     const res = await fetch('http://localhost:8911/mongo', {
//       method: 'POST',
//       body: JSON.stringify(query),
//     })
//     const rest = await res.json()
//     window.rest = rest
//     let data = rest.filter((d) => d.cuisine === 'chinese')
//     return () => makeScatterLayer(data, (r) => r.address.coord)
//   },
// })

// layers.push({
//   name: 'isochrone',
//   fn: async () => {
//     let token =
//       'pk.eyJ1IjoiYXdhaGFiIiwiYSI6ImNpenExZHF0ZTAxMXYzMm40cWRxZXY1d3IifQ.TdYuekJQSG1eh6dDpywTxQ'
//     let url = `https://api.mapbox.com/isochrone/v1/mapbox/walking/-73.99399172186374%2C40.74021296904996?contours_minutes=15%2C30%2C45%2C60&polygons=true&denoise=1&generalize=1000&access_token=${token}`

//     const lon = -73.91922208269459,
//       lat = 40.72185277744134
//     var profile = 'cycling'
//     var minutes = 10
//     var urlBase = 'https://api.mapbox.com/isochrone/v1/mapbox/'

//     var query =
//       urlBase +
//       profile +
//       '/' +
//       lon +
//       ',' +
//       lat +
//       '?contours_minutes=' +
//       minutes +
//       '&polygons=true&access_token=' +
//       token

//     let req = await fetch(query, {
//       method: 'GET',
//     })
//     const res = await req.json()

//     return new GeoJsonLayer({
//       id: 'name',
//       data: res,
//       opacity: 0.8,
//       stroked: true,
//       filled: true,
//       extruded: true,
//       getElevation: (f) => Math.random() * 100,
//       getFillColor: (f) => colorScale(Math.random()),
//       getLineColor: [255, 0, (1 - 1 / 500) * 255],
//       lightSettings: lightSettings,
//       lineWidthScale: 10,
//     })
//   },
// })
// export { layers }
