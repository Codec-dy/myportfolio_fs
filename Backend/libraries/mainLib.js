
const Database = require('./databaseConnection.js');
const Email = require('./email.js');
const dotenv = require('dotenv');
const dataModel = require('./dataModel.js');
const fileUpload = require('./fileUpload.js');
dotenv.config();
var lib = {}

lib.port = process.env.PORT
lib.database = Database
lib.email = Email
lib.getModel = dataModel
lib.fileUpload = fileUpload
module.exports = lib;