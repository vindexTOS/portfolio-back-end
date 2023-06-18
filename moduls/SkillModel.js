import mongoose from 'mongoose'

const SkillSchema = new mongoose.Schema({
  title: {
    type: String,
    requried: true,
  },
  icon: {
    type: String,
    requried: true,
  },
  color: {
    type: String,
  },
  bgo: {
    type: String,
  },
})

export default mongoose.model('portfolio-skills', SkillSchema)
