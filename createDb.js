var mongoose = require('./lib/mongoose');
var async = require('async');
var User = require('./models/user').User;
//
// var user =  new User({
//     username: 'Tania2',
//     password: 'secret'
// });
// user.save(function (err, user, affected) {
//     if (err) throw err;
//     User.findOne({username: "Tania"}, function (err, tester) {
//         console.log(tester);
//     })
// });
mongoose.connection.on('open', function () {
    var db = mongoose.connection.db;
    db.dropDatabase(function (err) {
        if (err) throw err;

        var olia =  new User({ username: 'Olia', password: 'secretOlia'});
        var solia =  new User({ username: 'Solia', password: 'secretSolia'});
        var vova =  new User({ username: 'Vova', password: 'secretVova'});

        mongoose.disconnect();

    });
});
