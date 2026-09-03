// COMMENTS
import request from 'superagent'
import { AddComment, CommentData } from '../../models/spam'
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

export async function addComment(commentObj: AddComment) {
  const { comment, spamId, token } = commentObj

  return request
    .post(`${rootUrl}/comments/`)
    .set('Authorization', `Bearer ${token}`)
    .send({ comment, spamId })
    .then((res) => res.body as CommentData)
    .catch((err) => {
      logError(err)
      throw err
    })
}
