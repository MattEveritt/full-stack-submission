const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
 content: String,
 blog: {
     type: mongoose.Schema.Types.ObjectId,
     ref: 'Comment',
 },
})

userSchema.set("toJSON", {
 transform: (document, returnedObject) => {
  returnedObject.id = returnedObject._id
  delete returnedObject._id
  delete returnedObject.__v
 },
})

module.exports = mongoose.model("Comment", userSchema)