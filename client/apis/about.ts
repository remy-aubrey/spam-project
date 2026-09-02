// COMMENTS
import request from 'superagent'
import { AboutText, AboutImages } from '../../models/spam'
import { logError } from './api-utils'

const rootUrl = '/api/v1'

export async function getAboutText() {
  return request
    .get(`${rootUrl}/about/text`)
    .then((res) => res.body as AboutText[])
    .catch(logError)
}

export async function getAboutImages() {
  return request
    .get(`${rootUrl}/about/images`)
    .then((res) => res.body as AboutImages[])
    .catch(logError)
}
