const micro = require('micro')
const {MongoClient} = require('mongodb')
const rpc = require('./rpc')

const connectDBMiddleware = async (uri, next) => {
  const db = await MongoClient.connect(uri)
  const collection = db.collection('users')
  collection.createIndex({email: 1}, {unique: true})
  return (req, res) => {
    req.db = collection
    return next(req, res)
  }
}

const main = async () => {
  const handler = await connectDBMiddleware(
    process.env.MONGO_DB,
    rpc
  )
  const server = micro(handler)
  server.listen(process.env.PORT, () => {
    console.log(`Listening On Port ${process.env.PORT}`)
  })
}

main()
