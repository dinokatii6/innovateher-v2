'use client'
import { useEffect, useState } from 'react'

interface Story {
  _id: string
  title: string
  body: string
  category: string
  upvotes: number
  createdAt: string
}

const categories = ['all', 'journey', 'inspiration', 'challenge', 'advice', 'general'] as const
const categoryLabels: Record<string, string> = {
  journey: 'My Journey',
  inspiration: 'Inspiration',
  challenge: 'Challenges',
  advice: 'Advice',
  general: 'General',
}
const categoryColors: Record<string, string> = {
  journey: 'bg-purple-100 text-purple-700',
  inspiration: 'bg-yellow-100 text-yellow-700',
  challenge: 'bg-red-100 text-red-700',
  advice: 'bg-blue-100 text-blue-700',
  general: 'bg-gray-100 text-gray-700',
}

export default function StoriesPage() {
  const [stories, setStories] = useState<Story[]>([])
  const [filter, setFilter] = useState('all')
  const [showForm, setShowForm] = useState(false)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [form, setForm] = useState({ title: '', body: '', category: 'general' })

  function loadStories(cat: string) {
    setLoading(true)
    const params = cat !== 'all' ? `?category=${cat}` : ''
    fetch(`/api/stories${params}`)
      .then((r) => r.json())
      .then(setStories)
      .finally(() => setLoading(false))
  }

  useEffect(() => { loadStories(filter) }, [filter])

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.title.trim() || !form.body.trim()) return
    setSubmitting(true)
    await fetch('/api/stories', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
    setForm({ title: '', body: '', category: 'general' })
    setShowForm(false)
    loadStories(filter)
    setSubmitting(false)
  }

  async function upvote(id: string) {
    await fetch(`/api/stories/${id}/upvote`, { method: 'POST' })
    setStories((prev) => prev.map((s) => s._id === id ? { ...s, upvotes: s.upvotes + 1 } : s))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Art Stories</h1>
          <p className="text-gray-600">Anonymous stories from the creative community. Share your journey, inspire others.</p>
        </div>
        <button onClick={() => setShowForm(!showForm)}
          className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white transition hover:bg-primary-dark">
          {showForm ? 'Cancel' : '+ Share Story'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={submit} className="space-y-4 rounded-xl border border-gray-200 p-6">
          <p className="text-sm text-gray-500">Share your art story anonymously. Your identity stays hidden.</p>
          <div>
            <label className="block text-sm font-medium text-gray-700">Title</label>
            <input type="text" required maxLength={200} value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="e.g. How I Found My Style Through Pottery"
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
          </div>
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700">Category</label>
              <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="mt-1 w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-primary focus:outline-none">
                {categories.filter((c) => c !== 'all').map((c) => (
                  <option key={c} value={c}>{categoryLabels[c]}</option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Your Story</label>
            <textarea required minLength={10} maxLength={3000} rows={6} value={form.body}
              onChange={(e) => setForm({ ...form, body: e.target.value })}
              placeholder="Tell your story... What inspired you? What challenges did you face? What advice would you give?"
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
            <p className="mt-1 text-xs text-gray-400">{3000 - form.body.length} characters remaining</p>
          </div>
          <button type="submit" disabled={submitting || !form.title.trim() || !form.body.trim()}
            className="rounded-lg bg-primary px-6 py-2 font-semibold text-white transition hover:bg-primary-dark disabled:opacity-50">
            {submitting ? 'Posting...' : 'Share Anonymously'}
          </button>
        </form>
      )}

      <div className="flex flex-wrap gap-2">
        {categories.map((c) => (
          <button key={c} onClick={() => setFilter(c)}
            className={`rounded-full px-3 py-1 text-sm font-medium transition ${filter === c ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
            {c === 'all' ? 'All' : categoryLabels[c]}
          </button>
        ))}
      </div>

      {loading ? (
        <p className="text-gray-500">Loading stories...</p>
      ) : stories.length === 0 ? (
        <div className="rounded-lg border border-gray-200 p-8 text-center">
          <p className="text-gray-500">No stories shared yet. Be the first to share your journey!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {stories.map((story) => (
            <div key={story._id} className="rounded-xl border border-gray-200 p-6 transition hover:shadow-md">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <h2 className="text-lg font-bold text-gray-900">{story.title}</h2>
                  <div className="mt-1 flex items-center gap-2">
                    <span className={`rounded-full px-2 py-0.5 text-xs ${categoryColors[story.category] || ''}`}>
                      {categoryLabels[story.category] || story.category}
                    </span>
                    <span className="text-xs text-gray-400">{new Date(story.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
                <button onClick={() => upvote(story._id)}
                  className="flex shrink-0 items-center gap-1 rounded-full border border-gray-200 px-3 py-1 text-sm text-gray-500 transition hover:border-primary hover:text-primary">
                  ▲ {story.upvotes}
                </button>
              </div>
              <p className="mt-3 whitespace-pre-line text-gray-700">{story.body}</p>
              <p className="mt-3 text-xs text-gray-400">Shared anonymously</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
