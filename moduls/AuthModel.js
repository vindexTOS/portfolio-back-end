import mongoose from 'mongoose'

const authSchema = new mongoose.Schema({
  email: {
    type: String,
    require: true,
    trim: true,
  },
  password: {
    type: String,
    requrie: true,
  },
  role: {
    type: String,
    requrie: true,
  },
})

export default mongoose.model('admin', authSchema)
