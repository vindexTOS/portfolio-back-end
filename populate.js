import { config } from 'dotenv'
import connectDB from './connect/connectDb.js'
import AuthModel from './moduls/AuthModel.js'
import bcrypt from 'bcrypt'
config()

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL)
    await AuthModel.deleteMany()
    const password = await bcrypt.hash('', 10)
    await AuthModel.create({
      email: '',
      password: password,
      role: 'admin',
    })

    process.exit(0)
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}

// start()
