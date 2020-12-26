d3.request('data/weather.bin')
  .responseType('arraybuffer')
  .on('load', function (req) { parseData(req.response) })
  .on('error', reject)
  .get()
function parseData (buffer) {
  const bufferData = new Uint16Array(buffer)
  const hours = 72
  const components = 3
  const l = bufferData.length / (hours * components)
  const hourlyData = Array(hours)

  for (let i = 0; i < hours; ++i) {
    hourlyData[i] = createHourlyData(bufferData, i, l, hours, components)
  }

  return hourlyData
}

function createHourlyData (bufferData, i, l, hours, components) {
  const len = bufferData.length
  const array = Array(l)

  for (let j = i * components, count = 0; count < l; j += hours * components) {
    array[count++] = new Float32Array([bufferData[j], bufferData[j + 1], bufferData[j + 2]])
  }

  return array
}

function reject (error) {}
