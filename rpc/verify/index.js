const {createError} = require('@hharnisc/micro-rpc')
const {validate} = require('isemail')

module.exports = async ({
  email
}, {
  db
}) => {
  if (!email) {
    throw createError({message: 'Missing Input Parameter'})
  }
  if (!validate(email)) {
    throw createError({message: 'Invalid Input: email'})
  }
  const result = await db.updateOne({
    email
  }, {
    $set: {
      verified: true
    }
  })
  return {
    verified: result.matchedCount > 0
  }
}
