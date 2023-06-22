const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  postsId:{
    type : String,
    required : true,
  },
  userId:{
    type : String,
    required : true,
  },
  nickname:{
    type : String,
    required : true,
  },
  comment:{
    type : String,
  },
  createdAt:{
    type : String,
  },
  updatedAt:{
    type : String,
  },
});
commentSchema.set("timestamps", true);

module.exports = mongoose.model("comments", commentSchema);