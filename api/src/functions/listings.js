const MongoClient = require('mongodb').MongoClient

const url = 'mongodb+srv://poop:poop@cluster0.rucmp.mongodb.net/test?retryWrites=true&w=majority'

const client = new MongoClient(url, { useUnifiedTopology: true })

export const handler = async (event, context) => {

  console.log('GRABBING LISTINGS FROM MONGO')

  const query = event.body
  // connect to your cluster
  const client = await MongoClient.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  // specify the DB's name
  const db = client.db('test') // execute find query

  console.log('fuck you ass')

  const items = await db.collection('airbnb_listings').find({}).limit(500).toArray()
  // TODO only return the bare minimum we need to render (no mongo _id, no health inspection data )
  // console.log(items)
  // close connection
  client.close()
  console.log('wtf lol', items.length)

  return {
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    statusCode: 200,
    body: JSON.stringify(items)
  }
}
