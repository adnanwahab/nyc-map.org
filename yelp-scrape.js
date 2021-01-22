'use strict'

const yelp = require('yelp-fusion')
const client = yelp.client(
  '0QCQsubRVAbIPNJFPBVSb-Ykx6rrYUZnYhD4d8wHJqK-fsVpawFkD5hdG54i2qrRUE7M_rcAv3m63xPK6VGUb5MSpR0PtuaCC75KNq8Yd-cHc0Z_85UxaRV_OQQGYHYx'
)

let count = 0

let master = []
let search = (index) => {
  client
    .search({
      location: 'new york',
      limit: 50,
      offset: index,
    })
    .then((response) => {
      master = master.concat.apply(master, response.jsonBody.businesses)
      //console.log(response.jsonBody.businesses)
      console.log(response.jsonBody.businesses.length)
      count++
      if (count === i) console.log('done')
    })
    .catch((e) => {
      console.log(e)
    })
}

for (var i = 0; i < 100; i++) setTimeout(() => search(i), i * 100)

//const MongoClient = require('mongodb').MongoClient

// const url = `mongodb+srv://poop:poop@cluster0.rucmp.mongodb.net/test?retryWrites=true&w=majority`

// const client = new MongoClient(url, { useUnifiedTopology: true })

// export const handler = async (event, context) => {
//   console.log(event, context)

//   let query = event.body
//   // connect to your cluster
//   const client = await MongoClient.connect(url, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   // specify the DB's name
//   const db = client.db('sample_restaurants')
//   // execute find query
//   const items = await db.collection('restaurants').find({}).toArray()
//   //TODO only return the bare minimum we need to render (no mongo _id, no health inspection data )
//   //console.log(items)
//   // close connection
//   client.close()

//   return {
//     headers: {
//       'Access-Control-Allow-Origin': '*',
//     },
//     statusCode: 200,
//     body: JSON.stringify(items),
//   }
// }
