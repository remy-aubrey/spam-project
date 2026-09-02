import { useAuth0, User } from '@auth0/auth0-react'
import Button from '../UI/Button.tsx'
import { IfAuthenticated, IfNotAuthenticated } from './Authenticated.tsx'
import { unsetMarker } from '@tanstack/react-query'

function LoginButton() {
  // TODO: call the useAuth0 hook and destructure user, logout, and loginWithRedirect
  const { user, logout, loginWithRedirect } = useAuth0()

  // TODO: replace placeholder user object with the one from auth0
  const nickname = user?.nickname

  const handleSignOut = () => {
    logout()
  }

  const handleSignIn = () => {
    loginWithRedirect()
  }

  return (
    <>
      <IfAuthenticated>
        <Button onClick={handleSignOut}>Sign out</Button>
        {user && <p>Signed in as: {nickname}</p>}
      </IfAuthenticated>
      <IfNotAuthenticated>
        <Button onClick={handleSignIn}>Sign in</Button>
      </IfNotAuthenticated>
    </>
  )
}

export default LoginButton
