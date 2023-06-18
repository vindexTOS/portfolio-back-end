import express from 'express'
import { logIn } from '../controllers.js/AuthController.js'

const authRouter = express.Router()

authRouter.route('/login').post(logIn)

export default authRouter
