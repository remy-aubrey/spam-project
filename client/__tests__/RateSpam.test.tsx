// @vitest-environment jsdom

import { describe, it, expect } from 'vitest'
import { renderApp } from '../test-setup'
import nock from 'nock'

describe('RateSpam', async () => {
  it('renders average rating for spam', async () => {
    //ARRANGE
    nock('http://localhost')
      .get('/api/v1/spams')
      .reply(200, {
        spams: [
          {
            id: 1,
            name: 'SPAM Classic',
            image: 'spam_classic_text.png',
          },
        ],
      })

    nock('http://localhost')
      .get('/api/v1/ratings/1')
      .reply(200, { rating: [{ average_rating: 5 }] })

    //ACT
    const { ...screen } = renderApp('/rate-spam')
    const heading = await screen.findByRole('img', { name: 'SPAM Classic' })

    //ASSERT
    const rating = await screen.findByRole('img', { name: '5 Stars' })
    expect(rating).toBeInTheDocument()
    expect(heading).toBeInTheDocument()
  })
})
