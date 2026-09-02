import Button from '../components/UI/Button'
import { Link } from 'react-router-dom'

export function ErrorFallback() {
  return (
    <div className="flex flex-col items-center justify-center p-8">
      <p>Something went wrong</p>
      <Link to="/">
        <Button>Home</Button>
      </Link>
    </div>
  )
}
