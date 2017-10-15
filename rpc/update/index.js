const {createError} = require('@hharnisc/micro-rpc')
const {validate} = require('isemail')

module.exports = async ({
  email,
  dataId,
  data
}, {
  db
}) => {
  if (!email) {
    throw createError({message: 'Missing Input Parameter'})
  }
  if (!validate(email)) {
    throw createError({message: 'Invalid Input: email'})
  }
  if (!dataId || typeof dataId !== 'string') {
    throw createError({message: 'Invalid Input: dataId'})
  }
  let update = {
    $set: {
      [`data.${dataId}`]: data
    }
  }
  if (!data) {
    update = {
      $unset: {
        [`data.${dataId}`]: ''
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
