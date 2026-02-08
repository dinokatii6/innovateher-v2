'use client'
import { useEffect, useState } from 'react'

interface Tip {
  _id: string
  body: string
  category: string
  upvotes: number
  createdAt: string
}

const categories = ['all', 'safety', 'pay', 'opportunity', 'general'] as const
const categoryColors: Record<string, string> = {
  safety: 'bg-red-100 text-red-700',
  pay: 'bg-green-100 text-green-700',
  opportunity: 'bg-blue-100 text-blue-700',
  general: 'bg-gray-100 text-gray-700',
}

export default function WhispersPage() {
  const [tips, setTips] = useState<Tip[]>([])
  const [filter, setFilter] = useState<string>('all')
  const [body, setBody] = useState('')
  const [category, setCategory] = useState<string>('general')
  const [submitting, setSubmitting] = useState(false)
  const [loading, setLoading] = useState(true)

  function loadTips(cat: string) {
    setLoading(true)
    const params = cat !== 'all' ? `?category=${cat}` : ''
    fetch(`/api/tips${params}`)
      .then((r) => r.json())
      .then(setTips)
      .finally(() => setLoading(false))
  }

  useEffect(() => { loadTips(filter) }, [filter])

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    if (!body.trim()) return
    setSubmitting(true)
    await fetch('/api/tips', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ body, category }),
    })
    setBody('')
    loadTips(filter)
    setSubmitting(false)
  }

  async function upvote(id: string) {
    await fetch(`/api/tips/${id}/upvote`, { method: 'POST' })
    setTips((prev) => prev.map((t) => t._id === id ? { ...t, upvotes: t.upvotes + 1 } : t))
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Whisper Network</h1>
      <p className="text-gray-600">Anonymous tips from the community. Share what you know, help others stay safe.</p>

      <form onSubmit={submit} className="rounded-xl border border-gray-200 p-4">
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          maxLength={280}
          rows={3}
          placeholder="Share an anonymous tip (280 chars max)..."
          className="w-full resize-none rounded-lg border border-gray-300 px-3 py-2 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
        />
        <div className="mt-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <select value={category} onChange={(e) => setCategory(e.target.value)}
              className="rounded border border-gray-300 px-2 py-1 text-sm focus:border-primary focus:outline-none">
              <option value="general">General</option>
              <option value="safety">Safety</option>
              <option value="pay">Pay</option>
              <option value="opportunity">Opportunity</option>
            </select>
            <span className="text-xs text-gray-400">{280 - body.length} chars left</span>
          </div>
          <button type="submit" disabled={submitting || !body.trim()}
            className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white transition hover:bg-primary-dark disabled:opacity-50">
            {submitting ? 'Posting...' : 'Post Whisper'}
          </button>
        </div>
      </form>

      <div className="flex gap-2">
        {categories.map((c) => (
          <button key={c} onClick={() => setFilter(c)}
            className={`rounded-full px-3 py-1 text-sm font-medium transition ${filter === c ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
            {c.charAt(0).toUpperCase() + c.slice(1)}
          </button>
        ))}
      </div>

      {loading ? (
        <p className="text-gray-500">Loading whispers...</p>
      ) : tips.length === 0 ? (
        <div className="rounded-lg border border-gray-200 p-8 text-center">
          <p className="text-gray-500">No whispers yet. Be the first to share!</p>
        </div>
      ) : (
        <div className="space-y-3">
          {tips.map((tip) => (
            <div key={tip._id} className="rounded-xl border border-gray-100 p-4 transition hover:border-gray-200">
              <div className="flex items-start justify-between gap-4">
                <p className="text-gray-800">{tip.body}</p>
                <button onClick={() => upvote(tip._id)}
                  className="flex shrink-0 items-center gap-1 rounded-full border border-gray-200 px-2 py-1 text-sm text-gray-500 transition hover:border-primary hover:text-primary">
                  ▲ {tip.upvotes}
                </button>
              </div>
              <div className="mt-2 flex items-center gap-2">
                <span className={`rounded-full px-2 py-0.5 text-xs ${categoryColors[tip.category] || ''}`}>
                  {tip.category}
                </span>
                <span className="text-xs text-gray-400">{new Date(tip.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
