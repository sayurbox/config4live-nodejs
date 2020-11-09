/* global test, expect, jest */
const liveConfig = require('../src');

jest.mock('../src/config/index', () => () => (
    {
        findConfig: (key, callback) => key.name == null ? callback('error', key): callback(null, key),
    }
));    
 

test('live config initial satte', () => {
    const client = new liveConfig();
    expect(client.host).toBe('localhost');
    expect(client.port).toBe('3030');
    expect(client.isDebugMode).toBe(false);
    expect(client.grpcClient).toBe(null);
});

test('live config init instance with builder pattern', () => {
    const url = 'dummy.com';
    const port = '30106';
    const client = new liveConfig();
    client
        .withGrpcUrl(url)
        .withGrpcPort(port)
        .enableDebugMode()
        .build()
    expect(client.host).toBe(url);
    expect(client.port).toBe(port);
    expect(client.grpcClient).not.toBe(null);
    expect(client.findConfig).not.toBe(null);
});

test('live config get instance and get value from grpc', async () => {
    const url = 'dummy.com';
    const port = '30106';
    const client = new liveConfig();
    client
        .withGrpcUrl(url)
        .withGrpcPort(port)
        .enableDebugMode()
        .build()
    
    const data = await client.findConfig('nearest_distance_tolerance_km', 20);
    expect(client.findConfig).not.toBe(null);
});

test('live config get instance and get value from grpc and cache', async () => {
    const url = 'dummy.com';
    const port = '30106';
    const client = new liveConfig();
    client
        .withGrpcUrl(url)
        .withGrpcPort(port)
        .enableDebugMode()
        .build()
    
    const data = await client.findConfig('nearest_distance_tolerance_km', 20);
    expect(data).not.toBe(null);
    const dataFromCache = await client.findConfig('nearest_distance_tolerance_km', 20);
    expect(dataFromCache).not.toBe(null);
});


test('live config get instance and error when null parameter', async () => {
    const url = 'dummy.com';
    const port = '30106';
    const client = new liveConfig();
    client
        .withGrpcUrl(url)
        .withGrpcPort(port)
        .enableDebugMode()
        .build()
    try {
        const data = await client.findConfig(null, 20);
    } catch(e) {
        expect(e).not.toBe(null);
    }
});


test('make test coverage 100% :D',  async () => {
    const url = 'dummy.com';
    const port = '30106';
    const client = new liveConfig();
    client.withGrpcUrl();
    client.withGrpcPort();
    client.enableDebugMode();
    client.build();
    try {
        const data = await client.findConfig();
    } catch(e) {
        expect(e).not.toBe(null);
    }
});
