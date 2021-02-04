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



// export { layers }
