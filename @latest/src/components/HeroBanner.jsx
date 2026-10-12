import { BookmarkPlus, Play, Star } from 'lucide-react'
import { motion } from 'framer-motion'
import { useWatchlist } from '../context/useWatchlist'

export default function HeroBanner({ movie, t, onSelectMovie }) {
  const { isSaved, toggleWatchlist } = useWatchlist()
  const saved = isSaved(movie.id)

  return (
    <section id="home" className="hero" style={{ backgroundImage: `url("${movie.backdrop}")` }}>
      <motion.div className="hero-content" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .65 }}>
        <div className="eyebrow"><span className="eyebrow-dot" />{t.heroLabel}</div>
        <h1>{movie.title}</h1>
        <div className="hero-meta">
          <span className="rating"><Star size={13} fill="currentColor" /> {movie.rating} IMDb</span><span className="divider" />
          <span>{movie.year}</span><span className="divider" /><span>{movie.duration}</span>
        </div>
        <div className="hero-tags">{movie.genres.map((genre) => <span key={genre}>{genre}</span>)}</div>
        <p className="hero-description">{movie.description}</p>
        <div className="hero-actions">
          <button className="primary-button" onClick={() => onSelectMovie(movie)}><Play size={15} fill="currentColor" />{t.watchTrailer}</button>
          <button className="secondary-button" onClick={() => toggleWatchlist(movie.id)}><BookmarkPlus size={15} />{saved ? t.removeFromList : t.addToList}</button>
        </div>
      </motion.div>
      <div className="hero-counter" aria-hidden="true"><span /><span /><span /></div>
    </section>
  )
}
