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

  it('should have all rpc endpoints', async () => {
    const url = await listen(service)
    const body = await request({
      method: 'POST',
      uri: url,
      body: {
        name: 'methods'
      },
      json: true
    })
    expect(body)
      .toEqual({
        result:
        [
          {name: 'create'},
          {name: 'get'},
          {name: 'update'},
          {name: 'delete'},
          {name: 'verify'},
          {name: 'methods', docs: 'list all available methods'}
        ]
      })
  })
})
