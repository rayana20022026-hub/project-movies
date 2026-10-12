import { useEffect, useMemo, useState } from 'react'
import { WatchlistContext } from './watchlistContextValue'

const STORAGE_KEY = 'cinema-watchlist'

function readWatchlist() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    const parsed = stored ? JSON.parse(stored) : []
    return Array.isArray(parsed) ? parsed.filter((id) => typeof id === 'string') : []
  } catch (error) {
    console.error('Could not read the saved watchlist.', error)
    return []
  }
}

export function WatchlistProvider({ children }) {
  const [watchlist, setWatchlist] = useState(readWatchlist)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(watchlist))
    } catch (error) {
      console.error('Could not save the watchlist.', error)
    }
  }, [watchlist])

  const value = useMemo(() => ({
    watchlist,
    isSaved: (id) => watchlist.includes(id),
    toggleWatchlist: (id) => setWatchlist((current) => current.includes(id)
      ? current.filter((savedId) => savedId !== id)
      : [...current, id]),
  }), [watchlist])

  return <WatchlistContext.Provider value={value}>{children}</WatchlistContext.Provider>
}
