import { beforeAll, beforeEach, afterAll, describe, expect, it, vi } from 'vitest'
import request from 'supertest'
import type { Request, Response, NextFunction } from 'express'

vi.mock('../auth0.ts', () => ({
  default: (req: Request, _res: Response, next: NextFunction) => {
    ;(req as Request & { auth?: { sub: string } }).auth = {
      sub: (req.headers['x-test-user'] as string) ?? 'auth0|xxx123',
    }
    next()
  },
}))

import connection from '../db/connection.ts'
import server from '../server.ts'

beforeAll(async () => {
  await connection.migrate.latest()
})

beforeEach(async () => {
  await connection.seed.run()
})

afterAll(async () => {
  await connection.destroy()
})

describe('DELETE /api/v1/comments/:id', () => {
  it('deletes a comment when the authenticated user is the owner', async () => {
    const response = await request(server)
      .delete('/api/v1/comments/1')
      .set('x-test-user', 'auth0|xxx123')

    expect(response.status).toBe(200)
    expect(await connection('comments').where({ id: 1 })).toHaveLength(0)
  })

  it('does not delete a comment owned by another user', async () => {
    const response = await request(server)
      .delete('/api/v1/comments/1')
      .set('x-test-user', 'auth0|xxx456')

    expect(response.status).toBe(403)
    expect(response.body).toEqual({
      message: 'Forbidden: You can only delete your own comment',
    })
    expect(await connection('comments').where({ id: 1 })).toHaveLength(1)
  })
})