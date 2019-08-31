var mongoose = require('mongoose');

var options = {server: {socketOptions: {connectTimeoutMS: 60000}}};

mongoose.connect('mongodb://admin:admin@ds011258.mongolab.com:11258/ui-base', options);
//mongoose.connect('mongodb://localhost:27017/ui-base'); //TODO ONLY for Local INSTANCE MongoDB

var db = mongoose.connection;

db.on('error', function(err) {
    console.log('Error from mongoDB: ' + err.message);
});

db.once('open', function callback() {
    console.log('Connected to mongoDB');
});

var Schema = mongoose.Schema;

//---------------------------------------------------------------------------------------------
var Items = new Schema({
    id: {type: String, required: true},
    name: {type: String, required: true},
    phone: {type: String, required: true},
});

var ItemsModel = mongoose.model('Items', Items);
module.exports.ItemsModel = ItemsModel;

//---------------------------------------------------------------------------------------------
var Users = new Schema({
    id: {type: String, required: true},
    name: {type: String, required: true},
    pass: {type: String, required: true},
    description: {type: String, required: true},
});

var UsersModel = mongoose.model('Users', Users);
module.exports.UsersModel = UsersModel;

//---------------------------------------------------------------------------------------------
var Audit = new Schema({
    id: {type: String, required: true},
    name: {type: String, required: true},
    date: {type: String, required: true},
    ip: {type: String, required: true},
    description: {type: String, required: true},
});

var AuditModel = mongoose.model('Audit', Audit);
module.exports.AuditModel = AuditModel;
