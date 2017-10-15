const {createError} = require('@hharnisc/micro-rpc')
const {validate} = require('isemail')

module.exports = async ({
  email,
  appId,
  appData
}, {
  db
}) => {
  if (!email) {
    throw createError({message: 'Missing Input Parameter'})
  }
  if (!validate(email)) {
    throw createError({message: 'Invalid Input: email'})
  }
  if (!appId || typeof appId !== 'string') {
    throw createError({message: 'Invalid Input: appId'})
  }
  let update = {
    $set: {
      [`data.${appId}`]: appData
    }
  }
  if (!appData) {
    update = {
      $unset: {
        [`data.${appId}`]: ''
      }
    }
  }
  const result = await db.updateOne({
    email
  }, update)
  return {
    updated: result.matchedCount > 0
  }
}
