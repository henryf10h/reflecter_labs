'use client'
import { useState } from 'react'
import styles from './ContactForm.module.css'
import { insertContactLead } from '@/lib/supabase'

export default function ContactForm() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        company: '',
        serviceInterest: 'Smart Contracts & Project Development' as 'Smart Contracts & Project Development' | 'Research & Innovation',
        message: ''
    })
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
    const [errorMessage, setErrorMessage] = useState('')

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setStatus('loading')
        setErrorMessage('')

        try {
            console.log('Saving to Supabase...', {
                name: formData.name,
                email: formData.email,
                service_interest: formData.serviceInterest
            })

            // Guardar en Supabase
            const result = await insertContactLead({
                name: formData.name,
                email: formData.email,
                company: formData.company || undefined,
                service_interest: formData.serviceInterest,
                message: formData.message
            })

            console.log('Successfully saved to Supabase:', result)

            // Marcar como éxito
            setStatus('success')
            setFormData({
                name: '',
                email: '',
                company: '',
                serviceInterest: 'Smart Contracts & Project Development',
                message: ''
            })

            // Mantener el mensaje de éxito visible
            // No auto-resetear a idle para que el usuario vea las opciones
        } catch (error: any) {
            console.error('Error submitting form:', error)
            console.error('Error details:', {
                message: error?.message,
                code: error?.code,
                details: error?.details,
                hint: error?.hint
            })

            setStatus('error')

            // Mensaje de error más específico
            if (error?.code === '42501') {
                setErrorMessage('Database permission error. Please contact the administrator to fix RLS policies.')
            } else if (error?.message?.includes('row-level security')) {
                setErrorMessage('Security policy error. Please disable RLS in Supabase or update the policies.')
            } else {
                setErrorMessage(`Error: ${error?.message || 'Unknown error'}. Please try again or contact us directly at contact@reflecterlabs.com`)
            }

            setTimeout(() => setStatus('idle'), 8000)
        }
    }

    const handleNewMessage = () => {
        setStatus('idle')
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    return (
        <section className={styles.section} id="contact">
            <div className={styles.container}>
                <div className={styles.content}>
                    <div className={styles.info}>
                        <h2 className={styles.title}>Let's Build Together</h2>
                        <p className={styles.description}>
                            Ready to bring your Web3 project to life? Get in touch with our team and let's discuss how we can help you build the future of decentralization.
                        </p>
                        <div className={styles.benefits}>
                            <div className={styles.benefit}>
                                <div className={styles.icon}>⚡</div>
                                <div>
                                    <h4>Fast Response</h4>
                                    <p>We'll get back to you within 24 hours</p>
                                </div>
                            </div>
                            <div className={styles.benefit}>
                                <div className={styles.icon}>🔒</div>
                                <div>
                                    <h4>Confidential</h4>
                                    <p>Your information is safe with us</p>
                                </div>
                            </div>
                            <div className={styles.benefit}>
                                <div className={styles.icon}>💡</div>
                                <div>
                                    <h4>Free Consultation</h4>
                                    <p>No commitment, just valuable insights</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <form className={styles.form} onSubmit={handleSubmit}>
                        {status !== 'success' ? (
                            <>
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

                                <div className={styles.formGroup}>
                                    <label htmlFor="company">Company *</label>
                                    <input
                                        type="text"
                                        id="company"
                                        name="company"
                                        value={formData.company}
                                        onChange={handleChange}
                                        required
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
                                    {status === 'loading' && <span className={styles.spinner}></span>}
                                    {status === 'idle' && 'Send Message'}
                                    {status === 'loading' && 'Sending...'}
                                    {status === 'error' && 'Try Again'}
                                </button>

                                {status === 'error' && errorMessage && (
                                    <p className={styles.errorMessage}>
                                        {errorMessage}
                                    </p>
                                )}
                            </>
                        ) : (
                            <div className={styles.successContainer}>
                                <p className={styles.successMessage}>
                                    ✓ Thank you! Your message has been received successfully.
                                    We'll get back to you within 24 hours.
                                </p>
                                <div className={styles.successActions}>
                                    <a
                                        href="https://wa.me/5491173661972"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={styles.whatsappButton}
                                    >
                                        💬 Contact via WhatsApp
                                    </a>
                                    <button
                                        onClick={handleNewMessage}
                                        className={styles.newMessageButton}
                                    >
                                        ✉️ Send Another Message
                                    </button>
                                </div>
                            </div>
                        )}
                    </form>
                </div>
            </div>
        </section>
    )
}
