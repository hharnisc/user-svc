const micro = require('micro')
const {MongoClient} = require('mongodb')
const rpc = require('./rpc')

const connectDBMiddleware = async (uri, next) => {
  const db = await MongoClient.connect(uri)
  return (req, res) => {
    req.db = db.collection('users')
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
