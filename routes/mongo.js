// @ts-check

const { MongoClient, ServerApiVersion } = require('mongodb');

const url =
  'mongodb+srv://yunbee:dbsql&0630@cluster0.jwlxfhv.mongodb.net/?retryWrites=true&w=majority';

const client = new MongoClient(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function main() {
  await client.connect();

  const users = client.db('ive').collection('users');

  await users.deleteMany({});
  await users.insertMany([
    {
      name: 'yujin',
      age: 21,
    },
    {
      name: 'wonyoung',
      age: 20,
    },
  ]);

  await users.deleteOne({
    name: 'yujin',
  });

  const data = users.find({
    name: 'wonyoung',
  });

  console.log(data);

  const arr = await data.toArray();
  console.log(arr);

  // const data = users.find({});
  // const arr = await data.toArray();

  // console.log(arr);

  await client.close();
}

main();
// client.connect((err) => {
//   const collection = client.db('test').collection('devices');
//   // perform actions on the collection object
//   client.close();
// });
