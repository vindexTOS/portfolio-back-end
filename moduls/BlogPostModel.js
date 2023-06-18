import mongoose from 'mongoose'

const BlogSchema = new mongoose.Schema({
  title: {
    type: String,
    require: true,
  },
  dec: {
    type: String,
    requrie: true,
  },
  img: {
    type: String,
    requrie: true,
  },
  time: {
    type: Date,
    default: new Date(),
  },
  type: {
    type: String,
    default: 'blog',
    requrie: true,
  },
})

export default mongoose.model('personal-blog', BlogSchema)

// {
//   "title":"title", "dec":"dec", "img":"img", "type":"type"
// }
