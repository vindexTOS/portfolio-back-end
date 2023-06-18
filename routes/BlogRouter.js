import express from 'express'

import {
  PostBlog,
  GetPosts,
  DeletePost,
  EditPost,
} from '../controllers.js/BlogController.js'
import { uploadImg, getPhoto } from '../controllers.js/TestControllers.js'
import { uploadImage, upload } from '../S3/s3.js'
import { authMiddleware } from '../MiddleWare/authMiddleWare.js'
const router = express.Router()

router.route('/post').post(authMiddleware, PostBlog)
router
  .route('/post/:id')
  .delete(authMiddleware, DeletePost)
  .patch(authMiddleware, EditPost)
router.route('/').get(GetPosts)

router
  .route('/upload-img')
  .post(upload.single('file'), uploadImage)
  .get(getPhoto)
export default router
