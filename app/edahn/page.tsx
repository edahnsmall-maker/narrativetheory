import type { Metadata } from 'next'
import './deck.css'
import Deck from '@/components/edahn/Deck'

export const metadata: Metadata = {
  title: 'Edahn Small',
  description:
    'Therapist, dharma teacher, data designer, recovering lawyer. What I aspire to, what I care about, and what I can’t stop wondering about.',
  openGraph: {
    title: 'Edahn Small',
    description: 'What I aspire to, what I care about, and what I can’t stop wondering about.',
    type: 'profile',
  },
}

export default function EdahnPage() {
  return <Deck />
}
