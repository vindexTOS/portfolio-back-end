import express from 'express'
import cors from 'cors'
import { config } from 'dotenv'
import connectDB from './connect/connectDb.js'
import BlogPostRouter from './routes/BlogRouter.js'
import authRouter from './routes/AuthRouter.js'
import helmet from 'helmet'
const app = express()
config()
app.use(express.json())
app.use(helmet())
app.use(cors())
app.use('/blog', BlogPostRouter)
app.use('/auth', authRouter)
const port = 3000

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL)
    app.listen(port, () => {
      console.log(`port is listinign to ${port}`)
    })
  } catch (error) {
    console.log(error)
  }
}

start()
