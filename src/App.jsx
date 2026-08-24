import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, Link, Navigate, useLocation } from 'react-router-dom'
import Nav from './components/Nav'
import Footer from './components/Footer'
import Home from './pages/Home'
import Modalities from './pages/Modalities'
import Memberships from './pages/Memberships'
import Policies from './pages/Policies'
import Contact from './pages/Contact'
import './pages/SimplePages.css'

function ScrollToTop() {
  const location = useLocation()
  useEffect(() => {
    if (location.hash) return
    window.scrollTo(0, 0)
  }, [location.pathname])
  return null
}

// Handles cross-page hash navigation reliably (iOS Safari + Chrome)
function HashScrollHandler() {
  const location = useLocation()
  useEffect(() => {
    if (!location.hash) return
    const id = location.hash.slice(1)
    const scrollTo = () => {
      const el = document.getElementById(id)
      if (el) {
        const navHeight = 80
        const top = el.getBoundingClientRect().top + window.scrollY - navHeight
        window.scrollTo({ top, behavior: 'smooth' })
        return true
      }
      return false
    }
    // First attempt at 100ms; second attempt at 300ms covers slow mobile renders
    const t1 = setTimeout(() => {
      if (!scrollTo()) {
        setTimeout(scrollTo, 200)
      }
    }, 100)
    return () => clearTimeout(t1)
  }, [location])
  return null
}

function NotFound() {
  return (
    <main className="simple-page">
      <div className="simple-page__hero">
        <div className="container">
          <span className="section-label fade-up">404</span>
          <h1 className="simple-page__title fade-up-1">Page not found.</h1>
          <p className="simple-page__sub fade-up-2">
            That link doesn&apos;t exist. Head home or request a call so we can help you get started.
          </p>
          <div className="hero__ctas fade-up-3" style={{ marginTop: 28 }}>
            <Link to="/" className="btn-primary">Back Home</Link>
          </div>
        </div>
      </div>
    </main>
  )
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <HashScrollHandler />
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/modalities" element={<Modalities />} />
        <Route path="/memberships" element={<Memberships />} />
        <Route path="/booking" element={<Navigate to="/#inquiry" replace />} />
        <Route path="/account" element={<Navigate to="/#inquiry" replace />} />
        <Route path="/policies" element={<Policies />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
