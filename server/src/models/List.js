const mongoose = require("mongoose");
const mongoosePaginate = require('mongoose-paginate-v2');

const ListSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    type: { type: String },
    genre: { type: String },
    content: { type: Array },
    view: { type: String },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null}
  },
  { timestamps: true }
);

ListSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("List", ListSchema);