var crypto= require("crypto");

var mongoose = require('../lib/mongoose');

var Schema = mongoose.Schema;

var schema  = new Schema({
    username:{
        type:String,
        required:[true,"usernameRequired"],
        maxlength:[32,"tooLong"],
        unique:true
    },
    hashedPassword:{
        type:String,
        minlength:[8, "tooShort"],
        required:[true,"passwordRequired"]
    },
    salt:{
        type:String,
        required:true
    },
    created:{
        type:Date,
        default:Date.now
    }
});

schema.methods.encryptPassword = function(password){
    return crypto.createHmac("sha1", this.salt).update(password).digest('hex');
};
schema.virtual('password')
    .set(function (password) {
        this._plainPassword = password;
        this.salt = Math.random() + '';
        this.hashedPassword = this.encryptPassword(password);
    })
    .get(function () {
        return this._plainPassword;
    });

schema.methods.checkPassword = function(password){
  return this.encryptPassword(password) === this.hashedPassword;
};
exports.User = mongoose.model('User',schema);

// user.set('passwors');passwors