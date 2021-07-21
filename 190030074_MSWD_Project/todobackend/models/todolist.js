const mongoose = require('mongoose')
const todolistSchema= new mongoose.Schema({
     content:{
         type:String,
         required:true
     },
     important:Boolean,
     completed:Boolean,
     user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
      }
})

todolistSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })

  module.exports = mongoose.model('todolists',todolistSchema)