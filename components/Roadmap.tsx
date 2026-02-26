'use client'

import React, { useRef, useEffect, useState } from 'react'
import { useInView } from '@/lib/animations'
import styles from './Roadmap.module.css'

interface RoadmapItem {
    id: number
    date: string
    title: string
    description: string
    tags: string[]
    status: 'completed' | 'in-progress' | 'upcoming' | 'gold'
}

const roadmapItems: RoadmapItem[] = [
    {
        id: 1,
        date: 'Q1 2024',
        title: 'FeeOnTransfer Router',
        description: 'A specialized router for non-standard ERC20 tokens, such as reflection, rebase and elastic supply tokens.',
        tags: ['🚀 Starknet', '🏢 Swap'],
        status: 'completed'
    },
    {
        id: 2,
        date: 'Q2 2025',
        title: 'Flaunch-lazy-lp',
        description: 'A Uniswap hook that enables token creators to generate additional yield from creator rewards.',
        tags: ['🧪 Unichain', '🏆 IP'],
        status: 'completed'
    },
    {
        id: 3,
        date: 'Q4 2025',
        title: 'MidatoPay',
        description: 'Crypto payment system via QR focused on commerce with real-time conversion.',
        tags: ['🚀 Starknet', '🔒 QR Payment'],
        status: 'completed'
    },
    {
        id: 4,
        date: 'Q4 2025',
        title: 'Treazury',
        description: 'A post-quantum secure wallet designed for governments and enterprises.',
        tags: ['🚀 Starknet', '🔒 Privacy'],
        status: 'completed'
    },
    {
        id: 5,
        date: 'Q1 2026',
        title: 'Reflecter Labs Pre-Corporate',
        description: 'Foundation of a Latin American web3 laboratory focused on innovation and product creation.',
        tags: ['🚀 Starknet', '💡 Innovation', '🏢 Corporate'],
        status: 'gold'
    },
    {
        id: 6,
        date: 'Q1 2026',
        title: 'Open The Doorz',
        description: 'Enables banks to onboard users onto Starknet using only Google authentication.',
        tags: ['🚀 Starknet', '🔒 Privacy', '💡 Innovation'],
        status: 'completed'
    },
    {
        id: 7,
        date: 'Q1 2026',
        title: 'Encode Agents',
        description: 'AI agents and LLM-powered applications that help people stay aligned with their goals.',
        tags: ['📦 SDK', '🔓 Open Source', '💡 Innovation'],
        status: 'upcoming'
    },
    {
        id: 8,
        date: 'Q1 2026',
        title: 'ETH Global Defi',
        description: 'Join the largest Ethereum developer community to solve the challenges shaping Web3.',
        tags: ['🚀 Starknet', '💡 Innovation'],
        status: 'upcoming'
    },
    {
        id: 9,
        date: 'Q1 2026',
        title: 'Starknet {Re}Define',
        description: 'Build privacy-preserving solutions by scaling Bitcoin with cryptographic primitives.',
        tags: ['🚀 Starknet', '🔒 Privacy', '💡 Innovation'],
        status: 'upcoming'
    },
    {
        id: 10,
        date: 'Q1 2026',
        title: 'The MeedGemma',
        description: 'Build human-centered AI applications using MedGemma and other open models from Google.',
        tags: ['🚀 Google', '🏥 Health', '💡 Innovation'],
        status: 'upcoming'
    }
]

