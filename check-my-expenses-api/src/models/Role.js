import { Schema, Model, model } from "mongoose";

const Role = new Schema({
    code: {type: String, unique: true, required: true, default: "USER" }
});

export default model('Role', Role);