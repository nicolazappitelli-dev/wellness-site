import { useEffect, useRef, useState } from 'react'

function prefersReducedMotion() {
  return typeof window !== 'undefined'
    && window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function isCoarsePointer() {
  return typeof window !== 'undefined'
    && window.matchMedia('(max-width: 768px), (hover: none)').matches
}

export default function Reveal({ children, delay = 0, className = '' }) {
  const ref = useRef(null)
  const skipAnim = prefersReducedMotion() || isCoarsePointer()
  const [visible, setVisible] = useState(skipAnim)

  useEffect(() => {
    if (skipAnim) return
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.unobserve(el)
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -12px 0px' }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [skipAnim])

  return (
    <div
      ref={ref}
      className={`reveal${visible ? ' reveal--visible' : ''} ${className}`.trim()}
      style={delay && !skipAnim ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  )
}
