require('dotenv').config();

const express = require('express');
const server = express();

const cors = require('cors');

const databaseConnect = require('./connectDB');
const routes = require('./routes/auth');

server.use(express.json());
server.use(cors());

server.use('/', routes);

server.listen(process.env.PORT, () => console.log(`Server: ${process.env.PROTOCOL}://127.0.0.1:${process.env.PORT}`));

databaseConnect
.then(() => console.log("Database connected"))
.catch(() => console.log("Error in database connection"));