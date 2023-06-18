import multer from 'multer'
import ImageModel from '../moduls/ImageModel.js'

const Storage = multer.diskStorage({
  destination: 'uploads',
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  },
})

const upload = multer({
  storage: Storage,
}).single('img')

export const uploadImg = async (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      console.log(err)
    } else {
      const newImage = new ImageModel({
        name: req.body.name,
        img: {
          data: req.file.filename,
          contentType: 'image/png',
        },
      })
      newImage
        .save()
        .then(() => res.send('succsessfully uploaded'))
        .catch((err) => console.log(err))
    }
  })
}

export const getPhoto = async (req, res) => {
  const data = await ImageModel.find({})

  return res.status(200).json(data)
}
