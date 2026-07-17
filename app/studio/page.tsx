'use client'

import { useState } from 'react'
import { Upload, Sparkles, Plus } from 'lucide-react'

type Tab = 'create' | 'import'

export default function StudioPage() {
  const [tab, setTab] = useState<Tab>('create')
  const [title, setTitle] = useState('')
  const [article, setArticle] = useState('')
  const [exercise, setExercise] = useState('')
  const [transcript, setTranscript] = useState('')
  const [generating, setGenerating] = useState(false)
  const [preview, setPreview] = useState<{ title: string; article: string; exercise: string } | null>(null)

  async function generateFromTranscript() {
    if (!transcript.trim()) return
    setGenerating(true)
    setPreview(null)
    try {
      const res = await fetch('/api/studio/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ transcript }),
      })
      const data = await res.json()
      setPreview(data)
    } catch {
      alert('Error generating module. Check console.')
    } finally {
      setGenerating(false)
    }
  }

  return (
    <div className="mx-auto max-w-3xl px-5 lg:px-8 py-16">
      <div className="mb-10">
        <div className="text-xs uppercase tracking-widest text-muted-foreground mb-3">Studio</div>
        <h1 className="font-display text-4xl text-foreground mb-3">Create a module</h1>
        <p className="text-muted-foreground leading-relaxed">
          Write your own module or import a conversation transcript. Modules can be private, shared, or submitted for the library.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 border rounded-xl p-1 mb-8 w-fit bg-card">
        <button
          onClick={() => setTab('create')}
          className={`px-4 py-2 rounded-lg text-sm transition-colors ${
            tab === 'create' ? 'bg-secondary text-foreground' : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          <Plus size={13} className="inline mr-1.5" />
          Write module
        </button>
        <button
          onClick={() => setTab('import')}
          className={`px-4 py-2 rounded-lg text-sm transition-colors ${
            tab === 'import' ? 'bg-secondary text-foreground' : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          <Upload size={13} className="inline mr-1.5" />
          Import transcript
        </button>
      </div>

      {tab === 'create' && (
        <div className="space-y-5">
          <div>
            <label className="text-xs uppercase tracking-widest text-muted-foreground block mb-2">Module title</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. The Comparison Spiral"
              className="w-full bg-card border rounded-xl px-4 py-3 text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:border-accent-violet/50"
            />
          </div>
          <div>
            <label className="text-xs uppercase tracking-widest text-muted-foreground block mb-2">Article</label>
            <textarea
              value={article}
              onChange={(e) => setArticle(e.target.value)}
              rows={10}
              placeholder="Write the conceptual read for this module..."
              className="w-full bg-card border rounded-xl px-4 py-3 text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:border-accent-violet/50 resize-none leading-relaxed"
            />
          </div>
          <div>
            <label className="text-xs uppercase tracking-widest text-muted-foreground block mb-2">Exercise <span className="text-muted-foreground/70 normal-case tracking-normal">(optional)</span></label>
            <textarea
              value={exercise}
              onChange={(e) => setExercise(e.target.value)}
              rows={6}
              placeholder="Structured prompts for applying the ideas..."
              className="w-full bg-card border rounded-xl px-4 py-3 text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:border-accent-violet/50 resize-none leading-relaxed"
            />
          </div>
          <div className="flex gap-3">
            <button
              disabled={!title.trim() || !article.trim()}
              className="bg-primary text-primary-foreground px-5 py-2.5 rounded-xl text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Save module
            </button>
            <button
              disabled={!title.trim() || !article.trim()}
              className="border bg-card text-muted-foreground px-5 py-2.5 rounded-xl text-sm hover:text-foreground hover:border-foreground/40 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Submit to library
            </button>
          </div>
          <p className="text-xs text-muted-foreground">
            Submitted modules are reviewed before appearing in the library. By submitting, you agree that the content can be used with AI walkthroughs.
          </p>
        </div>
      )}

      {tab === 'import' && (
        <div className="space-y-5">
          <div>
            <label className="text-xs uppercase tracking-widest text-muted-foreground block mb-2">Paste a conversation transcript</label>
            <p className="text-xs text-muted-foreground mb-3">
              Paste a therapy session, coaching conversation, journal entry, or any text. The AI will analyze it and suggest a module structure — article, exercise, and AI prompt.
            </p>
            <textarea
              value={transcript}
              onChange={(e) => setTranscript(e.target.value)}
              rows={12}
              placeholder="Paste transcript here..."
              className="w-full bg-card border rounded-xl px-4 py-3 text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:border-accent-violet/50 resize-none leading-relaxed font-mono"
            />
          </div>
          <button
            onClick={generateFromTranscript}
            disabled={!transcript.trim() || generating}
            className="bg-primary text-primary-foreground px-5 py-2.5 rounded-xl text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {generating ? (
              <>
                <Sparkles size={14} className="animate-spin" />
                Analyzing…
              </>
            ) : (
              <>
                <Sparkles size={14} />
                Generate module
              </>
            )}
          </button>

          {preview && (
            <div className="border rounded-2xl p-6 bg-card space-y-5 mt-6">
              <div className="text-xs uppercase tracking-widest text-muted-foreground">Generated module</div>
              <h3 className="font-display text-xl text-foreground">{preview.title}</h3>
              <div>
                <div className="text-xs text-muted-foreground mb-2">Article</div>
                <p className="text-sm text-foreground/85 leading-relaxed whitespace-pre-line">{preview.article}</p>
              </div>
              {preview.exercise && (
                <div>
                  <div className="text-xs text-muted-foreground mb-2">Exercise</div>
                  <pre className="code-block text-xs">{preview.exercise}</pre>
                </div>
              )}
              <div className="flex gap-3">
                <button className="bg-primary text-primary-foreground px-5 py-2 rounded-xl text-sm font-medium hover:opacity-90 transition-opacity">
                  Save as module
                </button>
                <button className="border bg-background text-muted-foreground px-5 py-2 rounded-xl text-sm hover:text-foreground hover:border-foreground/40 transition-colors">
                  Edit first
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
