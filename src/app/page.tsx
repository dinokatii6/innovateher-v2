'use client'
import Link from 'next/link'
import { useRole } from '@/context/role'

function RoleSelect() {
  const { setRole } = useRole()
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center space-y-8">
      <div className="text-center">
        <h1 className="text-5xl font-bold tracking-tight text-gray-900">
          Backstage <span className="text-primary">Beacon</span>
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-lg text-gray-600">
          An anonymous platform uplifting women in the arts.
        </p>
      </div>

      <p className="text-sm font-medium text-gray-500">I am a...</p>

      <div className="grid gap-6 md:grid-cols-2">
        <button onClick={() => setRole('community')}
          className="group rounded-2xl border-2 border-gray-200 p-8 text-left transition hover:border-primary hover:shadow-lg">
          <div className="mb-3 text-4xl">👥</div>
          <h2 className="text-xl font-bold text-gray-900 group-hover:text-primary">Community Member</h2>
          <p className="mt-2 text-gray-600">
            Browse venues, read whispers, find opportunities, and use safety check-in.
          </p>
          <ul className="mt-4 space-y-1 text-sm text-gray-500">
            <li>• Rate and review venues</li>
            <li>• Report incidents anonymously</li>
            <li>• Share and read whisper tips</li>
            <li>• Browse the marketplace</li>
            <li>• Safety check-in timer</li>
          </ul>
        </button>

        <button onClick={() => setRole('artist')}
          className="group rounded-2xl border-2 border-gray-200 p-8 text-left transition hover:border-accent hover:shadow-lg">
          <div className="mb-3 text-4xl">🎨</div>
          <h2 className="text-xl font-bold text-gray-900 group-hover:text-accent">Artist</h2>
          <p className="mt-2 text-gray-600">
            Post gigs, grants, and opportunities to the marketplace for the community.
          </p>
          <ul className="mt-4 space-y-1 text-sm text-gray-500">
            <li>• Post opportunities and gigs</li>
            <li>• Share grants and residencies</li>
            <li>• Reach women in the arts</li>
            <li>• Browse the marketplace</li>
          </ul>
        </button>
      </div>
    </div>
  )
}

function CommunityHome() {
  return (
    <div className="space-y-16">
      <section className="py-12 text-center">
        <h1 className="text-5xl font-bold tracking-tight text-gray-900">
          Backstage <span className="text-primary">Beacon</span>
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
          Browse opportunities and report incidents anonymously to keep the community safe.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link href="/opportunities" className="rounded-lg bg-primary px-6 py-3 font-semibold text-white transition hover:bg-primary-dark">
            Browse Marketplace
          </Link>
          <Link href="/report" className="rounded-lg border-2 border-danger px-6 py-3 font-semibold text-danger transition hover:bg-red-50">
            Report an Incident
          </Link>
        </div>
      </section>

      <section className="grid gap-8 md:grid-cols-2">
        <div className="rounded-xl border border-gray-200 p-6 transition hover:shadow-md">
          <div className="mb-3 text-3xl">🌟</div>
          <h2 className="text-xl font-bold text-gray-900">Marketplace</h2>
          <p className="mt-2 text-gray-600">
            Discover gigs, grants, residencies, and auditions posted by artists in the community.
          </p>
          <Link href="/opportunities" className="mt-4 inline-block text-sm font-medium text-primary hover:underline">Find opportunities →</Link>
        </div>
        <div className="rounded-xl border border-gray-200 p-6 transition hover:shadow-md">
          <div className="mb-3 text-3xl">🚨</div>
          <h2 className="text-xl font-bold text-gray-900">Report Incidents</h2>
          <p className="mt-2 text-gray-600">
            Experienced harassment, non-payment, or unsafe conditions? Report it anonymously to protect others.
          </p>
          <Link href="/report" className="mt-4 inline-block text-sm font-medium text-danger hover:underline">File a report →</Link>
        </div>
      </section>
    </div>
  )
}

function ArtistHome() {
  return (
    <div className="space-y-12">
      <section className="py-12 text-center">
        <h1 className="text-5xl font-bold tracking-tight text-gray-900">
          Backstage <span className="text-accent">Beacon</span>
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
          Post opportunities to uplift women in the arts. Your gigs reach the community anonymously.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link href="/opportunities" className="rounded-lg bg-accent px-6 py-3 font-semibold text-white transition hover:opacity-90">
            Go to Marketplace
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-lg rounded-xl border border-gray-200 p-8 text-center">
        <div className="mb-3 text-4xl">🎨</div>
        <h2 className="text-xl font-bold">Post Opportunities</h2>
        <p className="mt-2 text-gray-600">
          Share gigs, grants, residencies, auditions, and collaborations with the Backstage Beacon community.
        </p>
        <Link href="/opportunities" className="mt-4 inline-block rounded-lg bg-primary px-6 py-2 font-semibold text-white transition hover:bg-primary-dark">
          + Post Opportunity
        </Link>
      </section>
    </div>
  )
}

export default function HomePage() {
  const { role } = useRole()

  if (!role) return <RoleSelect />
  if (role === 'artist') return <ArtistHome />
  return <CommunityHome />
}
