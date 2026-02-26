'use client'

import { useInView } from '@/lib/animations'
import { ReactNode, Children, cloneElement, isValidElement } from 'react'

interface StaggeredContainerProps {
  children: ReactNode
  className?: string
  staggerDelay?: number
  baseDelay?: number
  animation?: 'fadeInUp' | 'fadeInDown' | 'fadeInLeft' | 'fadeInRight' | 'scaleIn'
}

export default function StaggeredContainer({
  children,
  className = '',
  staggerDelay = 100,
  baseDelay = 0,
  animation = 'fadeInUp'
}: StaggeredContainerProps) {
  const { ref, isInView } = useInView()

  const animations = {
    fadeInUp: { transform: 'translateY(2rem)', opacity: 0 },
    fadeInDown: { transform: 'translateY(-2rem)', opacity: 0 },
    fadeInLeft: { transform: 'translateX(-2rem)', opacity: 0 },
    fadeInRight: { transform: 'translateX(2rem)', opacity: 0 },
    scaleIn: { transform: 'scale(0.9)', opacity: 0 }
  }

  const visibleStyle = {
    transform: 'translate(0, 0) scale(1)',
    opacity: 1
  }

  return (
    <div ref={ref} className={className}>
      {Children.map(children, (child, index) => {
        if (!isValidElement(child)) return child
        
        const delay = baseDelay + index * staggerDelay
        
        return (
          <div
            className="transition-all duration-700 ease-out"
            style={{
              ...animations[animation],
              ...(isInView ? {
                ...visibleStyle,
                transitionDelay: `${delay}ms`
              } : {})
            }}
          >
            {child}
          </div>
        )
      })}
    </div>
  )
}
