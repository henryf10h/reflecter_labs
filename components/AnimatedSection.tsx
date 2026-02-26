'use client'

import { useInView } from '@/lib/animations'
import { ReactNode } from 'react'

interface AnimatedSectionProps {
  children: ReactNode
  className?: string
  animation?: 'fadeInUp' | 'fadeInDown' | 'fadeInLeft' | 'fadeInRight' | 'scaleIn' | 'slideIn'
  delay?: number
  duration?: number
  once?: boolean
}

export default function AnimatedSection({
  children,
  className = '',
  animation = 'fadeInUp',
  delay = 0,
  duration = 700,
  once = true
}: AnimatedSectionProps) {
  const { ref, isInView } = useInView(once ? { threshold: 0.1 } : undefined)

  const animations = {
    fadeInUp: 'translate-y-8 opacity-0',
    fadeInDown: '-translate-y-8 opacity-0',
    fadeInLeft: '-translate-x-8 opacity-0',
    fadeInRight: 'translate-x-8 opacity-0',
    scaleIn: 'scale-95 opacity-0',
    slideIn: 'translate-y-4 opacity-0'
  }

  return (
    <div
      ref={ref}
      className={`transition-all ease-out ${className}`}
      style={{
        transform: isInView ? 'translate(0, 0) scale(1)' : undefined,
        opacity: isInView ? 1 : undefined,
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`,
        ...(isInView ? {} : {
          transform: animations[animation].includes('translate') 
            ? animations[animation].includes('y-8') 
              ? 'translateY(2rem)' 
              : animations[animation].includes('-y-8')
                ? 'translateY(-2rem)'
                : animations[animation].includes('x-8')
                  ? 'translateX(2rem)'
                  : 'translateX(-2rem)'
            : animations[animation].includes('scale')
              ? 'scale(0.95)'
              : undefined,
          opacity: 0
        })
      }}
    >
      {children}
    </div>
  )
}
