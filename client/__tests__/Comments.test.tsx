// @vitest-environment jsdom
import { renderApp } from '../test-setup.tsx'
import { describe, it, expect, beforeAll, vi, beforeEach } from 'vitest'
import nock from 'nock'
import { useAuth0 } from '@auth0/auth0-react'

vi.mock('@auth0/auth0-react')

const ACCESS_TOKEN = 'mock-access-token'
const newCommentText = 'This one is my new favourite!'

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

beforeAll(() => {
  nock.disableNetConnect()

  vi.spyOn(console, 'error').mockImplementation(() => {})
})

beforeEach(() => {
  vi.mocked(useAuth0).mockReturnValue({
    isAuthenticated: true,
    getAccessTokenSilently: vi.fn().mockResolvedValue(ACCESS_TOKEN),
    loginWithRedirect: vi.fn(),
    logout: vi.fn(),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } as any)
})

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

describe('<AddComment>', () => {
  it('should add a comment and show it in the list', async () => {
    // ARRANGE
    nock('http://localhost')
      .get('/api/v1/spams/2')
      .reply(200, { spam: { id: 2, name: 'Spicy Spam' } })

    nock('http://localhost')
      .get('/api/v1/comments/2')
      .reply(200, { comments: [] })

    const addScope = nock('http://localhost')
      .post('/api/v1/comments/', { comment: newCommentText, spamId: 2 })
      .reply(201)

    nock('http://localhost')
      .get('/api/v1/comments/2')
      .reply(200, {
        comments: [
          {
            id: 1,
            spam_id: 2,
            comment_text: newCommentText,
            created_date: Date.now(),
          },
        ],
      })
    // ACT
    const { user, ...screen } = renderApp('/rate-spam/2/')

    const commentInput = await screen.findByLabelText(/add a comment/i)
    await user.type(commentInput, newCommentText)

    const submitButton = screen.getByRole('button', { name: /submit/i })
    await user.click(submitButton)

    // ASSERT
    const newComment = await screen.findByText(newCommentText)
    expect(newComment).toBeVisible()
    expect(addScope.isDone()).toBe(true)
  })

  it('should show an error message when adding a comment fails', async () => {
    // ARRANGE
    nock('http://localhost')
      .get('/api/v1/spams/2')
      .reply(200, { spam: TEST_SPAM_DATA })

    nock('http://localhost')
      .get('/api/v1/comments/2')
      .reply(200, { comments: TEST_COMMENTS_DATA })

    const addScope = nock('http://localhost')
      .post('/api/v1/comments/', { comment: newCommentText, spamId: 2 })
      .reply(500)

    // ACT
    const { user, ...screen } = renderApp('/rate-spam/2/')

    const commentInput = await screen.findByLabelText(/add a comment/i)
    await user.type(commentInput, newCommentText)

    const submitButton = screen.getByRole('button', { name: /submit/i })
    await user.click(submitButton)

    // ASSERT
    const error = await screen.findByText(/something went wrong/i)

    expect(error).toBeVisible()
    expect(addScope.isDone()).toBe(true)
  })
})
