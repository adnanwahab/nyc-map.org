const MongoClient = require('mongodb').MongoClient;

const url = `mongodb+srv://poop:poop@cluster0.rucmp.mongodb.net/test?retryWrites=true&w=majority`;
const mongoose = require('mongoose');


const client = new MongoClient(url, { useUnifiedTopology: true });


export const handler =  async (event, context, ) => {
  // connect to your cluster
  const client = await MongoClient.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  // specify the DB's name
  const db = client.db('test');
  // execute find query
  const items = await db.collection('cars').find({}).toArray();
  console.log(items);
  // close connection
  client.close();

  return {
    statusCode: 200,
    body: JSON.stringify(items)
  }




  // client.connect(function(err) {
    // console.log(err)
    // console.log("Connected successfully to server");

    // const collection = client.db('test').collection('cars')
    // const query = { name: 'Tesla' }
    // let data =  await collection.findOne(query)
    // client.close();

      // callback(null, {
      //   statusCode: 200,
      //   body: JSON.stringify(data)
      // })



  // });




    // const collection = client.collection('cars');
    // let data =  collection.findOne(query).then((data) => {

    //   callback(null, {
    //     statusCode: 200,
    //     headers: { 'Content-Type': 'application/json ' },
    //     body: JSON.stringify({
    //       data: {
    //         result: data,
    //         found: true
    //       }
    //     }),
    //   })
    // })




}
