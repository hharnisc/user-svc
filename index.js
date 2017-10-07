const micro = require('micro')
const {MongoClient} = require('mongodb')
const {
 rpc,
 method
} = require('@hharnisc/micro-rpc')

const main = async () => {
  const db = await MongoClient.connect(process.env.MONGO_DB)
  const collection = db.collection('user')
  const server = micro(
    rpc(
      method('create', () => 'create'),
      method('get', () => collection.find().toArray()),
      method('update', () => 'update'),
      method('delete', () => 'delete'),
      method('verify', () => 'verify'),
    )
  )

  server.listen(process.env.PORT)
}

main()
