const MongoClient = require('mongodb').MongoClient

const url = 'mongodb+srv://poop:poop@cluster0.rucmp.mongodb.net/test?retryWrites=true&w=majority'

const client = new MongoClient(url, { useUnifiedTopology: true })

export const handler = async (event, context) => {
  //console.log(event, context)

  // const query = JSON.parse(event.body)
  const query = JSON.parse(event.body).search

  //console.log('query', query, typeof query, query.length)
  // connect to your cluster
  const client = await MongoClient.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  // specify the DB's name
  const db = client.db('test') // execute find query
  let items = await (await db.collection('places').find().toArray())
  // console.log(items)
  items = items.filter(d => (query, d.name, d.name.match(query) || d.categories.some(d=> d.alias.match(query))))
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
