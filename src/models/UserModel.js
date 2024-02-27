const mongoose = require("mongoose");
const DataSchema = mongoose.Schema({
  email: { type: String,unique: true},
  firstName: { type: String },
  lastName: { type: String },
  mobile: { type: String },
  password: { type: String },
  photo: { type: String },
  createdDate: { type: Date, default: Date.now() },
},
{
  versionkey: false
});
const UsersModel=mongoose.model('Users',DataSchema);
module.exports=UsersModel