export default function Roadmap() {
    const scrollRef = useRef<HTMLDivElement>(null)
    const [canScrollLeft, setCanScrollLeft] = useState(false)
    const [canScrollRight, setCanScrollRight] = useState(true)
    const { ref: headerRef, isInView: headerInView } = useInView()

    useEffect(() => {
        const timer = setTimeout(() => {
            if (scrollRef.current) {
                // Scroll to the end to show the most recent items
                const container = scrollRef.current
                const maxScroll = container.scrollWidth - container.clientWidth
                container.scrollTo({
                    left: maxScroll,
                    behavior: 'smooth'
                })
            }
        }, 300)
        return () => clearTimeout(timer)
    }, [])

    const checkScroll = () => {
        if (scrollRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current
            setCanScrollLeft(scrollLeft > 0)
            setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10)
        }
    }

    useEffect(() => {
        const container = scrollRef.current
        if (container) {
            container.addEventListener('scroll', checkScroll, { passive: true })
            checkScroll()
        }
        return () => container?.removeEventListener('scroll', checkScroll)
    }, [])

    const scroll = (direction: 'left' | 'right') => {
        if (scrollRef.current) {
            const scrollAmount = 400
            scrollRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            })
        }
    }

    const completedCount = roadmapItems.filter(i => i.status === 'completed' || i.status === 'gold').length

    return (
        <section className={styles.section} id="roadmap">
            <div className={styles.bgDecoration} />
            
            <div className={styles.timelineWrapper}>
                <div 
                    className={styles.header}
                    ref={headerRef}
                    style={{
                        opacity: headerInView ? 1 : 0,
                        transform: headerInView ? 'translateY(0)' : 'translateY(30px)',
                        transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)'
                    }}
                >
                    <span className={styles.label}>Timeline</span>
                    <h2 className={styles.title}>Our Journey & Future</h2>
                    <p className={styles.subtitle}>
                        From our beginnings to our vision of the future. Find out where we are going to be participating this time.
                    </p>
                </div>

                <div className={styles.sliderWrapper}>
                    <button
                        className={`${styles.navBtn} ${styles.prevBtn} ${!canScrollLeft ? styles.disabled : ''}`}
                        onClick={() => scroll('left')}
                        aria-label="Scroll Left"
                    >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M15 18l-6-6 6-6" />
                        </svg>
                    </button>

                    <div className={styles.scrollContainer} ref={scrollRef}>
                        <div className={styles.timeline}>
                            {/* Progress Line */}
                            <div className={styles.progressLineBg} />
                            <div 
                                className={styles.progressLine}
                                style={{ width: `${(completedCount - 1) * 320 + 100}px` }}
                            />

                            {roadmapItems.map((item, index) => (
                                <RoadmapCard key={item.id} item={item} index={index} />
                            ))}
                        </div>
                    </div>

                    <button
                        className={`${styles.navBtn} ${styles.nextBtn} ${!canScrollRight ? styles.disabled : ''}`}
                        onClick={() => scroll('right')}
                        aria-label="Scroll Right"
                    >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M9 18l6-6-6-6" />
                        </svg>
                    </button>
                </div>

                {/* Scroll hint */}
                <div className={styles.scrollHint}>
                    <div className={styles.scrollLine} />
                    <span>Scroll to explore</span>
                </div>
            </div>
        </section>
    )
}

function RoadmapCard({ item, index }: { item: RoadmapItem; index: number }) {
    const { ref, isInView } = useInView()

    const statusConfig = {
        completed: { icon: '✓', color: '#22c55e', label: 'Completed' },
        'in-progress': { icon: '●', color: '#3b82f6', label: 'In Progress' },
        upcoming: { icon: '○', color: '#9ca3af', label: 'Upcoming' },
        gold: { icon: '★', color: '#f59e0b', label: 'Milestone' }
    }

    const config = statusConfig[item.status]

    return (
        <div
            ref={ref}
            id={`roadmap-item-${item.id}`}
            className={`${styles.item} ${styles[item.status]}`}
            style={{
                opacity: isInView ? 1 : 0,
                transform: isInView ? 'translateY(0)' : 'translateY(30px)',
                transition: `all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) ${index * 80}ms`
            }}
        >
            <div 
                className={styles.dot}
                style={{ background: config.color, boxShadow: `0 0 20px ${config.color}40` }}
            >
                <span style={{ color: config.color }}>{config.icon}</span>
            </div>

            <div className={styles.content}>
                <div className={styles.date}>
                    <span 
                        className={styles.statusBadge}
                        style={{ 
                            background: `${config.color}15`,
                            color: config.color 
                        }}
                    >
                        {config.label}
                    </span>
                    <span className={styles.dateText}>{item.date}</span>
                </div>
                <h3 className={styles.cardTitle}>{item.title}</h3>
                <p className={styles.description}>{item.description}</p>
                <div className={styles.tags}>
                    {item.tags.map((tag, i) => (
                        <span key={i} className={styles.tag}>{tag}</span>
                    ))}
                </div>
            </div>
        </div>
    )
}
