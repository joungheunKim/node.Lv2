const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  userId :{
    type : String,
  },
  nickname:{
    type : String,
  },
  password :{
    type : String,
  },
  title:{
    type : String,
  },
  content:{
    type : String,
  },
  createdAt:{
    type : String,
  },
  updatedAt:{
    type : String,
  },
});
// 현재시간
postSchema.set("timestamps", true);

module.exports = mongoose.model("Posts", postSchema);