import Header from '@/components/Header'
import Hero from '@/components/Hero'
import WhatWeDo from '@/components/WhatWeDo'
import Values from '@/components/Values'
import Achievements from '@/components/Achievements'
import Blockchains from '@/components/Blockchains'
import ContactForm from '@/components/ContactForm'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <WhatWeDo />
        <Values />
        <Achievements />
        <Blockchains />
        <ContactForm />
      </main>
      <Footer />
    </>
  )
}
