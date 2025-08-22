import { Schema, Model, model } from "mongoose";

const User = new Schema({
    login: { type: String, unique: true, required: true },
    password_hash: { type: String, required: true },
    roles: [{ type: String, ref: 'Role' }]
});

export default model('User', User);