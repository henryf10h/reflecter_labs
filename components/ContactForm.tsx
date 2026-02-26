'use client'

import { useState } from 'react'
import { useInView } from '@/lib/animations'
import styles from './ContactForm.module.css'
import { insertContactLead, updateContactLeadAction } from '@/lib/supabase'

export default function ContactForm() {
    const { ref: sectionRef, isInView } = useInView()
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        company: '',
        serviceInterest: 'Smart Contracts & Project Development' as 'Smart Contracts & Project Development' | 'Research & Innovation',
        message: ''
    })
    const [status, setStatus] = useState<'idle' | 'loading' | 'choosing' | 'completed' | 'error'>('idle')
    const [errorMessage, setErrorMessage] = useState('')
    const [leadId, setLeadId] = useState<string | null>(null)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setStatus('loading')
        setErrorMessage('')

        try {
            const result = await insertContactLead({
                name: formData.name,
                email: formData.email,
                company: formData.company || undefined,
                service_interest: formData.serviceInterest,
                message: formData.message
            })

            if (result && result.id) {
                setLeadId(result.id)
            }

            setStatus('choosing')
            setFormData({
                name: '',
                email: '',
                company: '',
                serviceInterest: 'Smart Contracts & Project Development',
                message: ''
            })

        } catch (error: any) {
            console.error('Error submitting form:', error)
            setStatus('error')

            if (error?.code === '42501') {
                setErrorMessage('Database permission error. Please contact the administrator.')
            } else if (error?.message?.includes('row-level security')) {
                setErrorMessage('Security policy error. Please contact support.')
            } else {
                setErrorMessage(`Error: ${error?.message || 'Unknown error'}. Please try again.`)
            }

            setTimeout(() => setStatus('idle'), 8000)
        }
    }

    const handleAction = async (action: boolean) => {
        if (action) {
            window.open('https://wa.me/5491173661972', '_blank')
        } else {
            window.open('https://calendar.app.google/wArBbQyT49pLD45y8', '_blank')
        }

        if (leadId) {
            try {
                await updateContactLeadAction(leadId, action)
            } catch (err) {
                console.error('Error updating action choice:', err)
            }
        }

        setStatus('completed')
    }

    const handleNewMessage = () => {
        setStatus('idle')
        setLeadId(null)
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    return (
        <section className={styles.section} id="contact" ref={sectionRef}>
            <div className={styles.bgDecoration} />
            
            <div className={styles.container}>
                <div 
                    className={styles.header}
                    style={{
                        opacity: isInView ? 1 : 0,
                        transform: isInView ? 'translateY(0)' : 'translateY(30px)',
                        transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)'
                    }}
                >
                    <span className={styles.label}>Get in Touch</span>
                    <h2 className={styles.title}>Let&apos;s Build Together</h2>
                    <p className={styles.subtitle}>
                        Ready to bring your Web3 project to life? Get in touch with our team 
                        and let&apos;s discuss how we can help you build the future.
                    </p>
                </div>

                <div className={styles.content}>
                    <div 
                        className={styles.info}
                        style={{
                            opacity: isInView ? 1 : 0,
                            transform: isInView ? 'translateX(0)' : 'translateX(-30px)',
                            transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 0.2s'
                        }}
                    >
                        <div className={styles.benefits}>
                            <div className={styles.benefit}>
                                <div className={styles.iconWrapper}>
                                    <span className={styles.icon}>⚡</span>
                                </div>
                                <div className={styles.benefitContent}>
                                    <h4>Fast Response</h4>
                                    <p>We&apos;ll get back to you within 24 hours</p>
                                </div>
                            </div>
                            <div className={styles.benefit}>
                                <div className={styles.iconWrapper}>
                                    <span className={styles.icon}>🔒</span>
                                </div>
                                <div className={styles.benefitContent}>
                                    <h4>Confidential</h4>
                                    <p>Your information is safe with us</p>
                                </div>
                            </div>
                            <div className={styles.benefit}>
                                <div className={styles.iconWrapper}>
                                    <span className={styles.icon}>💡</span>
                                </div>
                                <div className={styles.benefitContent}>
                                    <h4>Free Consultation</h4>
                                    <p>No commitment, just valuable insights</p>
                                </div>
                            </div>
                        </div>

                        <div className={styles.contactInfo}>
                            <div className={styles.contactItem}>
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                                    <polyline points="22,6 12,13 2,6" />
                                </svg>
                                <span>hello@reflecterlabs.xyz</span>
                            </div>
                            <div className={styles.contactItem}>
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                                    <circle cx="12" cy="10" r="3" />
                                </svg>
                                <span>Latin America</span>
                            </div>
                        </div>
                    </div>

                    <form 
                        className={styles.form}
                        onSubmit={handleSubmit}
                        style={{
                            opacity: isInView ? 1 : 0,
                            transform: isInView ? 'translateX(0)' : 'translateX(30px)',
                            transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 0.3s'
                        }}
                    >
                        <div className={styles.formGlow} />
                        
                        {status === 'idle' || status === 'loading' || status === 'error' ? (
                            <>
                                <div className={styles.formRow}>
                                    <div className={styles.formGroup}>
                                        <label htmlFor="name">Name *</label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                            placeholder="John Doe"
                                        />
                                    </div>

                                    <div className={styles.formGroup}>
                                        <label htmlFor="email">Email *</label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                            placeholder="john@example.com"
                                        />
                                    </div>
                                </div>

                                <div className={styles.formRow}>
                                    <div className={styles.formGroup}>
                                        <label htmlFor="company">Company</label>
                                        <input
                                            type="text"
                                            id="company"
                                            name="company"
                                            value={formData.company}
                                            onChange={handleChange}
                                            placeholder="Your Company"
                                        />
                                    </div>

                                    <div className={styles.formGroup}>
                                        <label htmlFor="serviceInterest">Service Interest *</label>
                                        <select
                                            id="serviceInterest"
                                            name="serviceInterest"
                                            value={formData.serviceInterest}
                                            onChange={handleChange}
                                            required
                                            className={styles.select}
                                        >
                                            <option value="Smart Contracts & Project Development">
                                                Smart Contracts & Project Development
                                            </option>
                                            <option value="Research & Innovation">
                                                Research & Innovation
                                            </option>
                                        </select>
                                    </div>
                                </div>

                                <div className={styles.formGroup}>
                                    <label htmlFor="message">Message *</label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                        rows={5}
                                        placeholder="Tell us about your project..."
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className={styles.submitButton}
                                    disabled={status === 'loading'}
                                >
                                    {status === 'loading' ? (
                                        <>
                                            <span className={styles.spinner} />
                                            Sending...
                                        </>
                                    ) : status === 'error' ? (
                                        'Try Again'
                                    ) : (
                                        <>
                                            Send Message
                                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
                                            </svg>
                                        </>
                                    )}
                                </button>

                                {status === 'error' && errorMessage && (
                                    <p className={styles.errorMessage}>{errorMessage}</p>
                                )}
                            </>
                        ) : status === 'choosing' ? (
                            <div className={styles.successContainer}>
                                <div className={styles.successIcon}>✓</div>
                                <h3>Message Sent!</h3>
                                <p>Your message has been received. How would you like to continue?</p>
                                <div className={styles.successActions}>
                                    <button
                                        type="button"
                                        onClick={() => handleAction(false)}
                                        className={styles.actionButton}
                                    >
                                        <span>📅</span>
                                        Book a Call
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => handleAction(true)}
                                        className={`${styles.actionButton} ${styles.whatsapp}`}
                                    >
                                        <span>💬</span>
                                        WhatsApp
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className={styles.successContainer}>
                                <div className={styles.successIcon}>🎉</div>
                                <h3>All Set!</h3>
                                <p>Thank you for reaching out. We&apos;ll get back to you within 24 hours.</p>
                                <button
                                    onClick={handleNewMessage}
                                    className={styles.newMessageButton}
                                >
                                    Send Another Message
                                </button>
                            </div>
                        )}
                    </form>
                </div>
            </div>
        </section>
    )
}
