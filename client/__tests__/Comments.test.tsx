// @vitest-environment jsdom

import { renderApp } from '../test-setup.tsx'
import { describe, it, expect } from 'vitest'
import nock from 'nock'

const TEST_SPAM_DATA = {
  id: 2,
  name: 'Spicy Spam',
  image: 'spicy_spam.jpeg',
  description: 'A fiery take on the classic.',
  flavour_profile: 'spicy',
}

const TEST_COMMENTS_DATA = [
  {
    id: 2,
    user_id: 'auth0|xxx456',
    spam_id: 2,
    comment_text: 'A bit too salty for my taste, but still good in a pinch.',
    // comment_text: 'testing',
    created_date: 1625249200,
  },
  {
    id: 8,
    user_id: 'auth0|xxx456',
    spam_id: 2,
    comment_text: 'Not my favorite flavor, but it\u2019s okay.',
    created_date: 1625767600,
  },
]

describe('<ListComments>', async () => {
  it('should render the correct comments for spamId 2', async () => {
    // ARRANGE
    const spamScope = nock('http://localhost')
      .get('/api/v1/spams/2')
      .reply(200, { spam: TEST_SPAM_DATA })

    const commentsScope = nock('http://localhost')
      .get('/api/v1/comments/2')
      .reply(200, { comments: TEST_COMMENTS_DATA })

    // ACT
    const { ...screen } = renderApp('/rate-spam/2/')
    const firstComment = await screen.findByText(
      /A bit too salty for my taste, but still good in a pinch\./i,
    )
    const secondComment = await screen.findByText(
      /Not my favorite flavor, but it\u2019s okay\./i,
    )

    // ASSERT
    expect(firstComment).toBeVisible()
    expect(secondComment).toBeVisible()

    expect(spamScope.isDone()).toBe(true)
    expect(commentsScope.isDone()).toBe(true)
  })
})
