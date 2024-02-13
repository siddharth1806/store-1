const mongoose = require('mongoose');
const { momentTimeStampPlugin } = require("../plugin/plugin.js");
const schema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        role: {
            type: String,
            enum: ['ADMIN', 'STORE_OWNER', 'CUSTOMER']
        },
        googleId: {
            type: String,
            required: true
        },
        displayName: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
    }
);
schema.plugin(momentTimeStampPlugin, {});

const User = mongoose.model('User', schema);

module.exports = User;
