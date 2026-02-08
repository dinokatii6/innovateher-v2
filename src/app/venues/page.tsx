'use client'
import Link from 'next/link'
import { useEffect, useState } from 'react'

interface Venue {
  _id: string
  name: string
  city: string
  category: string
  avgSafety: number
  avgFairPay: number
  avgRespect: number
  totalRatings: number
  totalIncidents: number
}

function StarRating({ value }: { value: number }) {
  return (
    <span className="font-semibold text-primary">
      {value > 0 ? value.toFixed(1) : '—'}
      <span className="text-xs text-gray-400">/5</span>
    </span>
  )
}

export default function VenuesPage() {
  const [venues, setVenues] = useState<Venue[]>([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timeout = setTimeout(() => {
      const params = new URLSearchParams()
      if (search) params.set('q', search)
      fetch(`/api/venues?${params}`)
        .then((r) => r.json())
        .then(setVenues)
        .finally(() => setLoading(false))
    }, 300)
    return () => clearTimeout(timeout)
  }, [search])

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Venues</h1>
      </div>

      <input
        type="text"
        placeholder="Search venues by name or city..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
      />

      {loading ? (
        <p className="text-gray-500">Loading venues...</p>
      ) : venues.length === 0 ? (
        <div className="rounded-lg border border-gray-200 p-8 text-center">
          <p className="text-gray-500">No venues found. Try a different search or seed the database.</p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {venues.map((v) => (
            <Link
              key={v._id}
              href={`/venues/${v._id}`}
              className="block rounded-xl border border-gray-200 p-5 transition hover:border-primary hover:shadow-md"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-lg font-bold text-gray-900">{v.name}</h2>
                  <p className="text-sm text-gray-500">{v.city} · {v.category}</p>
                </div>
                {v.totalIncidents > 0 && (
                  <span className="rounded-full bg-red-100 px-2 py-0.5 text-xs font-medium text-danger">
                    {v.totalIncidents} incident{v.totalIncidents > 1 ? 's' : ''}
                  </span>
                )}
              </div>
              <div className="mt-4 grid grid-cols-3 gap-2 text-center text-sm">
                <div>
                  <div className="text-gray-500">Safety</div>
                  <StarRating value={v.avgSafety} />
                </div>
                <div>
                  <div className="text-gray-500">Fair Pay</div>
                  <StarRating value={v.avgFairPay} />
                </div>
                <div>
                  <div className="text-gray-500">Respect</div>
                  <StarRating value={v.avgRespect} />
                </div>
              </div>
              <p className="mt-2 text-center text-xs text-gray-400">{v.totalRatings} rating{v.totalRatings !== 1 ? 's' : ''}</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
