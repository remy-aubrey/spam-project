// FAN GALLERY

import request from 'superagent'
// import { QuizQuestions, } from '../../models/spam'
import { logError } from './api-utils'
import { AddFanImage } from '../../models/spam'

//GET IMAGES FOR FAN GALLERY
const rootUrl = '/api/v1'
export async function getFanImages() {
  return request
    .get(`${rootUrl}/GALLERY`)
    .then((res) => {
      return res.body
    })
    .catch(logError)
}

// POST IMAGES TO FAN GALLERY
export async function postFanImage({ image, token }: AddFanImage) {
  return request
    .post(`${rootUrl}/gallery`)
    .set('Authorization', `Bearer ${token}`)
    .send({ image })
    .then((res) => res.body.image)
    .catch(logError)
}
