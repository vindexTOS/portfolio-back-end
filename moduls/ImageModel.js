import mongoose, { mongo } from 'mongoose'

const ImgSchema = new mongoose.Schema({
  url: {
    type: String,
  },
})

export default mongoose.model('img-test', ImgSchema)
