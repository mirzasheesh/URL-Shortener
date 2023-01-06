require('dotenv').config();

const express = require('express');

const {selectURL, setURL} = require('../controllers/urlController');
const notFound = require('../controllers/notFound');
const validURL = require('../middlewares/valid_URL');

const router = express.Router();

router.get('/:short', selectURL);

router.post('/short', validURL, setURL);

router.all('/*', notFound);

module.exports = router;