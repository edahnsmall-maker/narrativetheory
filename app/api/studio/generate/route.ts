import Anthropic from '@anthropic-ai/sdk'
import { NextRequest, NextResponse } from 'next/server'
import { currentUser } from '@/lib/auth'
import { models } from '@/lib/config'

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

export async function POST(req: NextRequest) {
  if (!process.env.ANTHROPIC_API_KEY) {
    return NextResponse.json({ error: 'API key not configured' }, { status: 500 })
  }

  // Studio is an authoring tool for the site owner, not a public endpoint.
  const user = await currentUser()
  const admins = (process.env.NT_ADMIN_EMAILS ?? '').split(',').map((e) => e.trim().toLowerCase()).filter(Boolean)
  if (!user || !admins.includes(user.email.toLowerCase())) {
    return NextResponse.json({ error: 'Studio is only available to the site owner (set NT_ADMIN_EMAILS).' }, { status: 403 })
  }

  const { transcript } = await req.json()

  const response = await client.messages.create({
    model: models.program,
    max_tokens: 16000,
    messages: [
      {
        role: 'user',
        content: `You are helping build a Narrative Theory (NT) learning module from a conversation or text. NT is a framework that explains experience through modes, Saran Wrap (stories wrapped around reality), scoring systems, rank, body states, and the shift.

First, judge what kind of material this is — emotional processing (grief, loss), thinking-based (self-doubt, overthinking), behavioral (confidence, communication), identity/self-worth, or existential — and let that shape the tone. Emotional material calls for meaning-making, not reframing. Thinking-based material calls for naming and loosening a pattern. Behavioral material calls for a small concrete experiment.

Analyze this transcript and produce a module with three parts:
1. A title (5 words max, evocative)
2. An article (200-350 words) that explains the central insight in NT terms — write in Edahn Small's voice: direct, clear, analytical, warm but not soft
3. An exercise: small, concrete, and specific — not "reflect on your relationship to X," but something a person could actually do this week. Avoid generic wisdom ("just let go," "be present"); contextualize instead ("it makes sense this feels like X, given Y — but what if...").

Transcript:
${transcript}

Respond in JSON format:
{
  "title": "...",
  "article": "...",
  "exercise": "..."
}`,
      },
    ],
  })

  const textBlock = response.content.find((b) => b.type === 'text')
  const text = textBlock && textBlock.type === 'text' ? textBlock.text : '{}'
  try {
    const parsed = JSON.parse(text)
    return NextResponse.json(parsed)
  } catch {
    const titleMatch = text.match(/"title":\s*"([^"]+)"/)
    return NextResponse.json({
      title: titleMatch?.[1] ?? 'Generated Module',
      article: text,
      exercise: '',
    })
  }
}
