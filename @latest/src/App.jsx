import { WatchlistProvider } from './context/WatchlistContext'
import Home from './pages/Home'
import './App.css'

function App() {
  return (
    <WatchlistProvider>
      <Home />
    </WatchlistProvider>
  )
}

export default App
