'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import styles from './StartProject.module.css'
import { supabase } from '@/lib/supabase'

// Image Carousel Component
const ImageCarousel = () => {
    const images = [
        '/images/start-project/tech_abstract_1.png',
        '/images/start-project/tech_abstract_2.png',
        '/images/start-project/tech_abstract_3.png'
    ]
    const [currentIndex, setCurrentIndex] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % images.length)
        }, 5000)
        return () => clearInterval(interval)
    }, [])

    return (
        <div className={styles.carousel}>
            {images.map((img, index) => (
                <div
                    key={index}
                    className={`${styles.slide} ${index === currentIndex ? styles.active : ''}`}
                    style={{ backgroundImage: `url(${img})` }}
                />
            ))}
            <div className={styles.overlay} />
        </div>
    )
}

// Main Page Component
export default function StartProjectPage() {
    const [hasStarted, setHasStarted] = useState(false)
    const [currentStep, setCurrentStep] = useState(0) // 0 = welcome, 1-6 = steps, 7 = success
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitError, setSubmitError] = useState<string | null>(null)
    const [formData, setFormData] = useState<any>({
        step1: {},
        step2: {},
        step3: {},
        step4: {},
        step5: {},
        step6: {}
    })

    const scrollContainerRef = useRef<HTMLDivElement>(null)

    // Helper to update form data
    const updateData = (step: string, field: string, value: any) => {
        setFormData((prev: any) => ({
            ...prev,
            [step]: {
                ...prev[step],
                [field]: value
            }
        }))
    }

    // Scroll to top when step changes
    const scrollToTop = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollTo({ top: 0, behavior: 'smooth' })
        }
    }

    // Navigation
    const startForm = () => {
        setHasStarted(true)
        setCurrentStep(1)
        scrollToTop()
    }

    const nextStep = () => {
        if (currentStep < 6) {
            setCurrentStep(currentStep + 1)
            scrollToTop()
        } else if (currentStep === 6) {
            // Submit and go to success
            handleSubmit()
        }
    }

    const prevStep = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1)
            scrollToTop()
        }
    }

    const handleSubmit = async () => {
        setIsSubmitting(true)
        setSubmitError(null)

        try {
            const { error } = await supabase
                .from('project_applications')
                .insert([
                    {
                        // Step 1
                        full_name: formData.step1.fullName,
                        email: formData.step1.email,
                        telegram: formData.step1.telegram,
                        wallet_address: formData.step1.wallet,
                        project_name: formData.step1.projectName,
                        website_url: formData.step1.website,
                        github_url: formData.step1.github,
                        twitter_url: formData.step1.twitter,
                        project_phase: formData.step1.phase,
                        blockchain: formData.step1.chain,
                        collaboration_types: formData.step1.collabTypes || [],
                        budget_range: formData.step1.budget,

                        // Step 2
                        smart_contract_language: formData.step2.language,
                        framework: formData.step2.framework,
                        contract_count: formData.step2.contractCount ? parseInt(formData.step2.contractCount) : null,
                        web3_patterns: formData.step2.patterns || [],
                        frontend_framework: formData.step2.frontend,

                        // Step 3
                        audit_status: formData.step3.auditStatus,
                        test_coverage: formData.step3.coverage ? parseInt(formData.step3.coverage) : null,

                        // Step 4
                        revenue_model: formData.step4.revenue || [],
                        token_status: formData.step4.tokenStatus,

                        // Step 5
                        founders_count: formData.step5.foundersCount ? parseInt(formData.step5.foundersCount) : null,
                        team_size: formData.step5.teamSize ? parseInt(formData.step5.teamSize) : null,
                        funding_status: formData.step5.fundingStatus,

                        // Step 6
                        terms_accepted: formData.step6.terms
                    }
                ])

            if (error) throw error

            setCurrentStep(7) // Success screen
            scrollToTop()
        } catch (error: any) {
            console.error('Error submitting application:', error)
            setSubmitError('There was an error submitting your application. Please try again.')
        } finally {
            setIsSubmitting(false)
        }
    }

    const resetForm = () => {
        setFormData({
            step1: {},
            step2: {},
            step3: {},
            step4: {},
            step5: {},
            step6: {}
        })
        setCurrentStep(0)
        setHasStarted(false)
        scrollToTop()
    }

    // --- Welcome Screen ---
    const renderWelcome = () => (
        <div className={styles.welcomeContainer}>
            <div className={styles.welcomeContent}>
                <div className={styles.welcomeBadge}>🚀 Project Application</div>
                <h1 className={styles.welcomeTitle}>Start Your Collaboration</h1>
                <p className={styles.welcomeSubtitle}>
                    We'll collect detailed information about your project to provide you with the best possible service and collaboration experience.
                </p>

                <div className={styles.welcomeInfo}>
                    <div className={styles.infoCard}>
                        <div className={styles.infoIcon}>⏱️</div>
                        <div>
                            <h3>Estimated Time</h3>
                            <p>Approximately 10 minutes</p>
                        </div>
                    </div>
                    <div className={styles.infoCard}>
                        <div className={styles.infoIcon}>📋</div>
                        <div>
                            <h3>6 Simple Steps</h3>
                            <p>Easy-to-follow questionnaire</p>
                        </div>
                    </div>
                    <div className={styles.infoCard}>
                        <div className={styles.infoIcon}>🔒</div>
                        <div>
                            <h3>Confidential</h3>
                            <p>Your data is safe with us</p>
                        </div>
                    </div>
                </div>

                <div className={styles.welcomeSteps}>
                    <h3>What we'll cover:</h3>
                    <ul>
                        <li>📝 Basic Information & Contact Details</li>
                        <li>⚙️ Technical Stack & Architecture</li>
                        <li>🔒 Security & Quality Assurance</li>
                        <li>💼 Business Model & Tokenomics</li>
                        <li>👥 Team & Funding Information</li>
                        <li>✅ Final Review & Submission</li>
                    </ul>
                </div>

                <button className={styles.startButton} onClick={startForm}>
                    Begin Application →
                </button>

                <p className={styles.welcomeNote}>
                    💡 <strong>Tip:</strong> Have your project documentation, GitHub repo, and team information ready for a smoother experience.
                </p>
            </div>
        </div>
    )

    // --- Success Screen ---
    const renderSuccess = () => (
        <div className={styles.successContainer}>
            <div className={styles.successContent}>
                <div className={styles.successIcon}>✅</div>
                <h2 className={styles.successTitle}>Application Submitted Successfully!</h2>
                <p className={styles.successMessage}>
                    Thank you for taking the time to share your project details with us. Our team will review your application and get back to you within 24-48 hours.
                </p>

                <div className={styles.successStats}>
                    <div className={styles.statItem}>
                        <div className={styles.statValue}>24-48h</div>
                        <div className={styles.statLabel}>Response Time</div>
                    </div>
                    <div className={styles.statItem}>
                        <div className={styles.statValue}>100%</div>
                        <div className={styles.statLabel}>Confidential</div>
                    </div>
                </div>

                <div className={styles.successActions}>
                    <h3>What's Next?</h3>
                    <p>Schedule a discovery call with our team to discuss your project in detail.</p>

                    <a
                        href="https://calendar.app.google/wArBbQyT49pLD45y8"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.calendarButton}
                    >
                        📅 Book a Discovery Call
                    </a>

                    <button
                        className={styles.downloadButton}
                        onClick={generateHTMLSummary}
                        type="button"
                    >
                        📄 Download Complete Summary
                    </button>

                    <button className={styles.restartButton} onClick={resetForm}>
                        🔄 Submit Another Application
                    </button>
                </div>

                <div className={styles.successFooter}>
                    <p>Questions? Reach us at <a href="mailto:contact@reflecterlabs.com">contact@reflecterlabs.com</a></p>
                </div>
            </div>
        </div>
    )

    // --- Render Steps (same as before) ---

    const renderStep1 = () => (
        <>
            <div className={styles.sectionHeader}>
                <h2 className={styles.stepTitle}>Step 1: Basic Information</h2>
                <p className={styles.stepDescription}>Let's start with your contact details and the core of your project.</p>
            </div>

            <div className={styles.section}>
                <div className={styles.sectionTitle}>Contact Information</div>
                <div className={styles.fieldGroup}>
                    <label className={styles.label}>Full Name <span className={styles.required}>*</span></label>
                    <input type="text" className={styles.input} placeholder="John Doe" value={formData.step1.fullName || ''} onChange={(e) => updateData('step1', 'fullName', e.target.value)} />
                </div>
                <div className={styles.fieldGroup}>
                    <label className={styles.label}>Corporate Email <span className={styles.required}>*</span></label>
                    <input type="email" className={styles.input} placeholder="john@company.com" value={formData.step1.email || ''} onChange={(e) => updateData('step1', 'email', e.target.value)} />
                </div>
                <div className={styles.fieldGroup}>
                    <label className={styles.label}>Telegram Handle</label>
                    <input type="text" className={styles.input} placeholder="@username" value={formData.step1.telegram || ''} onChange={(e) => updateData('step1', 'telegram', e.target.value)} />
                </div>
                <div className={styles.fieldGroup}>
                    <label className={styles.label}>Wallet Address <span className={styles.required}>*</span></label>
                    <input type="text" className={styles.input} placeholder="0x..." value={formData.step1.wallet || ''} onChange={(e) => updateData('step1', 'wallet', e.target.value)} />
                </div>
            </div>

            <div className={styles.section}>
                <div className={styles.sectionTitle}>Project Data</div>
                <div className={styles.fieldGroup}>
                    <label className={styles.label}>Project Name <span className={styles.required}>*</span></label>
                    <input type="text" className={styles.input} value={formData.step1.projectName || ''} onChange={(e) => updateData('step1', 'projectName', e.target.value)} />
                </div>
                <div className={styles.fieldGroup}>
                    <label className={styles.label}>Website URL <span className={styles.required}>*</span></label>
                    <input type="url" className={styles.input} placeholder="https://" value={formData.step1.website || ''} onChange={(e) => updateData('step1', 'website', e.target.value)} />
                </div>
                <div className={styles.fieldGroup}>
                    <label className={styles.label}>GitHub Repository <span className={styles.required}>*</span></label>
                    <input type="url" className={styles.input} placeholder="https://github.com/..." value={formData.step1.github || ''} onChange={(e) => updateData('step1', 'github', e.target.value)} />
                </div>
                <div className={styles.fieldGroup}>
                    <label className={styles.label}>Twitter/X URL</label>
                    <input type="url" className={styles.input} placeholder="https://x.com/..." value={formData.step1.twitter || ''} onChange={(e) => updateData('step1', 'twitter', e.target.value)} />
                </div>
            </div>

            <div className={styles.section}>
                <div className={styles.sectionTitle}>Current Status</div>
                <div className={styles.fieldGroup}>
                    <label className={styles.label}>Project Phase <span className={styles.required}>*</span></label>
                    <div className={styles.radioGrid}>
                        {['Idea/Concept', 'MVP in Dev', 'Testnet (Private)', 'Testnet (Public)', 'Mainnet', 'Scaling'].map(opt => (
                            <label key={opt} className={styles.radioCard}>
                                <input type="radio" name="phase" className={styles.optionInput} checked={formData.step1.phase === opt} onChange={() => updateData('step1', 'phase', opt)} />
                                <span className={styles.optionLabel}>{opt}</span>
                            </label>
                        ))}
                    </div>
                </div>
                <div className={styles.fieldGroup}>
                    <label className={styles.label}>Main Blockchain <span className={styles.required}>*</span></label>
                    <select className={styles.select} value={formData.step1.chain || ''} onChange={(e) => updateData('step1', 'chain', e.target.value)}>
                        <option value="">Select Chain</option>
                        <option value="Ethereum">Ethereum</option>
                        <option value="Starknet">Starknet</option>
                        <option value="Polygon">Polygon</option>
                        <option value="Arbitrum">Arbitrum</option>
                        <option value="Optimism">Optimism</option>
                        <option value="Solana">Solana</option>
                        <option value="Base">Base</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
            </div>

            <div className={styles.section}>
                <div className={styles.sectionTitle}>Collaboration & Budget</div>
                <div className={styles.fieldGroup}>
                    <label className={styles.label}>Collaboration Type (Select all that apply) <span className={styles.required}>*</span></label>
                    <div className={styles.checkboxGrid}>
                        {['🔍 Audit', '🏗️ Architecture', '💻 Dev', '💰 Tokenomics', '🎯 Marketing', '💼 Fundraising', '⚖️ Legal'].map(opt => (
                            <label key={opt} className={styles.checkboxCard}>
                                <input type="checkbox" className={styles.optionInput} checked={(formData.step1.collabTypes || []).includes(opt)} onChange={(e) => {
                                    const current = formData.step1.collabTypes || [];
                                    if (e.target.checked) updateData('step1', 'collabTypes', [...current, opt]);
                                    else updateData('step1', 'collabTypes', current.filter((x: string) => x !== opt));
                                }} />
                                <span className={styles.optionLabel}>{opt}</span>
                            </label>
                        ))}
                    </div>
                </div>
                <div className={styles.fieldGroup}>
                    <label className={styles.label}>Budget Range <span className={styles.required}>*</span></label>
                    <div className={styles.radioGrid}>
                        {['< $5k', '$5k - $20k', '$20k - $50k', '$50k - $100k', '$100k - $250k', '> $250k'].map(opt => (
                            <label key={opt} className={styles.radioCard}>
                                <input type="radio" name="budget" className={styles.optionInput} checked={formData.step1.budget === opt} onChange={() => updateData('step1', 'budget', opt)} />
                                <span className={styles.optionLabel}>{opt}</span>
                            </label>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )

    const renderStep2 = () => (
        <>
            <div className={styles.sectionHeader}>
                <h2 className={styles.stepTitle}>Step 2: Tech Stack</h2>
                <p className={styles.stepDescription}>Deep dive into your technical infrastructure.</p>
            </div>

            <div className={styles.section}>
                <div className={styles.sectionTitle}>Base Technology</div>
                <div className={styles.fieldGroup}>
                    <label className={styles.label}>Smart Contract Language <span className={styles.required}>*</span></label>
                    <div className={styles.radioGrid}>
                        {['Solidity', 'Cairo', 'Rust', 'Vyper', 'Move', 'Other'].map(opt => (
                            <label key={opt} className={styles.radioCard}>
                                <input type="radio" name="lang" className={styles.optionInput} checked={formData.step2.language === opt} onChange={() => updateData('step2', 'language', opt)} />
                                <span className={styles.optionLabel}>{opt}</span>
                            </label>
                        ))}
                    </div>
                </div>
                <div className={styles.fieldGroup}>
                    <label className={styles.label}>Framework <span className={styles.required}>*</span></label>
                    <select className={styles.select} value={formData.step2.framework || ''} onChange={(e) => updateData('step2', 'framework', e.target.value)}>
                        <option value="">Select Framework</option>
                        <option value="Hardhat">Hardhat</option>
                        <option value="Foundry">Foundry</option>
                        <option value="Scarb">Scarb (Cairo)</option>
                        <option value="Anchor">Anchor</option>
                    </select>
                </div>
            </div>

            <div className={styles.section}>
                <div className={styles.sectionTitle}>Complexity & Architecture</div>
                <div className={styles.fieldGroup}>
                    <label className={styles.label}>Est. Number of Smart Contracts</label>
                    <input type="number" className={styles.input} placeholder="e.g., 5" value={formData.step2.contractCount || ''} onChange={(e) => updateData('step2', 'contractCount', e.target.value)} />
                </div>
                <div className={styles.fieldGroup}>
                    <label className={styles.label}>DeFi/Web3 Patterns Used</label>
                    <div className={styles.checkboxGrid}>
                        {['AMM', 'Lending', 'Staking', 'Launchpad', 'Oracle', 'Bridge', 'NFT Market', 'DAO'].map(opt => (
                            <label key={opt} className={styles.checkboxCard}>
                                <input type="checkbox" className={styles.optionInput} checked={(formData.step2.patterns || []).includes(opt)} onChange={(e) => {
                                    const current = formData.step2.patterns || [];
                                    if (e.target.checked) updateData('step2', 'patterns', [...current, opt]);
                                    else updateData('step2', 'patterns', current.filter((x: string) => x !== opt));
                                }} />
                                <span className={styles.optionLabel}>{opt}</span>
                            </label>
                        ))}
                    </div>
                </div>
            </div>

            <div className={styles.section}>
                <div className={styles.sectionTitle}>Infrastructure</div>
                <div className={styles.fieldGroup}>
                    <label className={styles.label}>Frontend Framework</label>
                    <select className={styles.select} value={formData.step2.frontend || ''} onChange={(e) => updateData('step2', 'frontend', e.target.value)}>
                        <option value="">Select Frontend</option>
                        <option value="Next.js">Next.js</option>
                        <option value="React">React</option>
                        <option value="Vue">Vue</option>
                        <option value="Svelte">Svelte</option>
                        <option value="none">None (Contracts only)</option>
                    </select>
                </div>
            </div>
        </>
    )

    const renderStep3 = () => (
        <>
            <div className={styles.sectionHeader}>
                <h2 className={styles.stepTitle}>Step 3: Security & Quality</h2>
                <p className={styles.stepDescription}>Ensuring your project is safe and robust.</p>
            </div>
            <div className={styles.section}>
                <div className={styles.sectionTitle}>Audits</div>
                <div className={styles.fieldGroup}>
                    <label className={styles.label}>Have you performed security audits? <span className={styles.required}>*</span></label>
                    <div className={styles.radioGrid}>
                        {['Yes - Completed', 'Yes - In Progress', 'No - Planned', 'No - No plans'].map(opt => (
                            <label key={opt} className={styles.radioCard}>
                                <input type="radio" name="audit" className={styles.optionInput} checked={formData.step3.auditStatus === opt} onChange={() => updateData('step3', 'auditStatus', opt)} />
                                <span className={styles.optionLabel}>{opt}</span>
                            </label>
                        ))}
                    </div>
                </div>
            </div>
            <div className={styles.section}>
                <div className={styles.sectionTitle}>Testing</div>
                <div className={styles.fieldGroup}>
                    <label className={styles.label}>Test Coverage</label>
                    <input type="range" min="0" max="100" className={styles.rangeInput} value={formData.step3.coverage || 0} onChange={(e) => updateData('step3', 'coverage', e.target.value)} />
                    <div style={{ textAlign: 'right', color: 'var(--text)', fontWeight: 600 }}>{formData.step3.coverage || 0}%</div>
                </div>
            </div>
        </>
    )

    const renderStep4 = () => (
        <>
            <div className={styles.sectionHeader}>
                <h2 className={styles.stepTitle}>Step 4: Business Model</h2>
                <p className={styles.stepDescription}>How does your project generate value?</p>
            </div>
            <div className={styles.section}>
                <div className={styles.sectionTitle}>Revenue Model</div>
                <div className={styles.fieldGroup}>
                    <label className={styles.label}>Income Sources</label>
                    <div className={styles.checkboxGrid}>
                        {['Transaction Fees', 'Protocol Fees', 'Staking Rewards', 'NFT Sales', 'Subscriptions', 'Grants'].map(opt => (
                            <label key={opt} className={styles.checkboxCard}>
                                <input type="checkbox" className={styles.optionInput} checked={(formData.step4.revenue || []).includes(opt)} onChange={(e) => {
                                    const current = formData.step4.revenue || [];
                                    if (e.target.checked) updateData('step4', 'revenue', [...current, opt]);
                                    else updateData('step4', 'revenue', current.filter((x: string) => x !== opt));
                                }} />
                                <span className={styles.optionLabel}>{opt}</span>
                            </label>
                        ))}
                    </div>
                </div>
            </div>
            <div className={styles.section}>
                <div className={styles.sectionTitle}>Tokenomics</div>
                <div className={styles.fieldGroup}>
                    <label className={styles.label}>Do you have a native token?</label>
                    <div className={styles.radioGrid}>
                        {['Yes - Live', 'Yes - Testnet', 'Planned (<3mo)', 'Planned (3-12mo)', 'No'].map(opt => (
                            <label key={opt} className={styles.radioCard}>
                                <input type="radio" name="token" className={styles.optionInput} checked={formData.step4.tokenStatus === opt} onChange={() => updateData('step4', 'tokenStatus', opt)} />
                                <span className={styles.optionLabel}>{opt}</span>
                            </label>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )

    const renderStep5 = () => (
        <>
            <div className={styles.sectionHeader}>
                <h2 className={styles.stepTitle}>Step 5: Team & Funding</h2>
                <p className={styles.stepDescription}>Who is behind the project?</p>
            </div>
            <div className={styles.section}>
                <div className={styles.sectionTitle}>Founding Team</div>
                <div className={styles.fieldGroup}>
                    <label className={styles.label}>Number of Co-founders</label>
                    <input type="number" className={styles.input} placeholder="2" value={formData.step5.foundersCount || ''} onChange={(e) => updateData('step5', 'foundersCount', e.target.value)} />
                </div>
                <div className={styles.fieldGroup}>
                    <label className={styles.label}>Team Size</label>
                    <input type="number" className={styles.input} placeholder="8" value={formData.step5.teamSize || ''} onChange={(e) => updateData('step5', 'teamSize', e.target.value)} />
                </div>
            </div>
            <div className={styles.section}>
                <div className={styles.sectionTitle}>Funding</div>
                <div className={styles.fieldGroup}>
                    <label className={styles.label}>Have you raised capital?</label>
                    <div className={styles.radioGrid}>
                        {['Yes', 'Bootstrapped', 'In Progress'].map(opt => (
                            <label key={opt} className={styles.radioCard}>
                                <input type="radio" name="funding" className={styles.optionInput} checked={formData.step5.fundingStatus === opt} onChange={() => updateData('step5', 'fundingStatus', opt)} />
                                <span className={styles.optionLabel}>{opt}</span>
                            </label>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )

    // Generate HTML Summary
    const generateHTMLSummary = () => {
        const html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Project Application Summary - ${formData.step1.projectName || 'N/A'}</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: #fafafa; padding: 2rem; color: #000; }
        .container { max-width: 900px; margin: 0 auto; background: white; border-radius: 16px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); overflow: hidden; }
        .header { background: linear-gradient(135deg, #000 0%, #333 100%); color: white; padding: 3rem 2rem; text-align: center; }
        .header h1 { font-size: 2rem; margin-bottom: 0.5rem; }
        .header p { opacity: 0.9; font-size: 1rem; }
        .content { padding: 2rem; }
        .section { margin-bottom: 2.5rem; }
        .section-title { font-size: 1.3rem; font-weight: 700; margin-bottom: 1rem; padding-bottom: 0.5rem; border-bottom: 2px solid #e5e5e5; }
        .field { margin-bottom: 1rem; padding: 0.75rem; background: #fafafa; border-radius: 8px; }
        .field-label { font-weight: 600; color: #666; font-size: 0.85rem; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 0.25rem; }
        .field-value { font-size: 1rem; color: #000; }
        .badge { display: inline-block; padding: 0.25rem 0.75rem; background: #000; color: white; border-radius: 12px; font-size: 0.75rem; margin-right: 0.5rem; margin-bottom: 0.5rem; }
        .footer { background: #f5f5f5; padding: 1.5rem 2rem; text-align: center; color: #666; font-size: 0.9rem; }
        .timestamp { color: #999; font-size: 0.85rem; margin-top: 0.5rem; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Project Application Summary</h1>
            <p>Reflecter Labs - Web3 Development</p>
            <p class="timestamp">Generated: ${new Date().toLocaleString()}</p>
        </div>
        
        <div class="content">
            <!-- Step 1: Basic Information -->
            <div class="section">
                <div class="section-title">📝 Basic Information</div>
                <div class="field"><div class="field-label">Full Name</div><div class="field-value">${formData.step1.fullName || 'N/A'}</div></div>
                <div class="field"><div class="field-label">Email</div><div class="field-value">${formData.step1.email || 'N/A'}</div></div>
                <div class="field"><div class="field-label">Telegram</div><div class="field-value">${formData.step1.telegram || 'N/A'}</div></div>
                <div class="field"><div class="field-label">Wallet Address</div><div class="field-value">${formData.step1.wallet || 'N/A'}</div></div>
                <div class="field"><div class="field-label">Project Name</div><div class="field-value">${formData.step1.projectName || 'N/A'}</div></div>
                <div class="field"><div class="field-label">Website</div><div class="field-value">${formData.step1.website || 'N/A'}</div></div>
                <div class="field"><div class="field-label">GitHub</div><div class="field-value">${formData.step1.github || 'N/A'}</div></div>
                <div class="field"><div class="field-label">Twitter/X</div><div class="field-value">${formData.step1.twitter || 'N/A'}</div></div>
                <div class="field"><div class="field-label">Project Phase</div><div class="field-value">${formData.step1.phase || 'N/A'}</div></div>
                <div class="field"><div class="field-label">Main Blockchain</div><div class="field-value">${formData.step1.chain || 'N/A'}</div></div>
                <div class="field">
                    <div class="field-label">Collaboration Types</div>
                    <div class="field-value">${(formData.step1.collabTypes || []).map((t: string) => `<span class="badge">${t}</span>`).join('') || 'N/A'}</div>
                </div>
                <div class="field"><div class="field-label">Budget Range</div><div class="field-value">${formData.step1.budget || 'N/A'}</div></div>
            </div>

            <!-- Step 2: Tech Stack -->
            <div class="section">
                <div class="section-title">⚙️ Tech Stack</div>
                <div class="field"><div class="field-label">Smart Contract Language</div><div class="field-value">${formData.step2.language || 'N/A'}</div></div>
                <div class="field"><div class="field-label">Framework</div><div class="field-value">${formData.step2.framework || 'N/A'}</div></div>
                <div class="field"><div class="field-label">Number of Smart Contracts</div><div class="field-value">${formData.step2.contractCount || 'N/A'}</div></div>
                <div class="field">
                    <div class="field-label">DeFi/Web3 Patterns</div>
                    <div class="field-value">${(formData.step2.patterns || []).map((p: string) => `<span class="badge">${p}</span>`).join('') || 'N/A'}</div>
                </div>
                <div class="field"><div class="field-label">Frontend Framework</div><div class="field-value">${formData.step2.frontend || 'N/A'}</div></div>
            </div>

            <!-- Step 3: Security & Quality -->
            <div class="section">
                <div class="section-title">🔒 Security & Quality</div>
                <div class="field"><div class="field-label">Audit Status</div><div class="field-value">${formData.step3.auditStatus || 'N/A'}</div></div>
                <div class="field"><div class="field-label">Test Coverage</div><div class="field-value">${formData.step3.coverage || 0}%</div></div>
            </div>

            <!-- Step 4: Business Model -->
            <div class="section">
                <div class="section-title">💼 Business Model</div>
                <div class="field">
                    <div class="field-label">Income Sources</div>
                    <div class="field-value">${(formData.step4.revenue || []).map((r: string) => `<span class="badge">${r}</span>`).join('') || 'N/A'}</div>
                </div>
                <div class="field"><div class="field-label">Native Token Status</div><div class="field-value">${formData.step4.tokenStatus || 'N/A'}</div></div>
            </div>

            <!-- Step 5: Team & Funding -->
            <div class="section">
                <div class="section-title">👥 Team & Funding</div>
                <div class="field"><div class="field-label">Number of Co-founders</div><div class="field-value">${formData.step5.foundersCount || 'N/A'}</div></div>
                <div class="field"><div class="field-label">Team Size</div><div class="field-value">${formData.step5.teamSize || 'N/A'}</div></div>
                <div class="field"><div class="field-label">Funding Status</div><div class="field-value">${formData.step5.fundingStatus || 'N/A'}</div></div>
            </div>
        </div>

        <div class="footer">
            <p><strong>Reflecter Labs</strong> - Multi-chain Web3 Development</p>
            <p>This summary was generated automatically from your application.</p>
        </div>
    </div>
</body>
</html>
        `

        const blob = new Blob([html], { type: 'text/html' })
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `${formData.step1.projectName || 'project'}_application_summary.html`
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        URL.revokeObjectURL(url)
    }

    const renderStep6 = () => (
        <>
            <div className={styles.sectionHeader}>
                <h2 className={styles.stepTitle}>Step 6: Final Review</h2>
                <p className={styles.stepDescription}>Review your information before submitting.</p>
            </div>

            {/* Complete Summary */}
            <div className={styles.section}>
                <div className={styles.sectionTitle}>📝 Basic Information</div>
                <div className={styles.summaryGrid}>
                    <div className={styles.summaryItem}>
                        <span className={styles.summaryLabel}>Full Name:</span>
                        <span className={styles.summaryValue}>{formData.step1.fullName || 'N/A'}</span>
                    </div>
                    <div className={styles.summaryItem}>
                        <span className={styles.summaryLabel}>Email:</span>
                        <span className={styles.summaryValue}>{formData.step1.email || 'N/A'}</span>
                    </div>
                    <div className={styles.summaryItem}>
                        <span className={styles.summaryLabel}>Project Name:</span>
                        <span className={styles.summaryValue}>{formData.step1.projectName || 'N/A'}</span>
                    </div>
                    <div className={styles.summaryItem}>
                        <span className={styles.summaryLabel}>Blockchain:</span>
                        <span className={styles.summaryValue}>{formData.step1.chain || 'N/A'}</span>
                    </div>
                    <div className={styles.summaryItem}>
                        <span className={styles.summaryLabel}>Phase:</span>
                        <span className={styles.summaryValue}>{formData.step1.phase || 'N/A'}</span>
                    </div>
                    <div className={styles.summaryItem}>
                        <span className={styles.summaryLabel}>Budget:</span>
                        <span className={styles.summaryValue}>{formData.step1.budget || 'N/A'}</span>
                    </div>
                </div>
            </div>

            <div className={styles.section}>
                <div className={styles.sectionTitle}>⚙️ Tech Stack</div>
                <div className={styles.summaryGrid}>
                    <div className={styles.summaryItem}>
                        <span className={styles.summaryLabel}>Language:</span>
                        <span className={styles.summaryValue}>{formData.step2.language || 'N/A'}</span>
                    </div>
                    <div className={styles.summaryItem}>
                        <span className={styles.summaryLabel}>Framework:</span>
                        <span className={styles.summaryValue}>{formData.step2.framework || 'N/A'}</span>
                    </div>
                    <div className={styles.summaryItem}>
                        <span className={styles.summaryLabel}>Contracts:</span>
                        <span className={styles.summaryValue}>{formData.step2.contractCount || 'N/A'}</span>
                    </div>
                    <div className={styles.summaryItem}>
                        <span className={styles.summaryLabel}>Frontend:</span>
                        <span className={styles.summaryValue}>{formData.step2.frontend || 'N/A'}</span>
                    </div>
                </div>
            </div>

            <div className={styles.section}>
                <div className={styles.sectionTitle}>🔒 Security & Quality</div>
                <div className={styles.summaryGrid}>
                    <div className={styles.summaryItem}>
                        <span className={styles.summaryLabel}>Audit Status:</span>
                        <span className={styles.summaryValue}>{formData.step3.auditStatus || 'N/A'}</span>
                    </div>
                    <div className={styles.summaryItem}>
                        <span className={styles.summaryLabel}>Test Coverage:</span>
                        <span className={styles.summaryValue}>{formData.step3.coverage || 0}%</span>
                    </div>
                </div>
            </div>

            <div className={styles.section}>
                <div className={styles.sectionTitle}>💼 Business & Team</div>
                <div className={styles.summaryGrid}>
                    <div className={styles.summaryItem}>
                        <span className={styles.summaryLabel}>Token Status:</span>
                        <span className={styles.summaryValue}>{formData.step4.tokenStatus || 'N/A'}</span>
                    </div>
                    <div className={styles.summaryItem}>
                        <span className={styles.summaryLabel}>Team Size:</span>
                        <span className={styles.summaryValue}>{formData.step5.teamSize || 'N/A'}</span>
                    </div>
                    <div className={styles.summaryItem}>
                        <span className={styles.summaryLabel}>Funding:</span>
                        <span className={styles.summaryValue}>{formData.step5.fundingStatus || 'N/A'}</span>
                    </div>
                </div>
            </div>


            {/* Terms & Conditions */}
            <div className={styles.section}>
                <div className={styles.sectionTitle}>Terms & Conditions</div>
                <label className={styles.checkboxCard} style={{ width: '100%' }}>
                    <input type="checkbox" className={styles.optionInput} checked={formData.step6.terms || false} onChange={(e) => updateData('step6', 'terms', e.target.checked)} />
                    <span className={styles.optionLabel}>
                        I accept that Reflecter Labs reviews my information and contacts me. The information provided is accurate.
                    </span>
                </label>
            </div>
        </>
    )

    return (
        <div className={styles.container}>
            <div className={styles.leftPanel}>
                <ImageCarousel />
            </div>
            <div className={styles.rightPanel} ref={scrollContainerRef}>
                {currentStep === 0 ? (
                    // Welcome Screen
                    <>
                        <div className={styles.header}>
                            <Link href="/" className={styles.backButton}>
                                ← Go Home
                            </Link>
                        </div>
                        {renderWelcome()}
                    </>
                ) : currentStep === 7 ? (
                    // Success Screen
                    <>
                        <div className={styles.header}>
                            <Link href="/" className={styles.backButton}>
                                ← Go Home
                            </Link>
                        </div>
                        {renderSuccess()}
                    </>
                ) : (
                    // Form Steps
                    <>
                        <div className={styles.header}>
                            <Link href="/" className={styles.backButton}>
                                ← Go Back
                            </Link>
                            <div className={styles.stepsText}>
                                Step {currentStep} of 6
                            </div>
                        </div>

                        <div className={styles.formContainer}>
                            <div className={styles.progressContainer}>
                                <div className={styles.progressBar}>
                                    <div className={styles.progressFill} style={{ width: `${(currentStep / 6) * 100}%` }}></div>
                                </div>
                            </div>

                            {currentStep === 1 && renderStep1()}
                            {currentStep === 2 && renderStep2()}
                            {currentStep === 3 && renderStep3()}
                            {currentStep === 4 && renderStep4()}
                            {currentStep === 5 && renderStep5()}
                            {currentStep === 6 && renderStep6()}

                            <div className={styles.buttonGroup}>
                                <button
                                    className={styles.prevBtn}
                                    onClick={prevStep}
                                    disabled={currentStep === 1 || isSubmitting}
                                >
                                    ← Previous
                                </button>
                                <button
                                    className={styles.nextBtn}
                                    onClick={nextStep}
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? 'Submitting...' : (currentStep === 6 ? '🚀 Submit Application' : 'Next Step →')}
                                </button>
                            </div>
                            {submitError && (
                                <div style={{ color: 'red', marginTop: '1rem', textAlign: 'center', background: '#ffebee', padding: '10px', borderRadius: '8px' }}>
                                    {submitError}
                                </div>
                            )}
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}
