import mongoose from 'mongoose'

const projcetsSchema = new mongoose.Schema({
  title: {
    type: String,
    require: true,
  },
  dec: {
    type: String,
    require: true,
  },
  link: {
    type: String,
    require: false,
  },
  git: {
    type: String,
    require: true,
  },
  demovideo: {
    type: String,
    require: false,
  },
  title: {
    type: [String],
    require: true,
  },
  id: {
    type: String,
    require: true,
  },
})
