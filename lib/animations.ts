'use client'

import { useEffect, useRef, useState, useCallback } from 'react'

// Hook para detectar cuando un elemento entra en el viewport
export function useInView(options?: IntersectionObserverInit) {
  const ref = useRef<HTMLDivElement>(null)
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsInView(true)
        // Una vez que se ha visto, dejar de observar
        if (ref.current) {
          observer.unobserve(ref.current)
        }
      }
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px',
      ...options
    })

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [options])

  return { ref, isInView }
}

// Hook para animación de contador
export function useCountUp(end: number, duration: number = 2000, startOnView: boolean = true) {
  const [count, setCount] = useState(0)
  const [hasStarted, setHasStarted] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!startOnView) {
      setHasStarted(true)
      return
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !hasStarted) {
        setHasStarted(true)
      }
    }, { threshold: 0.5 })

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [hasStarted, startOnView])

  useEffect(() => {
    if (!hasStarted) return

    let startTime: number
    let animationFrame: number

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      
      // Easing function (ease-out)
      const easeOut = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(easeOut * end))

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      }
    }

    animationFrame = requestAnimationFrame(animate)

    return () => cancelAnimationFrame(animationFrame)
  }, [hasStarted, end, duration])

  return { count, ref }
}

// Hook para parallax effect
export function useParallax(speed: number = 0.5) {
  const ref = useRef<HTMLDivElement>(null)
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return
      const rect = ref.current.getBoundingClientRect()
      const scrolled = window.scrollY
      const elementTop = rect.top + scrolled
      const relativeScroll = scrolled - elementTop + window.innerHeight
      setOffset(relativeScroll * speed * 0.1)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [speed])

  return { ref, offset }
}

// Hook para mouse parallax
export function useMouseParallax(intensity: number = 20) {
  const [position, setPosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * intensity
      const y = (e.clientY / window.innerHeight - 0.5) * intensity
      setPosition({ x, y })
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [intensity])

  return position
}

// Hook para staggered animations
export function useStaggeredAnimation(itemCount: number, baseDelay: number = 100) {
  const { ref, isInView } = useInView()
  
  const getDelay = useCallback((index: number) => {
    return isInView ? index * baseDelay : 0
  }, [isInView, baseDelay])

  return { ref, isInView, getDelay }
}

// Hook para smooth scroll
export function useSmoothScroll() {
  const scrollTo = useCallback((elementId: string) => {
    const element = document.getElementById(elementId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, [])

  return scrollTo
}

// Utility para generar clases de animación
export function getAnimationClasses(
  isInView: boolean,
  animation: 'fadeInUp' | 'fadeInDown' | 'fadeInLeft' | 'fadeInRight' | 'scaleIn' | 'slideIn' = 'fadeInUp',
  delay: number = 0
): string {
  const baseClasses = 'transition-all duration-700 ease-out'
  const hiddenState = {
    fadeInUp: 'opacity-0 translate-y-8',
    fadeInDown: 'opacity-0 -translate-y-8',
    fadeInLeft: 'opacity-0 -translate-x-8',
    fadeInRight: 'opacity-0 translate-x-8',
    scaleIn: 'opacity-0 scale-95',
    slideIn: 'opacity-0 translate-y-4'
  }
  const visibleState = {
    fadeInUp: 'opacity-100 translate-y-0',
    fadeInDown: 'opacity-100 translate-y-0',
    fadeInLeft: 'opacity-100 translate-x-0',
    fadeInRight: 'opacity-100 translate-x-0',
    scaleIn: 'opacity-100 scale-100',
    slideIn: 'opacity-100 translate-y-0'
  }

  return `${baseClasses} ${isInView ? visibleState[animation] : hiddenState[animation]}`
    .replace('duration-700', `duration-700`)
    .concat(delay > 0 ? ` delay-[${delay}ms]` : '')
}
