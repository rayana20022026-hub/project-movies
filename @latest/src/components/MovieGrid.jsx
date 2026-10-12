import { Film } from 'lucide-react'
import { AnimatePresence } from 'framer-motion'
import MovieCard from './MovieCard'

export default function MovieGrid({ movies, onSelect, t, onReset }) {
  return (
    <div className="movie-grid">
      <AnimatePresence mode="popLayout">
        {movies.length ? movies.map((movie) => <MovieCard key={movie.id} movie={movie} onSelect={onSelect} />) : (
          <div className="empty-state" key="empty">
            <Film size={30} />
            <h3>{t.emptyTitle}</h3>
            <p>{t.emptyText}</p>
            <button onClick={onReset}>{t.reset}</button>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
