var mongoose = require("mongoose");
var Schema   = mongoose.Schema;

var RecordSchema = new Schema({
    title: String,
    name: String
});
mongoose.model('Record', RecordSchema);