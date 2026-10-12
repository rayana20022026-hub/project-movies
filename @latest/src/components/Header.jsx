import { useEffect, useRef, useState } from 'react'
import { Bookmark, Clapperboard, Menu, Search, X } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'

export default function Header({ movies, language, setLanguage, t, onSelectMovie, onShowWatchlist, onNavigate }) {
  const [query, setQuery] = useState('')
  const [searchOpen, setSearchOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const searchRef = useRef(null)
  const results = query.trim()
    ? movies.filter((movie) => `${movie.title} ${movie.originalTitle}`.toLowerCase().includes(query.trim().toLowerCase())).slice(0, 5)
    : []

  useEffect(() => {
    function handleOutsideClick(event) {
      if (searchRef.current && !searchRef.current.contains(event.target)) setSearchOpen(false)
    }
    document.addEventListener('mousedown', handleOutsideClick)
    return () => document.removeEventListener('mousedown', handleOutsideClick)
  }, [])

  const navItems = [
    { label: t.navHome, filter: 'all' },
    { label: t.navMovies, filter: 'movie' },
    { label: t.navSeries, filter: 'series' },
    { label: t.navTrending, filter: 'trending' },
  ]

  function selectMovie(movie) {
    onSelectMovie(movie)
    setQuery('')
    setSearchOpen(false)
  }

  return (
    <header className="site-header">
      <a className="brand" href="#home" onClick={() => onNavigate('all')} aria-label="Cineva home">
        <span className="brand-mark"><Clapperboard size={18} strokeWidth={2.2} /></span>
        <span className="brand-name">cine<span>va</span></span>
      </a>
      <nav className="main-nav" aria-label="Main navigation">
        {navItems.map((item, index) => (
          <button className={index === 0 ? 'active' : ''} key={item.filter} onClick={() => onNavigate(item.filter)}>
            {item.label}
          </button>
        ))}
      </nav>
      <div className="header-tools">
        <div className="search-wrap" ref={searchRef}>
          <label className="search-box">
            <Search size={15} />
            <input
              value={query}
              onChange={(event) => { setQuery(event.target.value); setSearchOpen(true) }}
              onFocus={() => setSearchOpen(true)}
              placeholder={t.search}
              aria-label={t.search}
            />
            {query && <button type="button" className="header-icon" onClick={() => setQuery('')} aria-label={t.close}><X size={13} /></button>}
          </label>
          <AnimatePresence>
            {searchOpen && query.trim() && (
              <motion.div className="search-results" initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }}>
                {results.length ? results.map((movie) => (
                  <button className="search-result" key={movie.id} onClick={() => selectMovie(movie)}>
                    <img src={movie.image} alt="" />
                    <span><strong>{movie.title}</strong><small>{movie.year} · {movie.genres.join(', ')}</small></span>
                  </button>
                )) : <p className="search-no-results">{t.noResults}</p>}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <select className="lang-select" value={language} onChange={(event) => setLanguage(event.target.value)} aria-label="Interface language">
          <option value="ky">KY</option><option value="ru">RU</option><option value="en">EN</option>
        </select>
        <button className="watchlist-link" onClick={onShowWatchlist} aria-label={t.watchlist} title={t.watchlist}>
          <Bookmark size={16} />
        </button>
        <button className="mobile-menu" onClick={() => setMenuOpen((open) => !open)} aria-label="Toggle menu">
          {menuOpen ? <X size={19} /> : <Menu size={19} />}
        </button>
      </div>
      <AnimatePresence>
        {menuOpen && (
          <motion.nav className="mobile-menu-panel" initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }}>
            {navItems.map((item) => <button key={item.filter} onClick={() => { onNavigate(item.filter); setMenuOpen(false) }}>{item.label}</button>)}
            <button onClick={() => { onShowWatchlist(); setMenuOpen(false) }}>{t.myList}</button>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}
