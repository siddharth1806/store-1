import mongoose from "mongoose";
import { momentTimeStampPlugin } from "../plugin/plugin";
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

export default User;