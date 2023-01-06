const mongoose = require('mongoose');

const host = process.env.databaseHost;
const name = process.env.databaseName;
const user = process.env.databaseUser;
const pass = process.env.databasePass;

const DB = `mongodb+srv://${user}:${pass}@${host}/${name}?retryWrites=true&w=majority`;

const connect = mongoose.connect(DB);

module.exports = connect;