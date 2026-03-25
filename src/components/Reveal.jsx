import { useEffect, useRef, useState } from 'react'

// Evaluated once at module load — no matchMedia calls on every render
const IS_MOBILE = typeof window !== 'undefined' && window.matchMedia('(max-width: 768px)').matches

export default function Reveal({ children, delay = 0, className = '' }) {
  const ref = useRef(null)
  // Mobile: start visible immediately — no IntersectionObserver, no animation
  const [visible, setVisible] = useState(IS_MOBILE)

  useEffect(() => {
    if (IS_MOBILE) return
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.unobserve(el)
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -16px 0px' }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={`reveal${visible ? ' reveal--visible' : ''} ${className}`.trim()}
      style={delay && !IS_MOBILE ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  )
}
