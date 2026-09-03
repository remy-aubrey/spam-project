// @vitest-environment jsdom

import { describe, it, expect, beforeEach, beforeAll, afterAll } from 'vitest'
import '@testing-library/jest-dom/vitest'
import { render, screen } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import ResultPage from '../components/Quiz/ResultPage'
import nock from 'nock'
import superagent from 'superagent'
import { QuizAnswers } from '../../models/spam'

const TEST_ANSWERS: QuizAnswers = {
  a1: 'a',
  a2: 'a',
  a3: 'a',
  a4: null,
  a5: null,
}

const TEST_RESULT_DATA = {
  category: 'a',
  name: 'SPAM Classic',
  image: 'spam_classic_text.png',
  info: `Just like the original SPAM, you're reliable, timeless, and beloved by many. You have a strong sense of tradition and a knack for keeping things simple and straightforward. People know they can count on you, and your steady nature makes you a comforting presence in any situation. You value consistency and aren't afraid to embrace the tried and true.`,
}

const originalGet = superagent.get.bind(superagent)

beforeAll(() => {
  nock.disableNetConnect()

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  superagent.get = ((url: string, ...args: any[]) => {
    if (typeof url === 'string' && url.startsWith('/')) {
      return originalGet(`http://localhost${url}`, ...args)
    }
    return originalGet(url, ...args)
  }) as typeof superagent.get
})

afterAll(() => {
  superagent.get = originalGet
})

describe('<ResultPage />', () => {
  beforeEach(() => {
    nock('http://localhost')
      .get('/api/v1/spams')
      .reply(200, [])
      .persist()
  })

  it('Results render correctly', async () => {
    const scope = nock('http://localhost')
      .get('/api/v1/quiz/a')
      .reply(200, TEST_RESULT_DATA)

    const queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    })

    render(
      <QueryClientProvider client={queryClient}>
        <ResultPage answers={TEST_ANSWERS} />
      </QueryClientProvider>,
    )

    const heading = await screen.findByRole('heading', { level: 1 })
    const description = await screen.findByText(
      "Just like the original SPAM, you're reliable, timeless, and beloved by many. You have a strong sense of tradition and a knack for keeping things simple and straightforward. People know they can count on you, and your steady nature makes you a comforting presence in any situation. You value consistency and aren't afraid to embrace the tried and true."
    )
    const image = await screen.findByRole('img', { name: 'SPAM Classic' })

    expect(heading.textContent).toMatch('You are just like: SPAM Classic!')
    expect(description).toBeInTheDocument()
    expect(image).toHaveAttribute('src', '/images/hero_images/spam_classic_text.png')
    expect(scope.isDone()).toBe(true)
  })

  it('renders an error message when the API request fails', async () => {
    const errorScope = nock('http://localhost')
      .get('/api/v1/quiz/a')
      .reply(500)

    const queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    })

    render(
      <QueryClientProvider client={queryClient}>
        <ResultPage answers={TEST_ANSWERS} />
      </QueryClientProvider>,
    )

    const errMsg = await screen.findByText(/Error:/i)

    expect(errMsg).toBeInTheDocument()
    expect(errorScope.isDone()).toBe(true)
  })
})