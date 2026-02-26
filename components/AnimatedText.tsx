'use client'

import { useState, useEffect } from 'react'
import styles from './AnimatedText.module.css'

interface AnimatedTextProps {
  text: string
  className?: string
  delay?: number
  speed?: number
  once?: boolean
}

export default function AnimatedText({
  text,
  className = '',
  delay = 0,
  speed = 50,
  once = true
}: AnimatedTextProps) {
  const [displayText, setDisplayText] = useState('')
  const [hasStarted, setHasStarted] = useState(false)
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    const startTimeout = setTimeout(() => {
      setHasStarted(true)
    }, delay)

    return () => clearTimeout(startTimeout)
  }, [delay])

  useEffect(() => {
    if (!hasStarted) return

    let currentIndex = 0
    const interval = setInterval(() => {
      if (currentIndex <= text.length) {
        setDisplayText(text.slice(0, currentIndex))
        currentIndex++
      } else {
        setIsComplete(true)
        clearInterval(interval)
      }
    }, speed)

    return () => clearInterval(interval)
  }, [hasStarted, text, speed])

  return (
    <span className={`${styles.container} ${className}`}>
      {displayText}
      {!isComplete && hasStarted && <span className={styles.cursor}>|</span>}
    </span>
  )
}

// Componente para animar palabras individualmente
interface AnimatedWordsProps {
  text: string
  className?: string
  wordClassName?: string
  delay?: number
  staggerDelay?: number
}

export function AnimatedWords({
  text,
  className = '',
  wordClassName = '',
  delay = 0,
  staggerDelay = 100
}: AnimatedWordsProps) {
  const [isVisible, setIsVisible] = useState(false)
  const words = text.split(' ')

  useEffect(() => {
    const timeout = setTimeout(() => setIsVisible(true), delay)
    return () => clearTimeout(timeout)
  }, [delay])

  return (
    <span className={className}>
      {words.map((word, index) => (
        <span
          key={index}
          className={`${styles.word} ${wordClassName}`}
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
            transitionDelay: `${index * staggerDelay}ms`
          }}
        >
          {word}
          {index < words.length - 1 && '\u00A0'}
        </span>
      ))}
    </span>
  )
}

// Componente para revelar texto con máscara
interface RevealTextProps {
  children: string
  className?: string
  delay?: number
  duration?: number
}

export function RevealText({
  children,
  className = '',
  delay = 0,
  duration = 800
}: RevealTextProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timeout = setTimeout(() => setIsVisible(true), delay)
    return () => clearTimeout(timeout)
  }, [delay])

  return (
    <span
      className={`${styles.revealContainer} ${className}`}
      style={{
        clipPath: isVisible 
          ? 'inset(0 0 0 0)' 
          : 'inset(0 100% 0 0)',
        transition: `clip-path ${duration}ms cubic-bezier(0.77, 0, 0.175, 1)`,
        transitionDelay: `${delay}ms`
      }}
    >
      {children}
    </span>
  )
}
