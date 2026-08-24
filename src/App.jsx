import { lazy, Suspense, useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import Nav from './components/Nav'
import Footer from './components/Footer'

const Home = lazy(() => import('./pages/Home'))
const Modalities = lazy(() => import('./pages/Modalities'))
const Memberships = lazy(() => import('./pages/Memberships'))
const Booking = lazy(() => import('./pages/Booking'))
const Account = lazy(() => import('./pages/Account'))
const Policies = lazy(() => import('./pages/Policies'))
const Contact = lazy(() => import('./pages/Contact'))

function ScrollToTop() {
  const location = useLocation()
  useEffect(() => {
    if (location.hash) return
    window.scrollTo(0, 0)
  }, [location.pathname])
  return null
}

function HashScrollHandler() {
  const location = useLocation()
  useEffect(() => {
    if (!location.hash) return
    const id = location.hash.slice(1)
    const scrollTo = () => {
      const el = document.getElementById(id)
      if (!el) return false
      const nav = document.querySelector('.nav')
      const navHeight = nav ? nav.getBoundingClientRect().height : 80
      const top = el.getBoundingClientRect().top + window.scrollY - navHeight
      window.scrollTo({ top, behavior: 'smooth' })
      return true
    }
    const t1 = setTimeout(() => {
      if (!scrollTo()) setTimeout(scrollTo, 200)
    }, 100)
    return () => clearTimeout(t1)
  }, [location])
  return null
}

function RouteFallback() {
  return <div className="route-fallback" aria-hidden="true" />
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <HashScrollHandler />
      <Nav />
      <Suspense fallback={<RouteFallback />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/modalities" element={<Modalities />} />
          <Route path="/memberships" element={<Memberships />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/account" element={<Account />} />
          <Route path="/policies" element={<Policies />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Suspense>
      <Footer />
    </BrowserRouter>
  )
}

export default App
