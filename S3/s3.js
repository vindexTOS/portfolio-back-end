import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
import { config } from 'dotenv'
import multer from 'multer'
import fs from 'fs'
import TestModel from '../moduls/TestModel.js'
config()

const bucketName = process.env.AWS_BUCKET_NAME
const accessKeyId = process.env.AWS_ACCESS_KEY
const secretAccessKey = process.env.AWS_SECRET_KEY

const s3 = new S3Client({
  region: 'eu-north-1',
  credentials: {
    accessKeyId,
    secretAccessKey,
  },
})

export const upload = multer({ dest: 'uploads/' })

export const uploadImage = async (req, res) => {
  console.log(req.file)

  const fileExtension = req.file.originalname.split('.').pop()
  const fileName = `image_${Date.now()}.${fileExtension}`

  const params = {
    Bucket: bucketName,
    Key: fileName,
    Body: fs.createReadStream(req.file.path),
    ContentType: 'image/jpeg', // Adjust the content type based on the file type being uploaded
  }

  try {
    const command = new PutObjectCommand(params)
    const { Location } = await s3.send(command)

    const photo = await TestModel.create({ url: Location })

    res.status(200).json({ message: 'Image uploaded successfully', photo })
  } catch (error) {
    console.error('Error uploading image:', error)
    res.status(500).json({ message: 'Error uploading image' })
  }
}
