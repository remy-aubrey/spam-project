import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'vitest'
import connection from '../connection.ts'
import { deleteCommentIfOwner } from './comments.ts'

beforeAll(async () => {
  await connection.migrate.latest()
})

beforeEach(async () => {
  await connection.seed.run()
})

afterAll(async () => {
  await connection.destroy()
})

describe('deleteCommentIfOwner', () => {
  it('deletes a comment when the user owns it', async () => {
    const deletedCount = await deleteCommentIfOwner(
      1,
      'auth0|xxx123',
      connection,
    )

    expect(deletedCount).toBe(1)

    const comments = await connection('comments').where({ id: 1 })
    expect(comments).toHaveLength(0)
  })

  it('does not delete a comment owned by another user', async () => {
    const deletedCount = await deleteCommentIfOwner(
      1,
      'auth0|xxx456',
      connection,
    )

    expect(deletedCount).toBe(0)

    const comments = await connection('comments').where({ id: 1 })
    expect(comments).toHaveLength(1)
  })
})