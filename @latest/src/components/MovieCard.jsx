import { Bookmark, Play, Star } from 'lucide-react'
import { motion } from 'framer-motion'
import { useWatchlist } from '../context/useWatchlist'

export default function MovieCard({ movie, onSelect }) {
  const { isSaved, toggleWatchlist } = useWatchlist()
  const saved = isSaved(movie.id)

  return (
    <motion.article className="movie-card" layout whileHover={{ y: -5 }} transition={{ duration: .2 }}>
      <div className="poster-wrap" onClick={() => onSelect(movie)} onKeyDown={(event) => event.key === 'Enter' && onSelect(movie)} role="button" tabIndex={0} aria-label={`View ${movie.title}`}>
        <img className="poster" src={movie.image} alt={`${movie.title} poster`} loading="lazy" />
        <span className="poster-rating"><Star size={10} fill="currentColor" />{movie.rating}</span>
        <button className={`card-bookmark${saved ? ' saved' : ''}`} onClick={(event) => { event.stopPropagation(); toggleWatchlist(movie.id) }} aria-label={saved ? 'Remove from watchlist' : 'Add to watchlist'}>
          <Bookmark size={14} fill={saved ? 'currentColor' : 'none'} />
        </button>
        <span className="poster-play"><Play size={18} fill="currentColor" /></span>
      </div>
      <div className="card-info" onClick={() => onSelect(movie)} role="button" tabIndex={0} onKeyDown={(event) => event.key === 'Enter' && onSelect(movie)}>
        <div className="card-title-row"><h3 className="card-title">{movie.title}</h3><span className="card-year">{movie.year}</span></div>
        <p className="card-genre">{movie.genres.join(' · ')}</p>
      </div>
    </motion.article>
  )
}
