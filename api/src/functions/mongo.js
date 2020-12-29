const MongoClient = require('mongodb').MongoClient;

const url = `mongodb+srv://poop:poop@cluster0.rucmp.mongodb.net/test?retryWrites=true&w=majority`;
const mongoose = require('mongoose');


const client = new MongoClient(url, { useUnifiedTopology: true });


export const handler =  async (event, context) => {
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






}
