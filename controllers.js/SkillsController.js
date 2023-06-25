import SkillModel from '../moduls/SkillModel.js'
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
import { config } from 'dotenv'
import multer from 'multer'
import fs from 'fs'
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

// image upload middle ware for post skills in SkillsRotuer.js
export const upload = multer({ dest: 'uploads/' })
export const PostSkill = async (req, res) => {
  try {
    const { title, color, bgo } = req.body
    console.log(req.body)

    if (!title) {
      return res.status(400).json({ msg: 'Add Title' })
    }

    const fileExtension = req.file.originalname.split('.').pop()
    const fileName = `image_${Date.now()}.${fileExtension}`

    const params = {
      Bucket: bucketName,
      Key: fileName,
      Body: fs.createReadStream(req.file.path),
      ContentType: req.file.mimetype,
    }

    const command = new PutObjectCommand(params)
    const { Location } = await s3.send(command) // getting URL from S3 bucket
    console.log(Location)
    const photoURL = `https://${bucketName}.s3.amazonaws.com/${fileName}` // manualy creating link

    // Delete the file from the server after upload
    fs.unlinkSync(req.file.path)

    await SkillModel.create({ title, icon: photoURL, color, bgo })

    return res.status(200).json({ msg: 'Skill Added' })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ msg: 'Internal Server Error' })
  }
}

export const getSKills = async (req, res) => {
  try {
    let skills = await SkillModel.find({})

    if (!skills) {
      return res.status(400).json({ msg: 'Skills Is Empity ' })
    }
    skills = skills.reverse()
    return res.status(200).json(skills)
  } catch (error) {
    return res.status(500).json({ msg: 'Server Error 500' })
  }
}

export const deleteSkill = async (req, res) => {
  const { id } = req.params
  try {
    const isSkillExist = await SkillModel.findById({ _id: id })

    if (!isSkillExist) {
      return res
        .status(400)
        .json({ msg: `skill with id of ${id} does not exit` })
    }

    await SkillModel.findByIdAndDelete({ _id: id })

    return res.status(200).json({ msg: 'Skill Has Been Deleted' })
  } catch (error) {
    return res.status(500).json({ msg: 'Server Error', error: error.massage })
  }
}

export const updateSkill = async (req, res) => {
  const { id } = req.params
  try {
    const isSkillExist = await SkillModel.findById({ _id: id })
    if (!isSkillExist) {
      return res
        .status(400)
        .json({ msg: `skill with id of ${id} does not exit` })
    }

    if (req.file) {
      const fileExtension = req.file.originalname.split('.').pop()
      const fileName = `image_${Date.now()}.${fileExtension}`

      const params = {
        Bucket: bucketName,
        Key: fileName,
        Body: fs.createReadStream(req.file.path),
        ContentType: req.file.mimetype,
      }

      const command = new PutObjectCommand(params)
      const { Location } = await s3.send(command) // getting URL from S3 bucket

      const photoURL = `https://${bucketName}.s3.amazonaws.com/${fileName}` // manualy creating link

      // Delete the file from the server after upload
      fs.unlinkSync(req.file.path)
      await SkillModel.findByIdAndUpdate({ ...req.body, avatar: photoURL })
      return res.status(200).json({ msg: 'Skill Has Been Updated' })
    } else {
      await SkillModel.findByIdAndUpdate(req.body)
      return res.status(200).json({ msg: 'Skill Has Been Updated' })
    }
  } catch (error) {
    return res.status(500).json({ msg: 'Server Error', error: error.massage })
  }
}
