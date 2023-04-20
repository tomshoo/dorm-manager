const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
    email: String,
    username: String,
    password: String,
});

const UserModel = model('user', UserSchema);

module.exports = {
    UserSchema,
    UserModel,
}