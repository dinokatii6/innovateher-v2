'use client'
import { useEffect, useState } from 'react'

interface VenueOption {
  _id: string
  name: string
  city: string
}

export default function ReportPage() {
  const [venues, setVenues] = useState<VenueOption[]>([])
  const [form, setForm] = useState({
    venueId: '',
    type: 'harassment',
    severity: 'medium',
    description: '',
    dateOfIncident: new Date().toISOString().split('T')[0],
  })
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    fetch('/api/venues')
      .then((r) => r.json())
      .then((data: VenueOption[]) => setVenues(data))
  }, [])

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.venueId) return
    setSubmitting(true)
    const res = await fetch(`/api/venues/${form.venueId}/incidents`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: form.type,
        severity: form.severity,
        description: form.description,
        dateOfIncident: form.dateOfIncident,
      }),
    })
    if (res.ok) {
      setSubmitted(true)
      setForm({ venueId: '', type: 'harassment', severity: 'medium', description: '', dateOfIncident: new Date().toISOString().split('T')[0] })
    }
    setSubmitting(false)
  }

  if (submitted) {
    return (
      <div className="mx-auto max-w-md space-y-6 text-center">
        <div className="rounded-xl border-2 border-success bg-green-50 p-8">
          <div className="text-4xl">✓</div>
          <h2 className="mt-4 text-2xl font-bold text-gray-900">Report Submitted</h2>
          <p className="mt-2 text-gray-600">
            Your anonymous report has been recorded. Thank you for helping keep the community safe.
          </p>
          <button onClick={() => setSubmitted(false)}
            className="mt-4 rounded-lg bg-primary px-6 py-2 font-semibold text-white transition hover:bg-primary-dark">
            Submit Another Report
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-lg space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Report an Incident</h1>
        <p className="mt-2 text-gray-600">
          Your report is completely anonymous. Help others stay safe by sharing what happened.
        </p>
      </div>

      <form onSubmit={submit} className="space-y-4 rounded-xl border border-gray-200 p-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Venue</label>
          <select value={form.venueId} onChange={(e) => setForm({ ...form, venueId: e.target.value })}
            required
            className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-primary focus:outline-none">
            <option value="">Select a venue...</option>
            {venues.map((v) => (
              <option key={v._id} value={v._id}>{v.name} — {v.city}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Incident Type</label>
          <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}
            className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-primary focus:outline-none">
            <option value="harassment">Harassment</option>
            <option value="unsafe_conditions">Unsafe Conditions</option>
            <option value="nonpayment">Non-Payment</option>
            <option value="discrimination">Discrimination</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Severity</label>
          <select value={form.severity} onChange={(e) => setForm({ ...form, severity: e.target.value })}
            className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-primary focus:outline-none">
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
            <option value="critical">Critical</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Date of Incident</label>
          <input type="date" value={form.dateOfIncident}
            onChange={(e) => setForm({ ...form, dateOfIncident: e.target.value })}
            className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-primary focus:outline-none" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })}
            maxLength={2000} rows={5} required minLength={10}
            placeholder="Describe what happened. Be as specific as you feel comfortable with."
            className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
        </div>

        <button type="submit" disabled={submitting || !form.venueId}
          className="w-full rounded-lg bg-danger py-3 font-semibold text-white transition hover:opacity-90 disabled:opacity-50">
          {submitting ? 'Submitting...' : 'Submit Anonymous Report'}
        </button>
      </form>
    </div>
  )
}
