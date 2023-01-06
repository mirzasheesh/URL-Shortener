require('dotenv').config();

const shortID = require('shortid');

const urlModel = require('../models/urlModel');
const { GET_Cache, SET_Cache } = require('../models/cacheURL');

const selectURL = async (request, response) => {

    const { short } = request.params;

    let URL;

    if (short) {

        URL = await GET_Cache(short);

        if (URL == null) {

            URL = await urlModel.findOne({ ShortURL: short });

            if (URL) {
                
                URL.ClickCounts++;
                URL.save();

                URL = URL['LongURL'];
                SET_Cache(short, URL, 'EX', process.env.CacheTime);

            } else {

                URL = process.env.REDIRECT;
            }

        } else {

            urlModel.findOne({ ShortURL: short }).then((thisURL) => {

                thisURL.ClickCounts++;
                thisURL.save();
            });
        }
    }

    response.status(302).redirect(URL);
    response.end();
};

const setURL = async (request, response) => {

    const { URL, customCode } = request.body;

    let short;

    if (customCode) {

        short = await urlModel.findOne({ ShortURL: customCode });

        if (short == null) {

            await urlModel({ LongURL: URL, ShortURL: customCode, ClickCounts: 0, isActive: true }).save();
            short = customCode;

        } else if (short) {

            response.status(406).send(JSON.stringify({
                status: "error",
                message: "custom URL already exists"
            }));
            response.end();
            return;
        }

    } else {

        short = await urlModel.findOne({ LongURL: URL });

        if (short == null) {

            short = shortID(URL);
            await urlModel({ LongURL: URL, ShortURL: short, ClickCounts: 0, isActive: true }).save();

        } else if (short) {

            short = short['ShortURL'];

        }
    }

    SET_Cache(short, URL, 'EX', process.env.CacheTime);

    response.status(201).send(JSON.stringify({
        status: "success",
        shortURL: `${process.env.PROTOCOL}://${process.env.DOMAIN}/${short}`
    }));

    response.end();
};

module.exports = { selectURL, setURL };