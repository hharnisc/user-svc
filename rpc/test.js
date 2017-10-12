const micro = require('micro')
const listen = require('test-listen')
const request = require('request-promise')
const rpc = require('./index')

describe('rpc', () => {
  let service
  beforeEach(() => {
    service = micro(rpc)
  })

  afterEach(() => {
    service.close()
  })

  it('should have all endpoints', async () => {
    const url = await listen(service)
    const body = await request(url)
    console.log(body)
  })
})
