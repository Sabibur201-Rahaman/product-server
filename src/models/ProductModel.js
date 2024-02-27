const mongoose = require("mongoose");

const DataSchema = mongoose.Schema(
  {
    title: { type: String },
    email: { type: String },
    description: { type: String },
    brand: { type: String },
    category: { type: String },
    createdDate: { type: Date, default: Date.now() },
  },
  {
    versionKey: false, 
  }
);


const ProductModel = mongoose.model("Products", DataSchema);

module.exports = ProductModel;
