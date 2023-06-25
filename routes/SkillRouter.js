import express from 'express'

import {
  PostSkill,
  upload,
  getSKills,
  deleteSkill,
  updateSkill,
} from '../controllers.js/SkillsController.js'
import { authMiddleware } from '../MiddleWare/authMiddleWare.js'

const SkillRouter = express.Router()

SkillRouter.route('/post')
  .post(authMiddleware, upload.single('file'), PostSkill)
  .get(getSKills)
SkillRouter.route('/post/:id')
  .delete(authMiddleware, deleteSkill)
  .patch(upload.single('file'), updateSkill)

export default SkillRouter
