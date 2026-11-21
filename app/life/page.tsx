import { LibraryBrowser } from '@/components/life/library-browser'
import { libraryRows, searchIndex } from '@/components/life/library-data'

export const metadata = {
  title: 'Life Instruction — Narrative Theory',
  description: 'Short modules that apply Narrative Theory to real life: confidence, conflict, relationships, anxiety, grief, meditation, meaning.',
}

export default function LifeIndex() {
  return <LibraryBrowser rows={libraryRows()} search={searchIndex()} />
}
