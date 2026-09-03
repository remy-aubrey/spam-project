import { ErrorRequestHandler, Router } from 'express'
import { upload } from '../middleware/upload.ts'
import { uploadImageBuffer } from '../cloudinary'
import { getAllGalleryImages, createGalleryImage } from '../db/queries/gallery'
import checkJwt from '../auth0'
import { JwtRequest } from '../auth0.ts'

const router = Router()

router.get('/', async (req, res) => {
  try {
    const images = await getAllGalleryImages()
    res.json({ images })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Oops could not fetch gallery images' })
  }
})

router.post(
  '/',
  checkJwt, //check if authorized first
  upload.single('image'), //parse file (multer requires it to ba named 'image')
  async (req: JwtRequest, res) => {
    const userId = req.auth?.sub

    if (!userId) {
      console.error('No auth0Id')
      return res.status(401).send('Unauthorized')
    }

    if (!req.file) {
      return res.status(400).json({ message: 'No image file provided' })
    }

    try {
      //send file and get url back from cloudinary
      const imageUrl = await uploadImageBuffer(req.file.buffer)
      //create gallery image from url
      const [newImage] = await createGalleryImage(
        userId,
        imageUrl,
        req.body.caption,
      )
      res.status(201).json({ newImage })
    } catch (error) {
      console.error(error)
      res.status(500).json({ message: 'Oops could not create gallery image' })
    }
  },
)

//catches errors that happen inside multer
const galleryErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  if (err) {
    return res.status(400).json({ error: err.message })
  }
  next()
}

router.use(galleryErrorHandler)

export default router
