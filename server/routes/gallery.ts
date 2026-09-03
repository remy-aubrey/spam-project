import { Router } from 'express'
import { upload } from '../upload'
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
  checkJwt,
  upload.single('image'),
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
      const imageUrl = await uploadImageBuffer(req.file.buffer)
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

export default router
