const grpc = require('grpc')
const path = require('path')
const protoLoader = require('@grpc/proto-loader')

const init = (url) => {
  const packageDefinition = protoLoader.loadSync(path.join(__dirname, '/liveconfiguration.proto'))
  const packageLoad = grpc.loadPackageDefinition(packageDefinition).config4live
  return new packageLoad.LiveConfiguration(
    url, grpc.credentials.createInsecure())
}

module.exports = init
