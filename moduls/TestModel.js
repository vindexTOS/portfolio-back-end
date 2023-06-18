import mongoose, { mongo } from 'mongoose'

const TestModel = new mongoose.Schema({
  url: {
    type: String,
  },
})

export default mongoose.model('img-test', TestModel)
