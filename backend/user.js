var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    id: Number,
    firstname: String,
    lastname: String,
    age: Number,
    sex: String
}, {
    versionKey: false
});
//防止document里出现_v文档版本号

module.exports = mongoose.model('User', UserSchema, 'userlist');