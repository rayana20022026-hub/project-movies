import { useEffect } from 'react'
import { BookmarkPlus, Check, Star, X } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import { useWatchlist } from '../context/useWatchlist'

export default function MovieModal({ movie, t, onClose }) {
  const { isSaved, toggleWatchlist } = useWatchlist()
  const saved = isSaved(movie?.id)

  useEffect(() => {
    if (!movie) return undefined
    function onKeyDown(event) { if (event.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKeyDown)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = ''
    }
  }, [movie, onClose])

  return (
    <AnimatePresence>
      {movie && (
        <motion.div className="modal-backdrop" onMouseDown={(event) => event.target === event.currentTarget && onClose()} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <motion.section className="movie-modal" role="dialog" aria-modal="true" aria-labelledby="movie-modal-title" initial={{ opacity: 0, y: 24, scale: .98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 18, scale: .98 }} transition={{ duration: .22 }}>
            <div className="modal-top">
              {movie.trailer
                ? <iframe src={`https://www.youtube-nocookie.com/embed/${movie.trailer}?autoplay=1&rel=0`} title={`${movie.title} trailer`} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen />
                : <img className="modal-image" src={movie.backdrop || movie.image} alt="" />}
              <button className="modal-close" onClick={onClose} aria-label={t.close}><X size={18} /></button>
            </div>
            <div className="modal-body">
              <div className="modal-title-row">
                <div>
                  <h2 id="movie-modal-title">{movie.title}</h2>
                  <div className="modal-meta"><span className="rating"><Star size={12} fill="currentColor" /> {movie.rating} IMDb</span><span>{movie.year}</span><span>{movie.duration}</span><span>{movie.genres.join(' · ')}</span></div>
                </div>
              </div>
              <p className="modal-description">{movie.description}</p>
              <div className="modal-details">
                <div><span className="modal-detail-label">{t.cast}</span><span className="modal-detail-value">{movie.cast}</span></div>
                <div><span className="modal-detail-label">{t.director}</span><span className="modal-detail-value">{movie.director}</span></div>
                <div><span className="modal-detail-label">{t.budget}</span><span className="modal-detail-value">{movie.budget}</span></div>
                <div><span className="modal-detail-label">{t.details}</span><span className="modal-detail-value">{movie.originalTitle}</span></div>
              </div>
              <div className="modal-footer">
                <button className="primary-button" onClick={() => toggleWatchlist(movie.id)}>{saved ? <Check size={15} /> : <BookmarkPlus size={15} />}{saved ? t.removeFromList : t.addToList}</button>
                <button className="secondary-button" onClick={onClose}>{t.close}</button>
              </div>
            </div>
          </motion.section>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
