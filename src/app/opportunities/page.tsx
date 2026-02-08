'use client'
import { useEffect, useState } from 'react'
import { useRole } from '@/context/role'

interface Opportunity {
  _id: string
  title: string
  description: string
  type: string
  location: string
  compensation: string
  deadline: string | null
  contactInfo: string
  createdAt: string
}

const types = ['all', 'gig', 'residency', 'grant', 'audition', 'collaboration', 'other'] as const
const typeColors: Record<string, string> = {
  gig: 'bg-purple-100 text-purple-700',
  residency: 'bg-blue-100 text-blue-700',
  grant: 'bg-green-100 text-green-700',
  audition: 'bg-orange-100 text-orange-700',
  collaboration: 'bg-pink-100 text-pink-700',
  other: 'bg-gray-100 text-gray-700',
}

export default function OpportunitiesPage() {
  const { role } = useRole()
  const isArtist = role === 'artist'
  const [opps, setOpps] = useState<Opportunity[]>([])
  const [filter, setFilter] = useState('all')
  const [search, setSearch] = useState('')
  const [showForm, setShowForm] = useState(isArtist)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [form, setForm] = useState({
    title: '', description: '', type: 'gig', location: '', compensation: '', deadline: '', contactInfo: '',
  })

  function loadOpps(type: string, q: string) {
    setLoading(true)
    const params = new URLSearchParams()
    if (type !== 'all') params.set('type', type)
    if (q) params.set('q', q)
    fetch(`/api/opportunities?${params}`)
      .then((r) => r.json())
      .then(setOpps)
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    const timeout = setTimeout(() => loadOpps(filter, search), 300)
    return () => clearTimeout(timeout)
  }, [filter, search])

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitting(true)
    await fetch('/api/opportunities', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, deadline: form.deadline || null }),
    })
    setForm({ title: '', description: '', type: 'gig', location: '', compensation: '', deadline: '', contactInfo: '' })
    setShowForm(false)
    loadOpps(filter, search)
    setSubmitting(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Opportunities</h1>
          <p className="text-gray-600">Discover and share gigs, grants, residencies, and more.</p>
        </div>
        {isArtist && (
          <button onClick={() => setShowForm(!showForm)}
            className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white transition hover:bg-primary-dark">
            {showForm ? 'Cancel' : '+ Post Opportunity'}
          </button>
        )}
      </div>

      {showForm && isArtist && (
        <form onSubmit={submit} className="space-y-4 rounded-xl border border-gray-200 p-6">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">Title</label>
              <input type="text" required maxLength={200} value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Type</label>
              <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}
                className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-primary focus:outline-none">
                {types.filter((t) => t !== 'all').map((t) => (
                  <option key={t} value={t}>{t.charAt(0).toUpperCase() + t.slice(1)}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Location</label>
              <input type="text" required value={form.location}
                onChange={(e) => setForm({ ...form, location: e.target.value })}
                className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Compensation</label>
              <input type="text" value={form.compensation}
                onChange={(e) => setForm({ ...form, compensation: e.target.value })}
                placeholder="e.g. $200/night"
                className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Deadline</label>
              <input type="date" value={form.deadline}
                onChange={(e) => setForm({ ...form, deadline: e.target.value })}
                className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-primary focus:outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Contact Info</label>
              <input type="text" required maxLength={500} value={form.contactInfo}
                onChange={(e) => setForm({ ...form, contactInfo: e.target.value })}
                placeholder="Email, website, or social media"
                className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea required maxLength={2000} rows={4} value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
          </div>
          <button type="submit" disabled={submitting}
            className="rounded-lg bg-primary px-6 py-2 font-semibold text-white transition hover:bg-primary-dark disabled:opacity-50">
            {submitting ? 'Posting...' : 'Post Opportunity'}
          </button>
        </form>
      )}

      <input type="text" placeholder="Search opportunities..."
        value={search} onChange={(e) => setSearch(e.target.value)}
        className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />

      <div className="flex flex-wrap gap-2">
        {types.map((t) => (
          <button key={t} onClick={() => setFilter(t)}
            className={`rounded-full px-3 py-1 text-sm font-medium transition ${filter === t ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>

      {loading ? (
        <p className="text-gray-500">Loading opportunities...</p>
      ) : opps.length === 0 ? (
        <div className="rounded-lg border border-gray-200 p-8 text-center">
          <p className="text-gray-500">No opportunities found.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {opps.map((opp) => (
            <div key={opp._id} className="rounded-xl border border-gray-200 p-5 transition hover:shadow-md">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-lg font-bold text-gray-900">{opp.title}</h2>
                  <div className="mt-1 flex items-center gap-2">
                    <span className={`rounded-full px-2 py-0.5 text-xs ${typeColors[opp.type] || ''}`}>{opp.type}</span>
                    <span className="text-sm text-gray-500">{opp.location}</span>
                  </div>
                </div>
                {opp.compensation && (
                  <span className="shrink-0 rounded-full bg-green-50 px-3 py-1 text-sm font-medium text-green-700">
                    {opp.compensation}
                  </span>
                )}
              </div>
              <p className="mt-3 text-gray-600">{opp.description}</p>
              <div className="mt-3 flex items-center gap-4 text-sm text-gray-500">
                {opp.deadline && (
                  <span>Deadline: {new Date(opp.deadline).toLocaleDateString()}</span>
                )}
                <span>Contact: {opp.contactInfo}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
