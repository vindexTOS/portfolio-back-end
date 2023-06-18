import express from 'express'

import { PostSkill, upload } from '../controllers.js/SkillsController.js'

const SkillRouter = express.Router()

SkillRouter.route('/post').post(upload.single('file'), PostSkill)

export default SkillRouter
