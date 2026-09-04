// @vitest-environment jsdom
import { render, screen, cleanup } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import * as matchers from '@testing-library/jest-dom/matchers'
import { useAuth0 } from '@auth0/auth0-react'
import LoginButton from './LoginButton'

expect.extend(matchers)

// Mock auth0 module cleanly
vi.mock('@auth0/auth0-react')

describe('LoginButton - Auth0 user name rendering', () => {
  beforeEach(() => {
    vi.resetAllMocks()
  })

  afterEach(() => {
    cleanup()
  })

  it('renders the Auth0 user nickname after login', async () => {
    const loginWithRedirect = vi.fn()

    vi.mocked(useAuth0).mockReturnValue({
      isAuthenticated: false,
      user: undefined,
      loginWithRedirect,
      logout: vi.fn(),
      getAccessTokenSilently: vi.fn(),
      getAccessTokenWithPopup: vi.fn(),
      getIdTokenClaims: vi.fn(),
      loginWithPopup: vi.fn(),
      isLoading: false,
    } as unknown as ReturnType<typeof useAuth0>)

    const { rerender } = render(<LoginButton />)

    await screen.getByRole('button', { name: /Sign in/i }).click()
    expect(loginWithRedirect).toHaveBeenCalledOnce()

    vi.mocked(useAuth0).mockReturnValue({
      isAuthenticated: true,
      user: {
        nickname: 'SpamMaster9000',
        sub: 'auth0|123456',
      },
      loginWithRedirect,
      logout: vi.fn(),
      getAccessTokenSilently: vi.fn(),
      getAccessTokenWithPopup: vi.fn(),
      getIdTokenClaims: vi.fn(),
      loginWithPopup: vi.fn(),
      isLoading: false,
    } as unknown as ReturnType<typeof useAuth0>)

    rerender(<LoginButton />)

    expect(screen.getByText(/Signed in as: SpamMaster9000/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Sign out/i })).toBeInTheDocument()
  })

  it('does not render user name when the user is signed out', () => {
    vi.mocked(useAuth0).mockReturnValue({
      isAuthenticated: false,
      user: undefined,
      loginWithRedirect: vi.fn(),
      logout: vi.fn(),
      getAccessTokenSilently: vi.fn(),
      getAccessTokenWithPopup: vi.fn(),
      getIdTokenClaims: vi.fn(),
      loginWithPopup: vi.fn(),
      isLoading: false,
    } as unknown as ReturnType<typeof useAuth0>)

    render(<LoginButton />)

    expect(screen.queryByText(/Signed in as:/i)).not.toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Sign in/i })).toBeInTheDocument()
  })
})