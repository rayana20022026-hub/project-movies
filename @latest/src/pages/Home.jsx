import { useMemo, useState } from 'react'
import { Bookmark, Clapperboard } from 'lucide-react'
import Header from '../components/Header'
import HeroBanner from '../components/HeroBanner'
import MovieGrid from '../components/MovieGrid'
import MovieModal from '../components/MovieModal'
import MovieRoulette from '../components/MovieRoulette'
import { featuredMovie, genres, movies } from '../data/moviesData'
import { translations } from '../data/translations'
import { useWatchlist } from '../context/useWatchlist'

export default function Home() {
  const [language, setLanguage] = useState('ru')
  const [filter, setFilter] = useState('all')
  const [genre, setGenre] = useState('')
  const [selectedMovie, setSelectedMovie] = useState(null)
  const [showWatchlist, setShowWatchlist] = useState(false)
  const { watchlist } = useWatchlist()
  const t = translations[language]
  const tabs = [
    { id: 'all', label: t.all },
    { id: 'movie', label: t.movies },
    { id: 'series', label: t.series },
    { id: 'trending', label: t.trending },
    { id: 'top', label: t.topRated },
  ]

  const visibleMovies = useMemo(() => {
    let result = [...movies]
    if (showWatchlist) result = result.filter((movie) => watchlist.includes(movie.id))
    else if (filter === 'movie' || filter === 'series') result = result.filter((movie) => movie.type === filter)
    else if (filter === 'trending') result = result.filter((movie) => movie.year >= 2023)
    else if (filter === 'top') result = result.filter((movie) => movie.rating >= 8.5).sort((a, b) => b.rating - a.rating)
    if (genre) result = result.filter((movie) => movie.genres.includes(genre))
    return result
  }, [filter, genre, showWatchlist, watchlist])

  function navigateTo(nextFilter) {
    setShowWatchlist(false)
    setFilter(nextFilter)
    setGenre('')
    document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  function openWatchlist() {
    setShowWatchlist(true)
    setGenre('')
    document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  function resetFilters() {
    setShowWatchlist(false)
    setFilter('all')
    setGenre('')
  }

  return (
    <div className="app-shell">
      <Header movies={movies} language={language} setLanguage={setLanguage} t={t} onSelectMovie={setSelectedMovie} onShowWatchlist={openWatchlist} onNavigate={navigateTo} />
      <HeroBanner movie={featuredMovie} t={t} onSelectMovie={setSelectedMovie} />
      <main className="page-content">
        <MovieRoulette movies={movies} t={t} onSelect={setSelectedMovie} />
        <section id="catalog">
          <div className="section-heading">
            <div><h2>{showWatchlist ? t.myList : t.catalogTitle}</h2><p>{showWatchlist ? (visibleMovies.length ? `${visibleMovies.length} titles` : t.myListEmpty) : t.catalogSubtitle}</p></div>
            {showWatchlist && <Bookmark size={18} color="#eb334b" />}
          </div>
          <div className="catalog-controls">
            <div className="filter-tabs" role="tablist" aria-label="Catalog filters">
              {!showWatchlist && tabs.map((tab) => <button key={tab.id} role="tab" aria-selected={filter === tab.id} className={`filter-tab${filter === tab.id ? ' active' : ''}`} onClick={() => setFilter(tab.id)}>{tab.label}</button>)}
              {showWatchlist && <button className="filter-tab active" onClick={resetFilters}>{t.myList}</button>}
            </div>
            <select className="genre-select" value={genre} onChange={(event) => setGenre(event.target.value)} aria-label={t.genreAll}>
              <option value="">{t.genreAll}</option>{genres.slice(1).map((item) => <option key={item} value={item}>{item}</option>)}
            </select>
          </div>
          <MovieGrid movies={visibleMovies} onSelect={setSelectedMovie} t={t} onReset={resetFilters} />
        </section>
      </main>
      <footer className="footer"><span className="footer-brand"><Clapperboard size={14} style={{ verticalAlign: 'middle', marginRight: 6 }} />cineva</span><span>{t.footer} © 2025 Cineva</span><span>Made for movie lovers</span></footer>
      <MovieModal movie={selectedMovie} t={t} onClose={() => setSelectedMovie(null)} />
    </div>
  )
}
