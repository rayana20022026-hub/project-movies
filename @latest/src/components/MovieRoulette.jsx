import { useState } from 'react'
import { Dice5, Play, Shuffle, Sparkles, X } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'

export default function MovieRoulette({ movies, t, onSelect }) {
  const [spinning, setSpinning] = useState(false)
  const [pickedMovie, setPickedMovie] = useState(null)

  function pickMovie() {
    if (spinning || !movies.length) return
    setSpinning(true)
    window.setTimeout(() => {
      setPickedMovie(movies[Math.floor(Math.random() * movies.length)])
      setSpinning(false)
    }, 1100)
  }

  return (
    <>
      <motion.section className="roulette-banner" initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
        <motion.div className="roulette-icon" animate={spinning ? { rotate: 360 } : { rotate: 0 }} transition={spinning ? { duration: .45, repeat: 2 } : { duration: .2 }}>
          <Dice5 size={23} />
        </motion.div>
        <div className="roulette-copy"><h2>{t.rouletteTitle}</h2><p>{t.rouletteSubtitle}</p></div>
        <button className="roulette-button" onClick={pickMovie} disabled={spinning}>
          {spinning ? <Sparkles size={15} /> : <Shuffle size={15} />}{spinning ? t.loading : t.rouletteButton}
        </button>
      </motion.section>
      <AnimatePresence>
        {pickedMovie && (
          <motion.div className="roulette-overlay" onMouseDown={(event) => event.target === event.currentTarget && setPickedMovie(null)} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div className="roulette-result" initial={{ y: 18, scale: .95 }} animate={{ y: 0, scale: 1 }} exit={{ y: 12, scale: .98 }}>
              <div className="roulette-result-head"><h2>{t.rouletteResult}</h2><button onClick={() => setPickedMovie(null)} aria-label={t.close}><X size={16} /></button></div>
              <div className="roulette-pick">
                <img src={pickedMovie.image} alt={`${pickedMovie.title} poster`} />
                <div><span className="eyebrow"><span className="eyebrow-dot" />{pickedMovie.rating} IMDb · {pickedMovie.year}</span><h3>{pickedMovie.title}</h3><p>{pickedMovie.description}</p><button className="primary-button" onClick={() => { const movie = pickedMovie; setPickedMovie(null); onSelect(movie) }}><Play size={14} fill="currentColor" />{t.watchTrailer}</button></div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
