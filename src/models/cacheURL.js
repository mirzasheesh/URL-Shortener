require('dotenv').config();

const redis = require('redis');
const {promisify} = require('util');

const client = redis.createClient(process.env.redisPORT, process.env.redisHOST, { no_ready_check: true });

client.auth(process.env.redisPASS, () => console.log("Redis connected"));

const GET_Cache = promisify(client.get).bind(client);
const SET_Cache = promisify(client.set).bind(client);

module.exports = {GET_Cache, SET_Cache};