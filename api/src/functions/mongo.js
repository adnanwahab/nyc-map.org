const MongoClient = require('mongodb').MongoClient

const url = `mongodb+srv://poop:poop@cluster0.rucmp.mongodb.net/test?retryWrites=true&w=majority`

const client = new MongoClient(url, { useUnifiedTopology: true })

export const handler = async (event, context) => {
  console.log(event, context)

  let query = event.body
  // connect to your cluster
  const client = await MongoClient.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  // specify the DB's name
  const db = client.db('sample_restaurants')
  // execute find query
  const items = await db.collection('restaurants').find({}).toArray()
  //TODO only return the bare minimum we need to render (no mongo _id, no health inspection data )
  //console.log(items)
  // close connection
  client.close()

  return {
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    statusCode: 200,
    body: JSON.stringify(items),
  }
}
