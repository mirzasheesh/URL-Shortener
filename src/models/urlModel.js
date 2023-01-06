const mongoose = require('mongoose');

const urlSchema = mongoose.Schema({
    LongURL: {
        type: String,
        unique: true,
        trim: true,
    },
    ShortURL: {
        type: String,
        unique: true,
        trim: true,
    },
    ClickCounts: {
        type: Number,
    },
    isActive: {
        type: Boolean,
    },
});

const urlModel = mongoose.model('URLs', urlSchema);

module.exports = urlModel;