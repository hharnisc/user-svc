const micro = require('micro')
const {MongoClient} = require('mongodb')
const {
 rpc,
 method,
 createError
} = require('@hharnisc/micro-rpc')

const create = async ({
  email
}, {
  db
}) => {
  if (!email) {
    throw createError({message: 'Missing Input Parameter'})
  }
  const result = await db.insertOne({
    email,
    verified: false
  })
  return {
    id: result.insertedId
  }
}

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
    rpc(
      method('create', create),
      method('get', (_, {db}) => db.find().toArray()),
      method('update', () => 'update'),
      method('delete', () => 'delete'),
      method('verify', () => 'verify'),
    )
  )
  const server = micro(handler)
  server.listen(process.env.PORT, () => {
    console.log(`Listening On Port ${process.env.PORT}`)
  })
}

main()
