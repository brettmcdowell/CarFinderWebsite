'use strict'

const request = require('supertest')
const app = require('./app')

describe('Test the things service', () => {
  test('GET /data returns HTML TEXT', () => {
    return request(app)
      .get('/data')
      .expect('Content-type', 'text/html; charset=utf-8')
  })

  test('GET /data returns 500 error as not being used in association with client-side', () => {
    return request(app)
      .get('/data')
      .expect(500)
  })

  test('GET /upload returns 500 error as not being used in association with client-side', () => {
    return request(app)
      .get('/upload')
      .expect(500)
  })
})
