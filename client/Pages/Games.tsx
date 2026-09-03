import { useState } from 'react'
import SpamJump from '../components/Games/SpamJump'
import WhackASpam from '../components/Games/WhackASpam'
import Button from '../components/UI/Button'
import Snake from '../components/Games/Snake'

function Games() {
  const [activeGame, setActiveGame] = useState('')

  const games = ['Spam Jump', 'Whack-A-Spam', 'Snake']

  return (
    <>
      <section className="flex flex-col items-center justify-center p-5">
        <h1 className="mb-6 font-heading text-heading-lg font-heading-bold text-spamBlue">
          Choose a game!
        </h1>
        <nav className="mb-8 flex flex-wrap items-center justify-center gap-3">
          {games.map((game) => (
            <Button
              key={game}
              onClick={() => setActiveGame(game)}
              active={activeGame === game}
            >
              {game}
            </Button>
          ))}
        </nav>

        <main className="flex w-full max-w-2xl flex-col items-center justify-center rounded-lg border border-spamBlue p-4 sm:p-6">
          {!activeGame && (
            <p className="text-body-md">Pick a game above to get started!</p>
          )}
          {activeGame === 'Spam Jump' && <SpamJump />}
          {activeGame === 'Whack-A-Spam' && <WhackASpam />}
          {activeGame === 'Snake' && <Snake />}
        </main>
      </section>
    </>
  )
}

export default Games
