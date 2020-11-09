const NodeCache = require('node-cache')
const grpc = require('./config/index')

const Client = function () {
  this.host = 'localhost'
  this.port = '3030'
  this.grpcClient = null
  this.isDebugMode = false
  this.cacheClient = null
  return this
}

Client.prototype.withGrpcUrl = function (host = null) {
  this.host = host
  return this
}
Client.prototype.withGrpcPort = function (port = '80') {
  this.port = port
  return this
}
Client.prototype.enableDebugMode = function () {
  this.isDebugMode = true
  return this
}
Client.prototype.build = function () {
  this.grpcClient = grpc(`${this.host}:${this.port}`)
  this.cacheClient = new NodeCache()
  return this
}
Client.prototype.findConfig = function (keyValue, ttl = -1) {
  if (this.cacheClient.get(keyValue)) {
    return Promise.resolve(this.cacheClient.get(keyValue))
  }
  return new Promise((resolve, reject) => {
    this.grpcClient.findConfig({ name: keyValue }, (err, response) => {
      if (err) {
        return reject(err)
      }
      if (ttl > 0) {
        this.cacheClient.set(keyValue, response, ttl)
      }
      return resolve(response)
    })
  })
}

module.exports = Client
