'use client'

import type { ReactNode } from 'react'
import { ArtStyleProvider } from '@/components/home2/collage'
import { HeroApple } from '@/components/home2/HeroApple'
import { BabyScene } from '@/components/home2/BabyScene'
import { CoworkerPanels } from '@/components/home2/CoworkerPanels'
import { WrapScene } from '@/components/home2/WrapScene'
import { LockDiagram } from '@/components/home2/LockDiagram'
import { ModeScene } from '@/components/home2/ModeScene'
import { StateField } from '@/components/nt/StateField'
import { PeelWrap } from '@/components/nt2/PeelWrap'
import { AutoComplete } from '@/components/nt2/AutoComplete'
import { RankSeesaw } from '@/components/nt2/RankSeesaw'
import { TheShift } from '@/components/nt2/TheShift'
import { SpeciesPortrait } from '@/components/modes/SpeciesPortrait'
import { species } from '@/lib/data/fieldGuide'

function Item({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="mt-16">
      <h2 className="font-display text-2xl">{title}</h2>
      {children}
    </section>
  )
}

export function CutPaperDrawings() {
  return (
    <ArtStyleProvider style="collage">
      <Item title="An apple?">
        <div className="mt-6 max-w-sm">
          <HeroApple />
        </div>
      </Item>
      <Item title="The crying baby">
        <BabyScene />
      </Item>
      <Item title="The coworker">
        <CoworkerPanels />
      </Item>
      <Item title="Saran Wrap">
        <WrapScene />
      </Item>
      <Item title="Narrative lock">
        <LockDiagram />
      </Item>
      <Item title="The alien over the bar">
        <ModeScene />
      </Item>
      <Item title="One state, many stories">
        <StateField />
      </Item>
      <Item title="Peel it">
        <PeelWrap />
      </Item>
      <Item title="Thoughtocomplete">
        <AutoComplete />
      </Item>
      <Item title="Rank see-saw">
        <RankSeesaw />
      </Item>
      <Item title="Lesson one: give up">
        <TheShift />
      </Item>
      <Item title="Mode Field Guide portraits">
        <div className="mt-6 grid gap-4 grid-cols-2 sm:grid-cols-3">
          {species.slice(0, 6).map((s) => (
            <SpeciesPortrait key={s.slug} s={s} />
          ))}
        </div>
      </Item>
    </ArtStyleProvider>
  )
}
