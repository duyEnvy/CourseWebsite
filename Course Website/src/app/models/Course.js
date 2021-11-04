const  mongoose  = require('mongoose')
const Schema = mongoose.Schema
const mongooseDelete = require('mongoose-delete');
const slug = require('mongoose-slug-generator')

const Course = new Schema({
  name: {type: String,require:true},
  description: {type: String,maxlength:600},
  image: {type: String,maxlength:255},
  level: {type: String, maxlength:600},
  videoId: {type: String, require:true},
  slug:{type: String,slug:"name",unique:true},
  deletedAt:{type: Date}
},{
  timestamps:true,
});

//add plugin
mongoose.plugin(slug)
Course.plugin(mongooseDelete, { overrideMethods: 'all' })

module.exports = mongoose.model('Course', Course)