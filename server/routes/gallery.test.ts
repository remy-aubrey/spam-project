// --- INTEGRATION TEST

import {
  describe,
  it,
  expect,
  beforeAll,
  beforeEach,
  afterAll,
  vi,
} from 'vitest'
import connection from '../db/connection.ts'
import server from '../server.ts'
import request from 'supertest'
import type { NextFunction, Request, Response } from 'express'

vi.mock('../cloudinary.ts', () => ({
  uploadImageBuffer: vi
    .fn()
    .mockResolvedValue('https://example.com/fake-image.jpg'),
}))

let testUserId: string

vi.mock('../auth0.ts', () => ({
  default: (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization
    if (!authHeader) {
      return res.status(401).send('Unauthorized')
    }
    ;(req as Request & { auth: { sub: string } }).auth = { sub: testUserId }
    next()
  },
}))

beforeAll(async () => {
  await connection.migrate.latest()
})

beforeEach(async () => {
  await connection.seed.run()

  const [user] = await connection('users').select('auth0_id').limit(1)
  testUserId = user.auth0_id
})

afterAll(async () => {
  await connection.destroy()
})

describe('gallery routes', () => {
  describe('GET /api/v1/gallery', () => {
    it('returns the seeded gallery images', async () => {
      const res = await request(server).get('/api/v1/gallery')

      expect(res.status).toBe(200)
      expect(res.body).toHaveProperty('images')
      expect(res.body.images.length).toBeGreaterThan(0)

      // Check against one known row from the gallery seed rather than
      // assuming row order, since insertion order isn't guaranteed
      // without an explicit ORDER BY.
      expect(res.body.images).toContainEqual(
        expect.objectContaining({
          image_url: 'https://picsum.photos/seed/spam-musubi/800/600',
          caption: 'Spam musubi, prepared with love and way too much rice',
        }),
      )
    })
  })

  describe('POST /api/v1/gallery', () => {
    it('returns 401 when no auth token is provided', async () => {
      const response = await request(server)
        .post('/api/v1/gallery')
        .attach('image', Buffer.from('fake image bytes'), 'photo.jpg')

      expect(response.status).toBe(401)
    })

    it('uploads a valid jpg and stores the mocked Cloudinary URL', async () => {
      const response = await request(server)
        .post('/api/v1/gallery')
        .set('Authorization', 'Bearer fake-token-for-testing')
        .field('caption', 'A cool photo')
        .attach('image', Buffer.from('fake image bytes'), {
          filename: 'photo.jpg',
          contentType: 'image/jpeg',
        })

      expect(response.status).toBe(201)
      expect(response.body).toHaveProperty('newImage')
      expect(response.body.newImage).toMatchObject({
        user_id: testUserId,
        image_url: 'https://example.com/fake-image.jpg',
        caption: 'A cool photo',
      })

      const rows = await connection('gallery').where({
        image_url: 'https://example.com/fake-image.jpg',
      })
      expect(rows).toHaveLength(1)
    })

    it('rejects a non-image file with 400', async () => {
      const response = await request(server)
        .post('/api/v1/gallery')
        .set('Authorization', 'Bearer fake-token-for-testing')
        .attach('image', Buffer.from('just some text'), {
          filename: 'notes.txt',
          contentType: 'text/plain',
        })

      expect(response.status).toBe(400)
    })

    it('rejects a file over the 5MB limit with 400', async () => {
      // 5MB limit set in server/middleware/upload.ts — send 1 byte over it.
      const oversizedBuffer = Buffer.alloc(5 * 1024 * 1024 + 1)

      const response = await request(server)
        .post('/api/v1/gallery')
        .set('Authorization', 'Bearer fake-token-for-testing')
        .attach('image', oversizedBuffer, {
          filename: 'huge.jpg',
          contentType: 'image/jpeg',
        })

      expect(response.status).toBe(400)
    })

    it('returns 400 when no file is attached at all', async () => {
      const response = await request(server)
        .post('/api/v1/gallery')
        .set('Authorization', 'Bearer fake-token-for-testing')
        .field('caption', 'Missing my photo')

      expect(response.status).toBe(400)
    })
  })
})
