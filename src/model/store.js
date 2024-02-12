import mongoose from "mongoose";
import { momentTimeStampPlugin } from "../plugin/plugin";
const schema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        ownerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        }
    }
);
schema.plugin(momentTimeStampPlugin, {});
const Store = mongoose.model('Store', schema);

export default Store;