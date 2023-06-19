import AuthModel from '../moduls/AuthModel.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { config } from 'dotenv'
config()
export const logIn = async (req, res) => {
  const { password, email } = req.body

  try {
    const user = await AuthModel.findOne({ email: email })

    if (!user) {
      return res.status(400).json({ msg: 'User Not Found' })
    }
    const isPasswordValid = bcrypt.compare(password, user.password)

    if (!isPasswordValid) {
      return res.status(401).json({ msg: 'invalid password' })
    }
    user.password = null
    const token = jwt.sign({ user }, process.env.JWT_STRING, {
      expiresIn: '1h',
    })
    res.set('Authorization', `Bearer ${token}`)
    return res.status(200).json({ token, user })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ msg: 'Interlan Error' })
  }
}
