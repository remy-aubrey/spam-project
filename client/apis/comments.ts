// COMMENTS
import request from 'superagent'
import { CommentData } from '../../models/spam'
import { logError } from './api-utils'

const rootUrl = '/api/v1'

export async function getAllCommentsBySpamId(spamId: number) {
  return request
    .get(`${rootUrl}/comments/${spamId}`)
    .then((res) => {
      return res.body.comments as CommentData[]
    })
    .catch((error) => {
      logError(error)
      throw Error('Failed to fetch comments')
    })
}
