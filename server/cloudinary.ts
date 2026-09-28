import { v2 as cloudinary } from 'cloudinary'
import { Readable } from 'stream'

let configured = false

//makes sure API stuff gets configured first
function ensureConfigured() {
  if (configured) return

  //configure the SDK once
  //process env variables
  cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
  })

  configured = true
}

//receives the raw image bytes (buffer)
//cloudinary uploader creates a destination for that data
//readable.from(buffer) wraps the data in a readable stream
// .pipe connects the bytes from the readable stream into the writable one
export async function uploadImageBuffer(buffer: Buffer): Promise<string> {
  ensureConfigured()
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { resource_type: 'image' },
      (error, result) => {
        if (error) return reject(error)
        if (!result)
          return reject(new Error('Cloudinary upload returned no result'))
        resolve(result.secure_url)
      },
    )

    Readable.from(buffer).pipe(uploadStream)
  })
}

export default cloudinary
