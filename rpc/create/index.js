const {createError} = require('@hharnisc/micro-rpc')

module.exports = async ({
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
