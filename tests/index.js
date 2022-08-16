const { createClient } = require('redis');

const env = process.env.NODE_ENV

const REDIS_CREDENTIALS = {
    host: process.env.redisHOST,
    port: process.env.redisPORT,
    password: process.env.redisPASS
}

console.log(JSON.stringify(REDIS_CREDENTIALS));

const redisPass = REDIS_CREDENTIALS.password ? `:${REDIS_CREDENTIALS.password}@` : ''

let redisURL = `redis://${redisPass}${REDIS_CREDENTIALS.host}:${REDIS_CREDENTIALS.port}`

let client = createClient({url: redisURL});

client.connect().then(async () => {
	console.log("Redis Client Connected")

	await client.hSet('JanusFeatureList', 'tazapay', JSON.stringify({
		'userIds': [1],
		'modulus': 10,			// 20%
		'modulusOffset': 6,		// 5, 10, 15 
	}));

	process.exit()
});
