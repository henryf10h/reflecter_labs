import Header from '@/components/Header'
import Hero from '@/components/Hero'
import WhatWeDo from '@/components/WhatWeDo'
import Values from '@/components/Values'
import Achievements from '@/components/Achievements'
import Roadmap from '@/components/Roadmap'
import Blockchains from '@/components/Blockchains'
import ContactForm from '@/components/ContactForm'
import Footer from '@/components/Footer'
import AnimatedBackground from '@/components/AnimatedBackground'

export default function Home() {
  return (
    <>
      <AnimatedBackground />
      <Header />
      <main>
        <Hero />
        <WhatWeDo />
        <Blockchains />
        <Values />
        <Achievements />
        <Roadmap />
        <ContactForm />
      </main>
      <Footer />
    </>
  )
}
