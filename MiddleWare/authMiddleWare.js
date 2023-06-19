import jwt from 'jsonwebtoken'
import AuthModel from '../moduls/AuthModel.js'
import { config } from 'dotenv'
config()
const verifyToken = async (token) => {
  console.log('error')
  console.log(token)
  if (!token) {
    throw new Error('No token')
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_STRING)
    const userId = decoded.user._id

    const user = await AuthModel.findById(userId)
    if (!user) {
      throw new Error('Invalid token')
    }
    return user
  } catch (error) {
    throw new Error(error.message)
  }
}

export const authMiddleware = async (req, res, next) => {
  console.log(req.header)
  try {
    // trim
    const token = req.header('Authorization').replace('Bearer', '').trim()
    // console.log(token)

    if (!token) {
      return res.status(401).json({ msg: 'No token' })
    }

    const user = await verifyToken(token)
    req.user = user
    next()
  } catch (error) {
    return res.status(401).json({ msg: error.message })
  }
}
