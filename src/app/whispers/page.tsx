'use client'
import { useEffect, useState } from 'react'

interface Tip {
  _id: string
  body: string
  category: string
  upvotes: number
  createdAt: string
}

interface Insights {
  overallSentiment: string
  themes: string[]
  insights: string[]
  sentimentBreakdown: { positive: number; negative: number; neutral: number }
  topConcern?: string
  topPositive?: string
}

const categories = ['all', 'safety', 'pricing', 'technique', 'supplies', 'general'] as const
const categoryLabels: Record<string, string> = {
  safety: 'Safety', pricing: 'Pricing', technique: 'Technique', supplies: 'Supplies', general: 'General',
}
const categoryColors: Record<string, string> = {
  safety: 'bg-red-100 text-red-700', pricing: 'bg-green-100 text-green-700',
  technique: 'bg-blue-100 text-blue-700', supplies: 'bg-amber-100 text-amber-700',
  general: 'bg-gray-100 text-gray-700',
}

export default function WhispersPage() {
  const [tips, setTips] = useState<Tip[]>([])
  const [filter, setFilter] = useState<string>('all')
  const [showForm, setShowForm] = useState(false)
  const [body, setBody] = useState('')
  const [category, setCategory] = useState<string>('general')
  const [submitting, setSubmitting] = useState(false)
  const [loading, setLoading] = useState(true)
  const [insights, setInsights] = useState<Insights | null>(null)
  const [insightsLoading, setInsightsLoading] = useState(false)
  const [showInsights, setShowInsights] = useState(false)

  async function loadInsights() {
    setInsightsLoading(true)
    try {
      const res = await fetch('/api/ai/whisper-insights')
      if (res.ok) {
        const data = await res.json()
        if (!data.error) setInsights(data)
      }
    } catch { /* ignore */ }
    setInsightsLoading(false)
  }

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
    setShowForm(false)
    loadTips(filter)
    setSubmitting(false)
  }

  async function upvote(id: string) {
    await fetch(`/api/tips/${id}/upvote`, { method: 'POST' })
    setTips((prev) => prev.map((t) => t._id === id ? { ...t, upvotes: t.upvotes + 1 } : t))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Whispers</h1>
          <p className="text-gray-600">Anonymous tips from the art community. Share what you know.</p>
        </div>
        <button onClick={() => setShowForm(!showForm)}
          className="rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-primary-dark">
          {showForm ? 'Cancel' : '+ Post Whisper'}
        </button>
      </div>

      {/* Post Form */}
      {showForm && (
        <form onSubmit={submit} className="space-y-4 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-bold">Post a Whisper</h2>
          <p className="text-sm text-gray-500">Share an anonymous tip about art spaces, pricing, techniques, supplies, or safety.</p>
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            maxLength={280}
            rows={4}
            required
            placeholder="e.g. Always get commission terms in writing before showing at a new gallery..."
            className="w-full resize-none rounded-lg border border-gray-300 px-3 py-2 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <select value={category} onChange={(e) => setCategory(e.target.value)}
                className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-primary focus:outline-none">
                <option value="general">General</option>
                <option value="safety">Safety</option>
                <option value="pricing">Pricing</option>
                <option value="technique">Technique</option>
                <option value="supplies">Supplies</option>
              </select>
              <span className="text-sm text-gray-400">{280 - body.length} chars left</span>
            </div>
            <button type="submit" disabled={submitting || !body.trim()}
              className="rounded-lg bg-primary px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-primary-dark disabled:opacity-50">
              {submitting ? 'Posting...' : 'Post Whisper'}
            </button>
          </div>
        </form>
      )}

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-2">
        {categories.map((c) => (
          <button key={c} onClick={() => setFilter(c)}
            className={`rounded-full px-3 py-1 text-sm font-medium transition ${filter === c ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
            {c === 'all' ? 'All' : categoryLabels[c]}
          </button>
        ))}
        <span className="mx-1 text-gray-300">|</span>
        <button
          onClick={() => { setShowInsights(!showInsights); if (!insights && !insightsLoading) loadInsights() }}
          className={`rounded-full px-3 py-1 text-sm font-medium transition ${showInsights ? 'bg-accent text-white' : 'bg-purple-50 text-accent hover:bg-purple-100'}`}>
          {insightsLoading ? 'Analyzing...' : 'AI Insights'}
        </button>
      </div>

      {/* AI Insights Panel */}
      {showInsights && (
        <div className="rounded-2xl border border-purple-200 bg-gradient-to-br from-purple-50 to-white p-5">
          {insightsLoading ? (
            <p className="text-sm text-gray-500">Snowflake AI is analyzing community whispers...</p>
          ) : insights ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-gray-900">Community Pulse</h3>
                <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                  insights.overallSentiment === 'positive' ? 'bg-green-100 text-green-700' :
                  insights.overallSentiment === 'negative' ? 'bg-red-100 text-red-700' :
                  insights.overallSentiment === 'mixed' ? 'bg-amber-100 text-amber-700' :
                  'bg-gray-100 text-gray-700'
                }`}>
                  {insights.overallSentiment} sentiment
                </span>
              </div>

              {/* Sentiment bar */}
              {insights.sentimentBreakdown && (
                <div>
                  <div className="flex h-2.5 overflow-hidden rounded-full bg-gray-100">
                    {insights.sentimentBreakdown.positive > 0 && (
                      <div className="bg-green-400" style={{ width: `${(insights.sentimentBreakdown.positive / (insights.sentimentBreakdown.positive + insights.sentimentBreakdown.negative + insights.sentimentBreakdown.neutral)) * 100}%` }} />
                    )}
                    {insights.sentimentBreakdown.neutral > 0 && (
                      <div className="bg-gray-300" style={{ width: `${(insights.sentimentBreakdown.neutral / (insights.sentimentBreakdown.positive + insights.sentimentBreakdown.negative + insights.sentimentBreakdown.neutral)) * 100}%` }} />
                    )}
                    {insights.sentimentBreakdown.negative > 0 && (
                      <div className="bg-red-400" style={{ width: `${(insights.sentimentBreakdown.negative / (insights.sentimentBreakdown.positive + insights.sentimentBreakdown.negative + insights.sentimentBreakdown.neutral)) * 100}%` }} />
                    )}
                  </div>
                  <div className="mt-1 flex justify-between text-xs text-gray-400">
                    <span>Positive: {insights.sentimentBreakdown.positive}</span>
                    <span>Neutral: {insights.sentimentBreakdown.neutral}</span>
                    <span>Negative: {insights.sentimentBreakdown.negative}</span>
                  </div>
                </div>
              )}

              {/* Themes */}
              {insights.themes?.length > 0 && (
                <div>
                  <p className="text-xs font-semibold text-gray-500">KEY THEMES</p>
                  <div className="mt-1 flex flex-wrap gap-1.5">
                    {insights.themes.map((t, i) => (
                      <span key={i} className="rounded-full bg-white px-2.5 py-0.5 text-xs font-medium text-gray-700 shadow-sm">{t}</span>
                    ))}
                  </div>
                </div>
              )}

              {/* Insights */}
              {insights.insights?.length > 0 && (
                <div>
                  <p className="text-xs font-semibold text-gray-500">AI INSIGHTS</p>
                  <ul className="mt-1 space-y-1">
                    {insights.insights.map((ins, i) => (
                      <li key={i} className="text-sm text-gray-700">• {ins}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Top concern / positive */}
              <div className="grid gap-3 sm:grid-cols-2">
                {insights.topConcern && (
                  <div className="rounded-lg bg-red-50 p-3">
                    <p className="text-xs font-semibold text-red-600">TOP CONCERN</p>
                    <p className="mt-0.5 text-sm text-red-800">{insights.topConcern}</p>
                  </div>
                )}
                {insights.topPositive && (
                  <div className="rounded-lg bg-green-50 p-3">
                    <p className="text-xs font-semibold text-green-600">POSITIVE TREND</p>
                    <p className="mt-0.5 text-sm text-green-800">{insights.topPositive}</p>
                  </div>
                )}
              </div>

              <p className="text-xs text-gray-400">Powered by Snowflake Cortex AI</p>
            </div>
          ) : (
            <p className="text-sm text-gray-500">Could not load insights. Make sure Snowflake AI is configured.</p>
          )}
        </div>
      )}

      {/* Whispers List */}
      {loading ? (
        <p className="text-gray-500">Loading whispers...</p>
      ) : tips.length === 0 ? (
        <div className="rounded-xl border border-gray-200 p-12 text-center">
          <div className="text-5xl">💬</div>
          <p className="mt-3 text-gray-500">No whispers yet. Be the first to share!</p>
        </div>
      ) : (
        <div className="space-y-3">
          {tips.map((tip) => (
            <div key={tip._id} className="rounded-xl border border-gray-200 p-4 transition hover:shadow-sm">
              <div className="flex items-start justify-between gap-4">
                <p className="text-gray-800">{tip.body}</p>
                <button onClick={() => upvote(tip._id)}
                  className="flex shrink-0 items-center gap-1 rounded-full border border-gray-200 px-3 py-1 text-sm text-gray-500 transition hover:border-primary hover:text-primary">
                  ▲ {tip.upvotes}
                </button>
              </div>
              <div className="mt-2 flex items-center gap-2">
                <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${categoryColors[tip.category] || ''}`}>
                  {categoryLabels[tip.category] || tip.category}
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
