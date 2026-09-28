// FAN GALLERY

import request from 'superagent'
import { logError } from './api-utils'
import { GalleryImage, PostFanImageArgs } from '../../models/spam'

//GET IMAGES FOR FAN GALLERY
const rootUrl = '/api/v1'
export async function getFanImages() {
  return request
    .get(`${rootUrl}/gallery`)
    .then((res) => {
      return res.body.images as GalleryImage[]
    })
    .catch(logError)
}

// POST IMAGES TO FAN GALLERY

export async function postFanImage({
  image,
  caption,
  token,
}: PostFanImageArgs) {
  return request
    .post(`${rootUrl}/gallery`)
    .set('Authorization', `Bearer ${token}`)
    .field('caption', caption)
    .attach('image', image as unknown as import('buffer').Blob)
    .then((res) => res.body.newImage as GalleryImage)
    .catch(logError)
}
