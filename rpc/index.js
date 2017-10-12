const {
 rpc,
 method
} = require('@hharnisc/micro-rpc')
const create = require('./create')

module.exports = rpc(
  method('create', create),
  method('get', () => 'get'),
  method('update', () => 'update'),
  method('delete', () => 'delete'),
  method('verify', () => 'verify'),
)
