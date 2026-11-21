// Creates a note or essay draft in content/.
//   node scripts/new-post.mjs note "The text of the note"
//   node scripts/new-post.mjs essay "Essay Title"
import fs from 'node:fs'
import path from 'node:path'

const [kind, ...rest] = process.argv.slice(2)
const text = rest.join(' ').trim()
if (!['note', 'essay'].includes(kind) || !text) {
  console.log('Usage: npm run note -- "text"   or   npm run essay -- "Title"')
  process.exit(1)
}

const date = new Date().toISOString().slice(0, 10)
const words = (kind === 'note' ? text.split(/\s+/).slice(0, 6) : text.split(/\s+/)).join(' ')
const slug = `${date}-${words.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 50) || 'untitled'}`
const dir = path.join(process.cwd(), 'content', kind === 'note' ? 'notes' : 'essays')
fs.mkdirSync(dir, { recursive: true })
const file = path.join(dir, `${slug}.md`)
if (fs.existsSync(file)) {
  console.log('Already exists:', file)
  process.exit(1)
}

const body =
  kind === 'note'
    ? `---\ndate: ${date}\ntags:\n---\n\n${text}\n`
    : `---\ntitle: ${text}\ndate: ${date}\ntags:\nsummary:\ndraft: true\n---\n\nStart writing here.\n`
fs.writeFileSync(file, body)
console.log('Created', path.relative(process.cwd(), file))
