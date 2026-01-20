'use client'

import React, { useRef, useEffect } from 'react'
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
        description: 'A specialized router for non-standard ERC20 tokens, such as reflection, rebase and elastic supply tokens, handling fee-on-transfer logic while ensuring compatibility with swaps, liquidity provision and on-chain integrations.',
        tags: ['🚀 Starknet', '🏢 Swap'],
        status: 'completed'
    },
    {
        id: 2,
        date: 'Q2 2025',
        title: 'Flaunch-lazy-lp',
        description: 'A Uniswap hook that enables token creators on Flaunch to generate additional yield from creator rewards by automatically providing liquidity into Uniswap pools with optimized and lazy LP strategies.',
        tags: ['🧪 Unichain', '🏆 Intelectual Property'],
        status: 'completed'
    },
    {
        id: 3,
        date: 'Q4 2025',
        title: 'MidatoPay',
        description: 'The merchant generates a QR code with the amount denominated in Argentine pesos and selects the desired cryptocurrency, allowing seamless payments with real-time conversion and simplified crypto adoption.',
        tags: ['🚀 Starknet', '🔒 QR Payment'],
        status: 'completed'
    },
    {
        id: 4,
        date: 'Q4 2025',
        title: 'Treazury',
        description: 'A post-quantum secure wallet designed for governments and enterprises, focused on institutional-grade security, long-term cryptographic resilience and compliance-ready digital asset management.',
        tags: ['🚀 Starknet', '🔒 Privacy'],
        status: 'completed'
    },
    {
        id: 5,
        date: 'Q1 2026',
        title: 'Reflecter Labs Pre-Corporate Agreement',
        description: 'Foundation of a Latin American web3 laboratory focused on innovation, product creation and competitive development through hackathons, market validation and active contribution to the Starknet ecosystem.',
        tags: ['🚀 Starknet', '🔒 Privacy', '💡 Innovation', '🏢 Corporate'],
        status: 'gold'
    },
    {
        id: 6,
        date: 'Q1 2026',
        title: 'Open The Doorz',
        description: 'Enables banks to onboard users onto Starknet without complex wallets, using only Google authentication, with no private key custody, zero gas fees and native access to decentralized lending solutions.',
        tags: ['🚀 Starknet', '🔒 Privacy', '💡 Innovation,', ' ⛓️‍💥 Infraestructure'],
        status: 'completed'
    },
    {
        id: 7,
        date: 'Q1 2026',
        title: 'Encode Agents',
        description: 'AI agents and LLM-powered applications that help people stay aligned with their goals. From productivity and healthier habits to smarter financial decisions, your code can transform short-term motivation into meaningful and lasting change.',
        tags: ['📦 SDK', '🔓 Open Source', '💡 Innovation,'],
        status: 'upcoming'
    },
    {
        id: 8,
        date: 'Q1 2026',
        title: 'ETH Global Defi',
        description: 'Is an event that brings together leading builders, researchers and experts from the Ethereum ecosystem. Join the largest Ethereum developer community to solve the challenges shaping the next evolution of Web3, build real projects with mentors and present them to industry leaders.',
        tags: ['🚀 Starknet', '🔒 Privacy', '💡 Innovation'],
        status: 'upcoming'
    },
    {
        id: 9,
        date: 'Q1 2026',
        title: 'Starknet {Re}Define',
        description: 'Build privacy-preserving solutions by scaling Bitcoin, leveraging cryptographic primitives and decentralized infrastructure to enable secure, censorship-resistant applications without compromising user sovereignty or transparency.',
        tags: ['🚀 Starknet', '🔒 Privacy', '💡 Innovation'],
        status: 'upcoming'
    },
    {
        id: 10,
        date: 'Q1 2026',
        title: 'The MeedGemma',
        description: 'Build human-centered AI applications using MedGemma and other open models from Google’s Health AI Developer Foundations (HAI-DEF), focusing on responsible, privacy-aware and scalable solutions for real-world healthcare use cases.',
        tags: ['🚀 Google', '🏥 BlessYou', '💡 Innovation'],
        status: 'upcoming'
    }

]

export default function Roadmap() {
    const scrollRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const timer = setTimeout(() => {
            if (scrollRef.current) {
                const targetItem = document.getElementById('roadmap-item-6')
                if (targetItem) {
                    const container = scrollRef.current
                    const itemLeft = targetItem.offsetLeft
                    const itemWidth = targetItem.offsetWidth
                    const containerWidth = container.clientWidth

                    const scrollPosition = itemLeft - (containerWidth / 2) + (itemWidth / 2)

                    container.scrollTo({
                        left: scrollPosition,
                        behavior: 'smooth'
                    })
                }
            }
        }, 500)
        return () => clearTimeout(timer)
    }, [])

    // Calculate the width of the green line dynamically
    // Width = (numCompleted - 1) * (CardWidth + Gap)
    // We calculate this directly on render to ensure it updates immediately if items change
    const completedCount = roadmapItems.filter(i => i.status === 'completed' || i.status === 'gold').length
    const progressWidth = completedCount > 1 ? (completedCount - 1) * 350 : 0

    const scroll = (direction: 'left' | 'right') => {
        if (scrollRef.current) {
            const { current } = scrollRef
            const scrollAmount = 350
            if (direction === 'left') {
                current.scrollBy({ left: -scrollAmount, behavior: 'smooth' })
            } else {
                current.scrollBy({ left: scrollAmount, behavior: 'smooth' })
            }
        }
    }

    return (
        <section className={styles.section} id="roadmap">
            <div className={styles.timelineWrapper}>
                <div className={styles.header}>
                    <h2 className="section-title">Our Journey & Future</h2>
                    <p className={styles.subtitle}>
                        From our beginnings to our vision of the future. Find out where we are going to be participating this time.
                    </p>
                </div>

                <div className={styles.sliderWrapper}>
                    <button
                        className={`${styles.navBtn} ${styles.prevBtn}`}
                        onClick={() => scroll('left')}
                        aria-label="Scroll Left"
                    >
                        ←
                    </button>

                    <div className={styles.scrollContainer} ref={scrollRef}>
                        <div className={styles.timeline}>
                            {/* Progress Line Background (Green) */}
                            <div
                                className={styles.progressLine}
                                style={{ width: `${progressWidth}px` }}
                            />

                            {roadmapItems.map((item) => (
                                <div
                                    key={item.id}
                                    id={`roadmap-item-${item.id}`}
                                    className={`${styles.item} ${styles[item.status]}`}
                                >
                                    <div className={styles.dot} />

                                    <div className={styles.content}>
                                        <div className={styles.date}>
                                            {(item.status === 'completed' || item.status === 'gold') && <span className={styles.statusIcon}>✔</span>}
                                            {item.status === 'in-progress' && <span className={styles.statusIcon}>🚧</span>}
                                            {item.status === 'upcoming' && <span className={styles.statusIcon}>📅</span>}
                                            {item.date}
                                        </div>
                                        <h3 className={styles.title}>{item.title}</h3>
                                        <p className={styles.description}>{item.description}</p>
                                        <div className={styles.tags}>
                                            {item.tags.map((tag, i) => (
                                                <span key={i} className={styles.tag}>{tag}</span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <button
                        className={`${styles.navBtn} ${styles.nextBtn}`}
                        onClick={() => scroll('right')}
                        aria-label="Scroll Right"
                    >
                        →
                    </button>
                </div>
            </div>
        </section>
    )
}
