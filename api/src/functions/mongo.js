const MongoClient = require('mongodb').MongoClient

const url = 'mongodb+srv://poop:poop@cluster0.rucmp.mongodb.net/test?retryWrites=true&w=majority'

const client = new MongoClient(url, { useUnifiedTopology: true })

export const handler = async (event, context) => {
  const search = JSON.parse(event.body).search
  const query = search.trim() ? {$search: search}: {}
  console.log(search, query)
  //console.log('query', query, typeof query, query.length)
  // connect to your cluster
  const client = await MongoClient.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  // specify the DB's name
  const db = client.db('test') // execute find query
  let items = await (await db.collection('places').find(query)
  .project({ coordinates: 1, categories:1, name: 1, image_url: 1, _id: 0 }).toArray())
  console.log(items.length)
  // console.log(items)
  //items = items.filter(d => (query, d.name, d.name.match(query) || d.categories.some(d=> d.alias.match(query))))
  // console.log(items.length)
  // TODO only return the bare minimum we need to render (no mongo _id, no health inspection data )
  // console.log(items)
  // close connection
  client.close()

  return {
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    statusCode: 200,
    body: JSON.stringify(items)
  }
}
