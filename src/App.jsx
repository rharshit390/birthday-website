import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import LandingPage from './components/LandingPage'
import BirthdayHero from './components/BirthdayHero'
import MemoriesTimeline from './components/MemoriesTimeline'
import GiftSection from './components/GiftSection'
import MiniGame from './components/MiniGame'
import FinalMessage from './components/FinalMessage'
import MusicController from './components/MusicController'

function App() {
  const [hasOpenedGift, setHasOpenedGift] = useState(false)
  const [gameWon, setGameWon] = useState(false)
  const [isGameStarted, setIsGameStarted] = useState(false)

  return (
    <div className="w-full min-h-screen">
      <MusicController isGameStarted={isGameStarted} />

      <AnimatePresence mode="wait">
        {!hasOpenedGift && (
          <LandingPage key="landing" onOpen={() => setHasOpenedGift(true)} />
        )}
      </AnimatePresence>

      {hasOpenedGift && (
        <main>
          <BirthdayHero />
          <MemoriesTimeline />
          <GiftSection />
          <MiniGame 
            onStart={() => setIsGameStarted(true)} 
            onWin={() => setGameWon(true)} 
          />
          <FinalMessage isUnlocked={gameWon} />
        </main>
      )}
    </div>
  )
}

export default App
